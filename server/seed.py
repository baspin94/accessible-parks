from app import app
from models import db, User, Review
from faker import Faker

with app.app_context():
    
    fake = Faker()

    # for i in range(5):
    #     user = User(
    #         first_name = fake.first_name(),
    #         last_name = fake.last_name(),
    #         email = fake.email()
    #     )
    #     user.password_hash = fake.word()
    #     db.session.add(user)
    #     db.session.commit()

    review_1 = Review(
        park_id = 465,
        user_id = 2, 
        review = fake.paragraph(),
        rating = 5
    )
    db.session.add(review_1)

    review_2 = Review(
        park_id = 239,
        user_id = 3, 
        review = fake.paragraph(),
        rating = 4
    )

    db.session.add(review_2)

    review_3 = Review(
        park_id = 262,
        user_id = 4, 
        review = fake.paragraph(),
        rating = 3
    )

    db.session.add(review_3)

    review_4 = Review(
        park_id = 367,
        user_id = 5, 
        review = fake.paragraph(),
        rating = 2
    )

    db.session.add(review_4)

    review_5 = Review(
        park_id = 188,
        user_id = 6, 
        review = fake.paragraph(),
        rating = 1
    )

    db.session.add(review_5)
    db.session.commit()
