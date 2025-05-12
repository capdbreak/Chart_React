from sqlalchemy import Column, String, Date
from database import Base

class News(Base):
    __tablename__ = "news"

    title = Column(String, primary_key=True)
    date = Column(Date, primary_key=True, index=True)
    link = Column(String)
    body = Column(String)
    source_file = Column(String)
    ticker = Column(String, primary_key=True, index=True)
