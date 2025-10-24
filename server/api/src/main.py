from flask import Flask
from .blueprints.userbp import bp
from .config import db_config
from .routes import userRoutes
from .models import db
from flask_migrate import Migrate


def create_app() :

    app = Flask(__name__)
    app.register_blueprint(bp)

    cfg = db_config()
    app.config.update(cfg)
    migrate = Migrate()
    

    db.init_app(app)
    migrate.init_app(app, db)
    

    return app

if __name__ == "__main__" :
    app = create_app()
    app.run(debug=True,port=8080)