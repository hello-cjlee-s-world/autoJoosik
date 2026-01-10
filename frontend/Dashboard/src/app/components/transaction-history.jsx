import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function TransactionHistory({ transactions }) {
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
                    transaction.type === 'buy' 
                      ? 'bg-red-100' 
                      : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'buy' ? (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${
                        transaction.type === 'buy' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'buy' ? '매수' : '매도'}
                      </span>
                      <span className="font-medium text-gray-900">
                        {transaction.symbol}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {transaction.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {transaction.shares.toLocaleString()}주 × ₩{transaction.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {transaction.date} {transaction.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    transaction.type === 'buy' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'buy' ? '-' : '+'}₩{transaction.total.toLocaleString()}
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
