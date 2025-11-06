from flask import Blueprint

bp = Blueprint('user',__name__,url_prefix='/user')

bpbooks = Blueprint("books", __name__, url_prefix="/books")