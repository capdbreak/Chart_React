import React from 'react';

const TickerList = ({ tickers, onSelect }: { tickers: string[], onSelect: (ticker: string) => void }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">종목 선택</h2>
    <div className="flex gap-4 flex-wrap">
      {tickers.map(ticker => (
        <button
          key={ticker}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onSelect(ticker)}
        >
          {ticker}
        </button>
      ))}
    </div>
  </div>
);

export default TickerList;