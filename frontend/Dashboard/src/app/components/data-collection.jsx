import { Database, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import marketListService from "@/app/services/marketListService.jsx";
import {constants} from "@/app/libs/constants.js";
import {useEffect, useState} from "react";

export function DataCollection({ isRunning }) {
  const [stockInfoList, setStockInfoList] = useState([]);

  const toDateFormat = (time) => {
    const date = new Date(time)
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}
     ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`
  }

  const setSuccess = (time) => {
    const target = new Date(time).getTime()
    const now = Date.now()

    const diffMs = Math.abs(now - target)
    const TEN_MIN = 10 * 60 * 1000

    return diffMs <= TEN_MIN
  }

  const dataLoad = async () => {
    try {
      const response = await marketListService().getStockInfoList()
      if(response.status === constants.RESULT_SUCCESS) {
        if (response.body) {
          setStockInfoList(response.body)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    dataLoad()
    const id = setInterval(() => {
      dataLoad()
    }, 60 * 1000)

    return () => {
      clearInterval(id)
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Data Collection Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">데이터 수집 내역</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종목</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">현재가</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">거래량</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">고가</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">저가</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockInfoList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    수집된 데이터가 없습니다
                  </td>
                </tr>
              ) : (
                stockInfoList.map((data) => (
                  <tr key={data.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.updatedAt ? toDateFormat(data.updatedAt):'-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{data.stkNm}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ₩{data.curPrc ? data.curPrc.replace('-','').replace('+','').toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {data.trdeQty ? data.trdeQty.replace('-','').replace('+','').toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                      {data.highPric ? data.highPric.replace('-','').replace('+','').toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                      {data.lowPric ? data.lowPric.replace('-','').replace('+','').toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {!isRunning ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3" />
                          대기
                        </span>
                      ) : setSuccess(data.updatedAt) ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          성공
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" />
                          실패
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
