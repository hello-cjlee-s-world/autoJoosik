import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import stockDashboardService from "@/app/services/stockDashboardService.jsx";
import {useEffect, useMemo, useState} from "react";
import {constants} from "@/app/libs/constants.js";

export function StockDashboard({ onStockClick }) {
  const [assetList, setAssetList] = useState([])
  const [account, setAccount] = useState({})
  // cash_balance + total_eval

  const totalAssets = useMemo(() => {
    if (!account) return 0;

    return (account.cashBalance ?? 0) + (account.totalEval ?? 0);
  }, [account?.cashBalance, account?.totalEval]);

  const dataLoad = async () => {
    try {
      const assetResponse = await stockDashboardService().getAssetList()
      const accountResponse = await stockDashboardService().getAccount()
      if(assetResponse.status === constants.RESULT_SUCCESS){
        setAssetList(assetResponse.body)
      }
      if(accountResponse.status === constants.RESULT_SUCCESS){
        setAccount(accountResponse.body)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
      dataLoad()
  }, []);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">총 자산</span>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{totalAssets ? parseFloat(totalAssets).toLocaleString() : '-'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">주식 평가액</span>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{account.totalEval ? parseFloat(account.totalEval).toLocaleString() : '-'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">보유 현금</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{account.cashBalance ? parseFloat(account.cashBalance).toLocaleString() : '-'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">총 수익률</span>

            {(() => {
              const rate = account?.totalPlRate ?? 0;
              return rate >= 0
                ? <TrendingUp className="w-5 h-5 text-green-600"/>
                : <TrendingDown className="w-5 h-5 text-red-600"/>;
            })()}
          </div>

          {(() => {
            const rate = Number(account?.totalPlRate ?? 0);
            const isUp = rate >= 0;

            return (
              <div className={`text-2xl font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                {isUp ? '+' : ''}
                {rate.toFixed(2)}%
              </div>
            );
          })()}
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
              {assetList.map((asset) => {
                const value = asset.shares * asset.currentPrice;
                const cost = asset.shares * asset.avgPrice;
                const gain = value - cost;
                const gainPercent = (gain / cost) * 100;

                return (
                  <tr
                    key={asset.stkId}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onStockClick(asset)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{asset.symbol}</div>
                        <div className="text-sm text-gray-500">{asset.stkNm}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      {asset.qty ? parseFloat(asset.qty.toLocaleString()) + '주' : '없음'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ₩{asset.avgPrice ? asset.avgPrice.toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ₩{asset.curPrc ? asset.curPrc.toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ₩{asset.evalAmount ? asset.evalAmount.toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className={gainPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="font-medium">
                          {asset.evalPlRate && (asset.evalPlRate >= 0) ? '+' : ''}{asset.evalPlRate ? parseFloat(asset.evalPlRate).toFixed(2) : "-"}%
                        </div>
                        <div className="text-xs">
                          {asset.evalPlRate && (asset.evalPlRate >= 0) ? '+' : ''}₩{asset.evalPlRate ? parseFloat(asset.evalPlRate).toLocaleString() : "-"}
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
