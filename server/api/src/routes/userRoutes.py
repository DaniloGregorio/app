from ..blueprints.userbp import bp,bpbooks
from flask import jsonify,request,current_app
from ..models import User,db,SavedBook
from sqlalchemy.exc import IntegrityError
import jwt
from datetime import datetime,timedelta
from ..utils.profileDecorator import token_required


@bp.route("/register",methods=['POST','OPTIONS'])
def register_user() :
    
    if request.method == 'OPTIONS':
        return '', 200

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
        return jsonify({"error":"invalid user or password"}),401
    
@bp.route("/<int:id>", methods=["GET","OPTIONS"])
@token_required
def get_user(current_user, id):

    if current_user.id != id:
        return jsonify({"error": "Unauthorized access"}), 403
    
    return jsonify({
        "id": current_user.id,
        "username": current_user.username
    })

@bpbooks.route("/save", methods=["POST","OPTIONS"])
@token_required
def save_book(current_user):
    data = request.get_json()
    new_book = SavedBook(
        user_id=current_user.id,
        title=data.get("title"),
        author=data.get("author"),
        cover=data.get("cover"),
        openlibrary_id=data.get("openlibrary_id")
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify({"message": "Book saved successfully!"}), 201

@bpbooks.route("/user", methods=["GET","OPTIONS"])
@token_required
def get_user_books(current_user):
    books = SavedBook.query.filter_by(user_id=current_user.id).all()
    return jsonify([book.to_dict() for book in books])

@bpbooks.route("/<int:book_id>", methods=["DELETE",'OPTIONS'])
def delete_book(book_id):
    if request.method =='OPTIONS' :
        return "",200
    
    book = SavedBook.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book removed"}), 200