from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-_password_hash', '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    @hybrid_property
    def password_hash(self):
        raise Exception("Password hashes cannot be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, 
            password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User: {self.first_name} {self.last_name}'
    
class Amenity(db.Model, SerializerMixin):
    __tablename__ = "amenities"

    id = db.Column(db.Integer, primary_key = True)
    nps_api_id = db.Column(db.String)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    def __repr__(self):
        return f'<Amenity: {self.name}>'