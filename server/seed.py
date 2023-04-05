from app import app
from models import db, User

with app.app_context():
    User.query.delete()
    
    print("Deleting existing data...")
    db.session.commit()
    
    print("Table successfully cleared!")