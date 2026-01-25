import {Plus, TrendingDown, TrendingUp} from 'lucide-react';
import {constants} from "@/app/libs/constants.js";
import {useEffect, useState} from "react";
import marketListService from "@/app/services/marketListService.jsx";

export function MarketList({ stocks, onBuy }) {
  const [stockInfoList, setStockInfoList] = useState([])

  const dataLoad = async () => {
    try {
      const response = await marketListService().getStockInfoList()
      if(response.status === constants.RESULT_SUCCESS) {
        if (response.body) {
          console.log(response.body)
          setStockInfoList(response.body)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    dataLoad()
  }, []);



  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">시장 종목</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{stock.symbol}</span>
                  {stock.changePercent >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="text-sm text-gray-500">{stock.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  거래량: {stock.volume.toLocaleString()}
                </div>
              </div>
              <div className="text-right mr-4">
                <div className="font-bold text-gray-900">
                  ₩{stock.currentPrice.toLocaleString()}
                </div>
                <div className={`text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.change.toLocaleString()} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </div>
              </div>
              <button
                onClick={() => onBuy(stock.symbol, stock.name, stock.currentPrice)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                aria-label={`${stock.symbol} 매수`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
