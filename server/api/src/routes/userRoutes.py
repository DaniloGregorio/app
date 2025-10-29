from ..blueprints.userbp import bp
from flask import jsonify,request,current_app
from ..models import User,db
from sqlalchemy.exc import IntegrityError
import jwt
from datetime import datetime,timedelta


@bp.route("/register",methods=['POST'])
def register_user() :

    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password :
        return jsonify({"error":"password and username are required"}),400

    userEven = User.query.filter_by(username = username,password = password).first()

    if userEven :
        return jsonify({"error":"user already registered"})
    

    user = User(username=username,password=password)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({"message":"user registered"}),201
    except IntegrityError:
        db.session.rollback()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
    
    

@bp.route("/login",methods=['POST'])
def login_user() :
    
    data = request.get_json()

    username = data.get("username")
    password = data.get ("password")

    user = User.query.filter_by(username = username,password = password).first()

    if user :

        payload = {
            "id":user.id,
            "username":user.username,
            "exp":datetime.utcnow() + timedelta(hours=1),
        }

        token = jwt.encode(payload, current_app.config["SECRET_KEY"],algorithm="HS256")
        
        return jsonify({
            "message":"user logged-in",
            "token":token
            }),200
    else :
        return jsonify({"error","invalid user or password"}),401