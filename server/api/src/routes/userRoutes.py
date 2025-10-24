from ..blueprints.userbp import bp

@bp.route("/register",methods=['POST'])
def register_user() :
    return{"message" :"user registered"},201

@bp.route("/login",methods=['POST'])
def login_user() :
    return {"message":"user successful logged in"},201