from flask import Flask
from .blueprints.userbp import bp,bpbooks
from .config import config
from .routes import userRoutes
from .models import db
from flask_migrate import Migrate
from sqlalchemy import text
from flask_cors import CORS


def create_app() :

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    app.register_blueprint(bp)
    app.register_blueprint(bpbooks)

    cfg = config()
    app.config.update(cfg)
    migrate = Migrate()
    

    db.init_app(app)
    migrate.init_app(app, db)
    
    with app.app_context() : 
        try:
            db.session.execute(text("SELECT 1"))
            print("database connected")

        except Exception as e:
            print("not connected",e)


        db.create_all()

    return app

if __name__ == "__main__" :
    app = create_app()
    app.run(debug=True,port=8080)