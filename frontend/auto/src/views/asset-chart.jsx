import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AssetChart({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">자산 추이</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₩${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            formatter={(value) => [`₩${value.toLocaleString()}`, '']}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="totalAssets" 
            stackId="1"
            stroke="#3b82f6" 
            fill="#3b82f6"
            fillOpacity={0.6}
            name="총 자산"
          />
          <Area 
            type="monotone" 
            dataKey="stockValue" 
            stackId="2"
            stroke="#8b5cf6" 
            fill="#8b5cf6"
            fillOpacity={0.6}
            name="주식 평가액"
          />
          <Area 
            type="monotone" 
            dataKey="cash" 
            stackId="2"
            stroke="#10b981" 
            fill="#10b981"
            fillOpacity={0.6}
            name="현금"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
