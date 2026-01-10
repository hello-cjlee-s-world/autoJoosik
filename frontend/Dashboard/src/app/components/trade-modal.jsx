import { useState } from 'react';
import { X } from 'lucide-react';

export function TradeModal({ stock, cash, onClose, onTrade }) {
  const [tradeType, setTradeType] = useState('buy');
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState(stock?.currentPrice.toString() || '');

  if (!stock) return null;

  const sharesNum = parseInt(shares) || 0;
  const priceNum = parseInt(price) || 0;
  const totalAmount = sharesNum * priceNum;
  const canAfford = tradeType === 'buy' ? totalAmount <= cash : sharesNum <= stock.shares;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sharesNum > 0 && priceNum > 0 && canAfford) {
      onTrade(stock.symbol, sharesNum, priceNum, tradeType);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">주식 거래</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Stock Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-medium text-gray-900">{stock.symbol}</div>
            <div className="text-sm text-gray-500">{stock.name}</div>
            <div className="mt-2 text-lg font-bold text-gray-900">
              ₩{stock.currentPrice.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              보유수량: {stock.shares.toLocaleString()}주
            </div>
          </div>

          {/* Trade Type */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                tradeType === 'buy'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              매수
            </button>
            <button
              type="button"
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                tradeType === 'sell'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              매도
            </button>
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주문가격
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          {/* Shares Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주문수량
            </label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
            {tradeType === 'sell' && sharesNum > stock.shares && (
              <p className="mt-1 text-sm text-red-600">보유수량을 초과할 수 없습니다</p>
            )}
          </div>

          {/* Total Amount */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">주문금액</span>
              <span className="font-bold text-gray-900">
                ₩{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {tradeType === 'buy' ? '보유현금' : '예상잔액'}
              </span>
              <span className={`text-sm ${tradeType === 'buy' && totalAmount > cash ? 'text-red-600' : 'text-gray-600'}`}>
                ₩{tradeType === 'buy' ? cash.toLocaleString() : (cash + totalAmount).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canAfford || sharesNum <= 0 || priceNum <= 0}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              canAfford && sharesNum > 0 && priceNum > 0
                ? tradeType === 'buy'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {tradeType === 'buy' ? '매수 주문' : '매도 주문'}
          </button>
        </form>
      </div>
    </div>
  );
}
