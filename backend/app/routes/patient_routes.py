import os
from datetime import datetime
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from ..models import Patient
from ..extensions import db

patient_bp = Blueprint('patient', __name__)

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@patient_bp.route('/patients', methods=['POST'])
def add_patient():
    try:
        data = request.form

        # 📸 Handle file
        file = request.files.get('photo')
        filename = None

        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

        # 🧠 Create patient
        patient = Patient(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            age=int(data.get('age')) if data.get('age') else None,
            gender=data.get('gender'),
            phone=data.get('phone'),
            address=data.get('address'),
            doctor=data.get('doctor'),
            bill=float(data.get('bill')) if data.get('bill') else None,
            admission_date=datetime.strptime(data.get('admissionDate'), '%Y-%m-%d') if data.get('admissionDate') else None,
            discharge_date=datetime.strptime(data.get('dischargeDate'), '%Y-%m-%d') if data.get('dischargeDate') else None,
            photo=filename
        )

        db.session.add(patient)
        db.session.commit()

        return jsonify({"message": "Patient added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500