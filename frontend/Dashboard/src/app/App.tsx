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
  const [cash, setCash] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };

  const handleMarketBuy = (symbol, name, price,stkCd) => {
    setSelectedStock({
      symbol,
      name,
      stkCd,
      shares: 0,
      avgPrc: price,
      curPrc: price
    });
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
          <AutoTradingControl isRunning={isRunning} setIsRunning={setIsRunning} />
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
              cash={cash}
              setCash={setCash}
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
          <DataCollection isRunning={isRunning}/>
        )}
      </main>

      {/* Trade Modal */}
      {selectedStock && (
        <TradeModal
          stock={selectedStock}
          cash={cash}
          onClose={() => setSelectedStock(null)}
          // onTrade={handleTrade}
        />
      )}
    </div>
  );
}
