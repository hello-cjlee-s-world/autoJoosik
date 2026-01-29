import { useState, useEffect } from 'react';
import { StockDashboard } from './components/stock-dashboard';
import { TradeModal } from './components/trade-modal';
import { AssetChart } from './components/asset-chart';
import { TransactionHistory } from './components/transaction-history';
import { MarketList } from './components/market-list';
import { DataCollection } from './components/data-collection';
import { AutoTradingControl } from './components/auto-trading-control';
import { Briefcase, TrendingUp, History, ShoppingCart, Database } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [cash, setCash] = useState(10000000); // 초기 자금 1000만원

  // 자동 거래 상태
  const [autoTradingEnabled, setAutoTradingEnabled] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const marketOpenTime = '09:00';
  const marketCloseTime = '15:30';

  // 데이터 수집 내역
  const [dataPoints, setDataPoints] = useState([
    {
      id: '1',
      timestamp: '2026-01-09 09:15:23',
      symbol: '삼성전자',
      price: 75000,
      volume: 1234567,
      bid: 74900,
      ask: 75100,
      status: 'success'
    },
    {
      id: '2',
      timestamp: '2026-01-09 09:15:28',
      symbol: 'SK하이닉스',
      price: 125000,
      volume: 987654,
      bid: 124800,
      ask: 125200,
      status: 'success'
    },
    {
      id: '3',
      timestamp: '2026-01-09 09:15:33',
      symbol: 'NAVER',
      price: 210000,
      volume: 543210,
      bid: 209500,
      ask: 210500,
      status: 'success'
    },
    {
      id: '4',
      timestamp: '2026-01-09 09:15:38',
      symbol: 'LG전자',
      price: 95000,
      volume: 654321,
      bid: 94800,
      ask: 95200,
      status: 'failed'
    },
  ]);

  const [selectedStock, setSelectedStock] = useState(null);

  // 장 시간 체크
  useEffect(() => {
    const checkMarketHours = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;
      
      const openTime = 9 * 60; // 09:00
      const closeTime = 15 * 60 + 30; // 15:30
      
      const isOpen = currentTime >= openTime && currentTime < closeTime;
      setIsMarketOpen(isOpen);
    };

    checkMarketHours();
    const interval = setInterval(checkMarketHours, 60000); // 1분마다 체크

    return () => clearInterval(interval);
  }, []);

  // 자동 데이터 수집 (자동 거래가 활성화되고 장이 열렸을 때)
  useEffect(() => {
    if (!autoTradingEnabled || !isMarketOpen) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);
      
      // 랜덤 종목 선택
      const symbols = ['삼성전자', 'SK하이닉스', 'NAVER', 'LG전자', '현대차', '카카오'];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const basePrice = Math.floor(Math.random() * 200000) + 50000;
      
      const newDataPoint = {
        id: Date.now().toString(),
        timestamp,
        symbol: randomSymbol,
        price: basePrice,
        volume: Math.floor(Math.random() * 1000000) + 100000,
        bid: basePrice - Math.floor(Math.random() * 500),
        ask: basePrice + Math.floor(Math.random() * 500),
        status: Math.random() > 0.1 ? 'success' : 'failed'
      };

      setDataPoints(prev => [newDataPoint, ...prev.slice(0, 49)]); // 최대 50개까지 유지
    }, 10000); // 10초마다 데이터 수집

    return () => clearInterval(interval);
  }, [autoTradingEnabled, isMarketOpen]);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };

  const handleMarketBuy = (symbol, name, price) => {
    setSelectedStock({
      symbol,
      name,
      shares: 0,
      avgPrice: price,
      currentPrice: price
    });
  };

  const handleAutoTradingToggle = () => {
    setAutoTradingEnabled(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">주식 투자 관리</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">보유 현금</div>
              <div className="text-xl font-bold text-blue-600">
                ₩{cash.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Auto Trading Control */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AutoTradingControl
            isEnabled={autoTradingEnabled}
            isMarketOpen={isMarketOpen}
            marketOpenTime={marketOpenTime}
            marketCloseTime={marketCloseTime}
            onToggle={handleAutoTradingToggle}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">내 포트폴리오</span>
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'market'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">시장</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="w-5 h-5" />
              <span className="font-medium">거래 내역</span>
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'data'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="w-5 h-5" />
              <span className="font-medium">데이터 수집</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <StockDashboard 
              onStockClick={handleStockClick}
            />
            <AssetChart/>
          </div>
        )}

        {activeTab === 'market' && (
          <MarketList 
            onBuy={handleMarketBuy}
          />
        )}

        {activeTab === 'history' && (
          <TransactionHistory/>
        )}

        {activeTab === 'data' && (
          <DataCollection 
            dataPoints={dataPoints}
            isCollecting={autoTradingEnabled && isMarketOpen}
          />
        )}
      </main>

      {/* Trade Modal */}
      {selectedStock && (
        <TradeModal
          stock={selectedStock}
          cash={cash}
          onClose={() => setSelectedStock(null)}
          onTrade={handleTrade}
        />
      )}
    </div>
  );
}
