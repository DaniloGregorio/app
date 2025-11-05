from functools import wraps
from flask import request,jsonify,current_app
from ..models import User
import jwt

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        if request.method =='OPTIONS' :
            return "",200
        
        token = None

        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({"error": "Token missing"}), 401

        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = User.query.get(data["id"])
            
        except Exception as e:
            return jsonify({"error": "Invalid or expired token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated