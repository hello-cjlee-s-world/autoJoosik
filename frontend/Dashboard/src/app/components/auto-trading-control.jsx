import { Power, Clock, TrendingUp, Settings } from 'lucide-react';

export function AutoTradingControl({ 
  isEnabled, 
  isMarketOpen, 
  marketOpenTime, 
  marketCloseTime,
  onToggle 
}) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">자동 거래 시스템</h3>
            <p className="text-sm text-blue-100">장 시간 자동 제어</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-14 w-28 items-center rounded-full transition-colors ${
            isEnabled ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          <span
            className={`inline-block h-12 w-12 transform rounded-full bg-white shadow-lg transition-transform ${
              isEnabled ? 'translate-x-14' : 'translate-x-1'
            }`}
          >
            <Power className={`w-full h-full p-3 ${isEnabled ? 'text-green-500' : 'text-gray-400'}`} />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Power className="w-4 h-4" />
            <span className="text-sm font-medium">시스템 상태</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-lg font-bold">
              {isEnabled ? '활성화' : '비활성화'}
            </span>
          </div>
        </div>

        {/* Market Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">장 상태</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></div>
            <span className="text-lg font-bold">
              {isMarketOpen ? '장중' : '장마감'}
            </span>
          </div>
        </div>

        {/* Trading Hours */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">거래 시간</span>
          </div>
          <div className="text-lg font-bold">
            {marketOpenTime} - {marketCloseTime}
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <p className="text-sm text-blue-100">
          {isEnabled ? (
            isMarketOpen ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                자동 거래가 활성화되어 실시간으로 데이터를 수집하고 거래를 실행합니다.
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                장 시작 시간({marketOpenTime})에 자동으로 거래를 시작합니다.
              </span>
            )
          ) : (
            '자동 거래가 비활성화되었습니다. 수동으로 거래하거나 시스템을 활성화하세요.'
          )}
        </p>
      </div>
    </div>
  );
}
