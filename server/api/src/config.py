import os

def db_config() :
    username = os.getenv("db_username","root")
    password = os.getenv("db_password","")
    host = os.getenv("db_host","localhost")
    dbname = os.getenv("db_name","users")

    return{
       "SQLALCHEMY_DATABASE_URI":f"mysql+pymysql://{username}:{password}@{host}/{dbname}"
    }