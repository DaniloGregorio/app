from flask import Flask
from .blueprints.userbp import bp
from .config import db_config
from .routes import userRoutes
from .models import db
from flask_migrate import Migrate
from sqlalchemy import text


def create_app() :

    app = Flask(__name__)
    app.register_blueprint(bp)

    cfg = db_config()
    app.config.update(cfg)
    migrate = Migrate()
    

    db.init_app(app)
    migrate.init_app(app, db)
    
    with app.app_context() : 
        try:
            db.session.execute(text("SELECT 1"))
            print("connected")

        except Exception as e:
            print("not connected",e)


        db.create_all()

    return app

if __name__ == "__main__" :
    app = create_app()
    app.run(debug=True,port=8080)