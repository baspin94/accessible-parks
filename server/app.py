from flask import Flask, request, session, make_response, jsonify, abort, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
from config import app, db, api
from models import User

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

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/authorized')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)