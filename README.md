tickers.json에 있는 ticker중 하나를 웹에서 선택하여 tradingview 차트로 표시시

tradingview-chart/
├── public/
│   ├── tickers.json
│   └── index.html              # React의 root 엘리먼트가 들어 있는 HTML
├── src/
│   ├── components/
│   │   └── TradingViewWidget.jsx  # TradingView 차트 컴포넌트 (Main)
│   ├── App.jsx                 # 메인 앱: 컴포넌트들을 호출함
│   └── index.js               # React 앱 진입점 (root 렌더링)
└── package.json               # 프로젝트 메타 및 의존성 관리


    index.html (public/index.html)
React 앱이 렌더링될 "진짜 DOM"의 기반이 되는 HTML
<div id="root">에 실제 React가 모든 내용을 집어넣음

    index.js (src/index.js)
React 앱의 진입점
<App /> 컴포넌트를 root에 렌더링
StrictMode는 개발 중 오류를 미리 감지해줌

    App.jsx (src/App.jsx)
페이지 상단 텍스트와 핵심 컴포넌트 TradingViewWidget을 포함
실제 사용자 인터페이스가 시작되는 곳

    TradingViewWidget.jsx (src/components/TradingViewWidget.jsx)
버튼 클릭 시 symbol 상태 업데이트
useEffect()로 위젯 스크립트를 다시 로드
TradingView 차트를 보여주는 핵심 UI
ref로 DOM에 스크립트 직접 주입 (React가 아닌 JS 방식으로 위젯 삽입)



    전체 동작 흐름
index.js → App.jsx → TradingViewWidget.jsx
 └▶ useEffect: tickers.json 로드
     └▶ 종목 리스트 state 저장 + 기본 심볼 설정
         └▶ 버튼 렌더링
         └▶ useEffect([symbol]): 차트 삽입
             └▶ TradingView 위젯 DOM 생성