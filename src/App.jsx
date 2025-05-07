import React from "react";
import TradingViewWidget from "./components/TradingViewWidget";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>주식 차트 보기</h2>
      <TradingViewWidget />
    </div>
  );
}

export default App;
