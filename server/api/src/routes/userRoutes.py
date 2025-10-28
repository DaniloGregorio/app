from ..blueprints.userbp import bp
from flask import jsonify,request
from ..models import User,db
from sqlalchemy.exc import IntegrityError

@bp.route("/register",methods=['POST'])
def register_user() :

    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password :
        return jsonify({"error":"password and username are required"}),400

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
    
    data = request.json()

    username = data.get("username")
    password = data.get ("password")

    user = User.query.filter_by(username = username,password = password).first()

    if user :
        return jsonify({"message":"user registered"}),201
    else :
        return jsonify({"error","invalid user or password"}),401