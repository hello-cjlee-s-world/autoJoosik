import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {useEffect, useState} from "react";
import marketListService from "@/app/services/marketListService.jsx";
import {constants} from "@/app/libs/constants.js";
import transactionHistoryService from "@/app/services/transactionHistoryService.jsx";

export function TransactionHistory() {
  const [transactions, setTransactions] = useState([])

  const parseStringDate = (dateString) => {
    const d = new Date(dateString)

    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}
 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
  }

  const dataLoad = async () => {
    try {
      const response = await transactionHistoryService().getTransactionHistoryList()
      if(response.status === constants.RESULT_SUCCESS) {
        if (response.body) {
          setTransactions(response.body)
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
        <h2 className="text-xl font-bold text-gray-900">거래 내역</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            거래 내역이 없습니다
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${
                    transaction.side === 'B' 
                      ? 'bg-red-100' 
                      : 'bg-blue-100'
                  }`}>
                    {transaction.side === 'B' ? (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${
                        transaction.type === 'B' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'B' ? '매수' : '매도'}
                      </span>
                      <span className="font-medium text-gray-900">
                        {transaction.stkNm}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {transaction.stkNm}
                    </div>
                    <div className="text-sm text-gray-600">
                      {transaction.filledQty}주 × ₩{transaction.filledPrice}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {parseStringDate(transaction.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    transaction.type === 'B' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'B' ? '-' : '+'}₩{transaction.filledAmount}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
