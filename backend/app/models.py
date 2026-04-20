from .extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))

    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    phone = db.Column(db.String(20))

    address = db.Column(db.String(255))

    doctor = db.Column(db.String(100))
    bill = db.Column(db.Float)

    admission_date = db.Column(db.Date)
    discharge_date = db.Column(db.Date)

    photo = db.Column(db.String(200))