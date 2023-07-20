from app import app
from models import db, ParkAmenity, UserPark, Review  

with app.app_context():
    print("Querying the 'park_amenities' table...")
    park_amenities = ParkAmenity.query.all()

    print("Setting the 'park_code' column to the affiliated park's code.")
    for entry in park_amenities:
        print(entry.park)
        setattr(entry, 'park_code', entry.park.code)
        db.session.add(entry)
    
    print("Committing records to database...")
    db.session.commit()

    print("Park codes successfully added to 'park_amenities' table!")

    print("Querying the 'user_parks' table...")
    user_parks = UserPark.query.all()

    print("Setting the 'park_code' column to the affiliated park's code.")
    for entry in user_parks:
        setattr(entry, 'park_code', entry.park.code)
        db.session.add(entry)
    
    print("Committing records to database...")
    db.session.commit()

    print("Park codes successfully added to 'user_parks' table!")

    print("Querying the 'reviews' table...")
    reviews = Review.query.all()

    print("Setting the 'park_code' column to the affiliated park's code.")
    for entry in reviews:
        setattr(entry, 'park_code', entry.park.code)
        db.session.add(entry)

    print("Committing records to database...")   
    db.session.commit()

    print("Park codes successfully added to 'reviews' table!")