import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import assetService from "@/app/services/assetService.jsx";
import {useEffect, useState} from "react";
import {constants} from "@/app/libs/constants.js";

export function StockDashboard({ stocks, cash, onStockClick }) {
  const [assetList, setAssetList] = useState([])

  const dataLoad = async () => {
    try {
      const response = await assetService().getAssetList()
      if(response.status === constants.RESULT_SUCCESS){
        setAssetList(response.body)
      }
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
      dataLoad()
  }, []);


  const totalInvested = stocks.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
  const totalAssets = totalValue + cash;

  return (
    <div className="space-y-6">
      <button onClick={dataLoad}>버튼!</button>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">총 자산</span>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{totalAssets.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">주식 평가액</span>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{totalValue.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">보유 현금</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{cash.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">총 수익률</span>
            {totalGainPercent >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className={`text-2xl font-bold ${totalGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
          </div>
          <div className={`text-sm ${totalGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalGainPercent >= 0 ? '+' : ''}₩{totalGain.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">보유 주식</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종목</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">보유수량</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">평균단가</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">현재가</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">평가금액</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">수익률</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stocks.map((stock) => {
                const value = stock.shares * stock.currentPrice;
                const cost = stock.shares * stock.avgPrice;
                const gain = value - cost;
                const gainPercent = (gain / cost) * 100;

                return (
                  <tr 
                    key={stock.symbol} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onStockClick(stock)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">{stock.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      {stock.shares.toLocaleString()}주
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ₩{stock.avgPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ₩{stock.currentPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ₩{value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className={gainPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="font-medium">
                          {gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(2)}%
                        </div>
                        <div className="text-xs">
                          {gainPercent >= 0 ? '+' : ''}₩{gain.toLocaleString()}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
