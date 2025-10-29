import os

def config() :
    username = os.getenv("DB_USERNAME","root")
    password = os.getenv("DB_PASSWORD","")
    host = os.getenv("DB_HOST","localhost")
    dbname = os.getenv("DB_NAME","users")
    secretKey = os.getenv("SECRET_KEY","secretKeyTemplate")
   
    return{
       "SQLALCHEMY_DATABASE_URI":f"mysql+pymysql://{username}:{password}@{host}/{dbname}",
        "SECRET_KEY":(f"{secretKey}")
    }