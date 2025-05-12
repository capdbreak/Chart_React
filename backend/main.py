from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import cast, Date
from fastapi.middleware.cors import CORSMiddleware
from models import Base, News
from database import engine, get_db
from schemas import NewsResponse
from typing import List
import json

with open("tickers.json", "r") as f:
    ticker_dict = json.load(f)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tickers")
def get_tickers():
    return list(ticker_dict.keys())

@app.get("/dates/{symbol}")
def get_dates(symbol: str, db: Session = Depends(get_db)):
    dates = db.query(News.date).filter(News.ticker == symbol).distinct().all()
    return [str(date[0]) for date in dates]

@app.get("/news/{symbol}/{date}", response_model=List[NewsResponse])
def get_news_by_date(symbol: str, date: str, db: Session = Depends(get_db)):
    return db.query(News).filter(
        News.ticker == symbol,
        cast(News.date, Date) == date
    ).all()