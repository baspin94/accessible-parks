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

    serialize_rules = ('-created_at', '-park_amenities')

    id = db.Column(db.Integer, primary_key = True)
    nps_api_id = db.Column(db.String)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    park_amenities = db.relationship('ParkAmenity', backref='amenity')

    def __repr__(self):
        return f'<Amenity: {self.name}>'
    
class Park(db.Model, SerializerMixin):
    __tablename__ = "parks"

    serialize_rules = ('-created_at', '-updated_at', '-park_amenities')

    id = db.Column(db.Integer, primary_key = True)
    nps_api_id = db.Column(db.String)
    name = db.Column(db.String)
    code = db.Column(db.String)
    states = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    designation = db.Column(db.String)
    description = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    image_url = db.Column(db.String)
    image_alt = db.Column(db.String)
    image_credit = db.Column(db.String)
    weather = db.Column(db.String)
    nps_url = db.Column(db.String)
    access_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    park_amenities = db.relationship('ParkAmenity', backref='park')

    def __repr__(self):
        return f'<Park: {self.name} ({self.code})>'
    
class ParkAmenity(db.Model, SerializerMixin):
    __tablename__ = "park_amenities"

    serialize_rules = ('-created_at', '-park')

    id = db.Column(db.Integer, primary_key = True)
    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'))
    amenity_id = db.Column(db.Integer, db.ForeignKey('amenities.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    def __repr__(self):
        return f'<Park ID: {self.park_id} Amenity ID: {self.amenity_id}>'
