import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewsByDate from './components/NewsByDate';
import NewsViewer from './components/NewsViewer';
import TradingViewWidget from './components/TradingViewWidget';

const ChartPage = ({ selectedSymbol }: { selectedSymbol: string }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">차트 확인</h1>
    <TradingViewWidget symbol={selectedSymbol} />
  </div>
);

const NewsPage = ({ selectedSymbol }: { selectedSymbol: string }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedSymbol && selectedDate) {
      fetch(`/news/${selectedSymbol}/${selectedDate}`)
        .then((res) => res.json())
        .then((data) => {
          setNews(data);
          setCurrentIndex(0);
        });
    }
  }, [selectedSymbol, selectedDate]);

  const total = news.length;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    if (!isNaN(index)) setCurrentIndex(index);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">뉴스 확인</h1>
      <NewsByDate symbol={selectedSymbol} onSelect={setSelectedDate} sortDescending={true} />

      {news.length > 0 && (
        <>
          <div className="flex items-center justify-between mt-2 mb-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ⬅ 이전
            </button>

            <div className="flex items-center space-x-2">
              <span>{currentIndex + 1} / {total}</span>
              <select value={currentIndex} onChange={handleChange} className="border rounded px-2 py-1">
                {news.map((_, i) => (
                  <option key={i} value={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, total - 1))}
              disabled={currentIndex === total - 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              다음 ➡
            </button>
          </div>

          <NewsViewer news={[news[currentIndex]]} />
        </>
      )}
    </div>
  );
};

const App = () => {
  const [tickers, setTickers] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  useEffect(() => {
    fetch('/tickers')
      .then((res) => res.json())
      .then(setTickers);
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-100 p-4">
          <h2 className="text-md font-semibold mb-2">종목 선택</h2>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          >
            <option value="" disabled>
              종목을 선택하세요
            </option>
            {tickers.map((ticker) => (
              <option key={ticker} value={ticker}>
                {ticker}
              </option>
            ))}
          </select>

          <nav className="flex flex-col space-y-2">
            <Link
              to="/chart"
              className="text-blue-500 hover:underline disabled:opacity-50"
            >
              차트 보기
            </Link>
            <Link
              to="/news"
              className="text-blue-500 hover:underline disabled:opacity-50"
            >
              뉴스 확인
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route
              path="/chart"
              element={<ChartPage selectedSymbol={selectedSymbol} />}
            />
            <Route
              path="/news"
              element={<NewsPage selectedSymbol={selectedSymbol} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
