from flask import Flask, request, session, make_response, jsonify, abort, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
from config import app, db, api
from models import User, Amenity, Park, ParkAmenity

class Signup(Resource):
    def post(self):
        data = request.get_json()

        try:

            new_user = User(
                first_name = data['first_name'],
                last_name = data['last_name'],
                email = data['email']
            )
            new_user.password_hash = data['password']

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            response = make_response(
            new_user.to_dict(),
            201
            )
            
            return response

        except IntegrityError:

            response = make_response(
                {"error": "Email address already exists in system."}, 
                422
            )
            return response
        
class Login(Resource):
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']

        user = User.query.filter(User.email == email).first()

        if not user:
            response = make_response(
                {"error": "Invalid username."}, 
                401
            )
            return response

        if user.authenticate(password):
            session['user_id'] = user.id
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        else:
            response = make_response(
                {"error": "Invalid password."}, 
                401
            )
            return response
        
class CheckSession(Resource):
    def get(self):

        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        else:
            response = make_response(
                {"error": "User not found. Please log in or sign up for an account to access additional features."},
                401
            )
            return response
        
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response(
            {},
            204
        )
        return response
    
class Amenities(Resource):
    def get(self):

        amenities = [amenity.to_dict() for amenity in Amenity.query.all()]

        response = make_response(
            amenities,
            200
        )
        return response
    
class AmenityById(Resource):
    def get(self, id):
        amenity = Amenity.query.filter(Amenity.id == id).first()

        if not amenity:
            response = make_response(
                {"error": "Amenity not found."},
                404
            )
            return response
        
        else:
            response = make_response(
                amenity
                    .to_dict(
                        only=(
                            # 'name',
                            # 'id',
                            'park_amenities.park.id',
                            'park_amenities.park.name',
                            'park_amenities.park.image_url',
                            'park_amenities.park.image_alt',
                            'park_amenities.park.states'
                        )
                    ),
                200
            )
            return response
        
class ParksByAmenityIds(Resource):
    def get(self, id_string):
        id_array = id_string.split(',')
        int_ids = [int(id) for id in id_array]

        all_matching_amenities = [amenity.to_dict() for amenity in ParkAmenity.query.filter(ParkAmenity.amenity_id.in_(int_ids)).all()]
        all_park_ids = [element['park']['id'] for element in all_matching_amenities]

        multiple_matches = [id for id in all_park_ids if all_park_ids.count(id) == len(int_ids)]
        unique_matches = set(multiple_matches)

        parks = [park.to_dict(only=('id', 'name', 'states', 'image_url', 'image_alt')) for park in Park.query.filter(Park.id.in_(unique_matches)).all()]

        if len(parks) == 0:
            response = make_response(
                {"error": "No matching parks."},
                404
            )
            return response

        else: 
            response = make_response(
                parks, 
                200
            )
            return response

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/authorized')
api.add_resource(Logout, '/logout')
api.add_resource(Amenities, '/amenities')
api.add_resource(AmenityById, '/amenities/<int:id>')
api.add_resource(ParksByAmenityIds, '/parkamenities/<string:id_string>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)