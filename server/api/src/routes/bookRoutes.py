from ..blueprints.userbp import bpbooks
from flask import jsonify,request
from ..models import db,SavedBook
from ..utils.profileDecorator import token_required


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