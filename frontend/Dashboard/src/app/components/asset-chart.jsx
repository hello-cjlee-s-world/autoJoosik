import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import assetChartService from "@/app/services/assetChartService.jsx";
import {constants} from "@/app/libs/constants.js";
import { useEffect,useState } from "react";

export function AssetChart() {
  const [assetDailyList, setAssetDailyList] = useState([])

  const parseStringDate = (dateString) => {
    const d = new Date(dateString)
    const year = d.getFullYear()
    const month =  d.getMonth() + 1
    const day =  d.getDate()

    return `${year}-${month}-${day}`
  }

  const dataLoad = async () => {
    try {
      const response = await assetChartService().getAssetDailyList()
      if(response.status === constants.RESULT_SUCCESS){
        const tmpList = []
        if(response.body) {
          response.body.forEach(data => {
            tmpList.push({
              baseDate: parseStringDate(data.baseDate),
              totalAssets: data.totalAssets,
              stockValue: data.stockValue,
              cashBalance: data.cashBalance
            })
          })
        }
        console.log(response.body)
        console.log(tmpList)
        setAssetDailyList(tmpList)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    dataLoad()
  }, []);


  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">자산 추이</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={assetDailyList}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="baseDate"
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
            dataKey="cashBalance"
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
