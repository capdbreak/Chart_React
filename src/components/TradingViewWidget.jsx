import React, { useEffect, useRef, useState } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef(null);
  const [tickers, setTickers] = useState({});
  const [symbol, setSymbol] = useState(null);

  // ticker 목록 불러오기
  useEffect(() => {
    fetch("/tickers.json")
      .then(res => res.json())
      .then(data => {
        setTickers(data);
        const firstTicker = Object.keys(data)[0];
        if (firstTicker) setSymbol(`NASDAQ:${firstTicker}`);
      });
  }, []);

  // 차트 로딩
  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "1rem" }}>
        <h2>Tradingview Chart</h2>
        <div style={{ marginBottom: "1rem" }}>
          {Object.keys(tickers).map(ticker => (
            <button key={ticker} onClick={() => setSymbol(`NASDAQ:${ticker}`)}>
              {ticker}
            </button>
          ))}
        </div>
      </div>
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ flexGrow: 1, width: "100%" }}
      >
        <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
};

export default TradingViewWidget;
