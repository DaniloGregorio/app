import os

def db_config() :
    username = os.getenv("DB_USERNAME","root")
    password = os.getenv("DB_PASSWORD","")
    host = os.getenv("DB_HOST","localhost")
    dbname = os.getenv("DB_NAME","users")

    return{
       "SQLALCHEMY_DATABASE_URI":f"mysql+pymysql://{username}:{password}@{host}/{dbname}"
    }