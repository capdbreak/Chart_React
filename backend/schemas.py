from pydantic import BaseModel
from datetime import date

class NewsResponse(BaseModel):
    title: str
    date: date
    link: str
    body: str
    source_file: str
    ticker: str

    class Config:
        orm_mode = True
