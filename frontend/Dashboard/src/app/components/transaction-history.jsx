import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {useCallback, useEffect, useRef, useState} from "react";
import {constants} from "@/app/libs/constants.js";
import transactionHistoryService from "@/app/services/transactionHistoryService.jsx";

export function TransactionHistory() {
  const [transactions, setTransactions] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)
  const pageSize = 10

  const parseStringDate = (dateString) => {
    const d = new Date(dateString)

    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}
 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
  }

  const dataLoad = async (pageToLoad, {append = false} = {}) => {
    try {
      setIsLoading(true)
      const response = await transactionHistoryService().getTransactionHistoryList({
        page: pageToLoad,
        size: pageSize,
      })
      if(response.status === constants.RESULT_SUCCESS) {
        if (response.body) {
          setTransactions((prev) => append ? [...prev, ...response.body] : response.body)
          setHasMore(response.body.length === pageSize)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    dataLoad(0)
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) {
      return
    }
    const nextPage = page + 1
    setPage(nextPage)
    dataLoad(nextPage, {append: true})
  }, [page, isLoading, hasMore])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {rootMargin: '100px'}
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [loadMore, hasMore])


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
          <>
            {transactions.map((transaction) => (
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
            ))}
            <div ref={sentinelRef} className="h-1" />
            {isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                거래 내역 불러오는 중...
              </div>
            )}
            {!hasMore && (
              <div className="p-4 text-center text-sm text-gray-500">
                더 이상 거래 내역이 없습니다
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
