from flask import Flask
from .config import Config
from .extensions import db
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Register Blueprints (routes)
    from .routes.auth_routes import auth_bp
    from .routes.patient_routes import patient_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(patient_bp)

    # Optional: health check route
    @app.route('/')
    def home():
        return {"message": "Backend is running"}

    return app