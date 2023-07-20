from app import app
from models import db, ParkAmenity, UserPark, Review  

with app.app_context():

    park_amenities = ParkAmenity.query.all()

    for entry in park_amenities:
        setattr(entry, 'park_code', entry.park.code)
        db.session.add(entry)
        
    db.session.commit()

    user_parks = UserPark.query.all()

    for entry in user_parks:
        setattr(entry, 'park_code', entry.park.code)
        db.session.add(entry)
        
    db.session.commit()

    reviews = Review.query.all()

    for entry in reviews:
        setattr(entry, 'park_code', entry.park.code)
        db.session.add(entry)
        
    db.session.commit()