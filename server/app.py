from flask import Flask, request, session, make_response, jsonify, abort, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
from config import app, db, api
from models import User, Amenity, Park, ParkAmenity, UserPark, Review

@app.route('/')
@app.route('/login')
@app.route('/signup')
@app.route('/results')
@app.route('/park/<int:id>')
@app.route('/myparks')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

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
            new_user.to_dict(rules=('parks',)),
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
                user.to_dict(rules=('parks',)),
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
                user.to_dict(rules=('parks',)),
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
                            'park_amenities.park.code',
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
        int_ids = [int(id) for id in id_string.split(',')]

        # all_matching_amenities = [amenity.to_dict() for amenity in ParkAmenity.query.filter(ParkAmenity.amenity_id.in_(int_ids)).all()]
        # all_park_ids = [element['park']['id'] for element in all_matching_amenities]

        # multiple_matches = [id for id in all_park_ids if all_park_ids.count(id) == len(int_ids)]
        # unique_matches = set(multiple_matches)

        # parks = [park.to_dict(only=('id', 'name', 'designation', 'states', 'image_url', 'image_alt')) for park in Park.query.filter(Park.id.in_(unique_matches)).all()]

        matching_parks = Park.query.join(ParkAmenity).filter(ParkAmenity.amenity_id.in_(int_ids)).group_by(Park.code).having(db.func.count(ParkAmenity.amenity_id.distinct()) == len(int_ids))
        parks = [park.to_dict(only=('id', 'name', 'code', 'designation', 'states', 'image_url', 'image_alt')) for park in matching_parks]

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

class ParkById(Resource):
    def get(self, id):
        park = Park.query.filter(Park.id == id).first()

        if not park:
            response = make_response(
                {"error": "Park not found."}, 
                404
            )
            return response
        
        else:
            response = make_response(
                park.to_dict(rules=('park_amenities.amenity', 'reviews', 'reviews.user.first_name', 'reviews.user.last_name')),
                200
            )

            return response
        
class ParkByCode(Resource):
    def get(self, code):
        park = Park.query.filter(Park.code == code).first()

        if not park:
            response = make_response(
                {"error": "Park not found."}, 
                404
            )
            return response
        
        else:
            response = make_response(
                park.to_dict(rules=('park_amenities.amenity', 'reviews', 'reviews.user.first_name', 'reviews.user.last_name')),
                200
            )

            return response

class UserParks(Resource):
    def post(self):
        user_id = request.get_json()['user_id']
        park_id = request.get_json()['park_id']
        park_code = request.get_json()['park_code']

        new_user_park = UserPark(
            user_id = user_id,
            park_id = park_id,
            park_code = park_code
        )

        db.session.add(new_user_park)
        db.session.commit()

        response = make_response(
            new_user_park.to_dict(),
            201
        )

        return response
        

class UserParkById(Resource):
    def delete(self, id):
        user_park = UserPark.query.filter(UserPark.id == id).first()

        if not user_park:
            pass

        db.session.delete(user_park)
        db.session.commit()

        response = make_response(
            {"message": "Park successfully removed from your saved parks."}, 
            200
        )

        return response

class Reviews(Resource):
    def post(self):
        data = request.get_json()

        new_review = Review(
            park_id = data['park_id'],
            park_code = data['park_code'],
            user_id = data['user_id'],
            review = data['review'],
            rating = data['rating']
        )

        db.session.add(new_review)
        db.session.commit()

        response = make_response(
            new_review.to_dict(rules=('user',)),
            201
        )
        return response

class ReviewById(Resource):
    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter(Review.id == id).first()

        for attr in data:
            setattr(review, attr, data[attr])

        db.session.add(review)
        db.session.commit()

        response = make_response(
            review.to_dict(rules=('user',)),
            202
		)
        return response

    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()

        db.session.delete(review)
        db.session.commit()

        response = make_response(
            {"message": "Review successfully deleted."},
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
api.add_resource(ParkById, '/parks/<int:id>')
api.add_resource(ParkByCode, '/parks/<string:code>')
api.add_resource(UserParks, '/user_parks')
api.add_resource(UserParkById, '/user_parks/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewById, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)