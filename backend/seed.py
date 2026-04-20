from app import create_app
from app.extensions import db
from app.models import User

app = create_app()

with app.app_context():
    # Optional: clear existing users
    # db.session.query(User).delete()

    users = [
        User(email="user1@test.com", password="1111"),
        User(email="user2@test.com", password="2222"),
        User(email="user3@test.com", password="3333"),
        User(email="user4@test.com", password="4444")
    ]

    db.session.add_all(users)
    db.session.commit()

    print("✅ Dummy users inserted successfully!")