import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { DataPointType } from './types/DataPointType'
import { DATA_POINT } from './mockData'

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('All')

  const filterData = (range: string): DataPointType[] => {
    const now = new Date()
    const filteredData = DATA_POINT.filter((point) => {
      const diffInMonths =
        (now.getFullYear() - point.time.getFullYear()) * 12 +
        now.getMonth() -
        point.time.getMonth()
      console.log('diffInMonths', diffInMonths)

      switch (range) {
        case 'Last 3 Months':
          return diffInMonths <= 3
        case 'Last 6 Months':
          return diffInMonths <= 7
        case 'Last Year':
          return diffInMonths <= 12
        default:
          return true
      }
    })
    console.log(filteredData)
    filteredData.unshift({
      name: 'Eyal',
      value: 300,
      time: new Date('2004-1-01'),
    })
    return filteredData
  }

  const filteredData = filterData(timeRange)

  return (
    <div>
      <select
        className="select select-accent w-full max-w-xs text-sky-200"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Last 3 Months">Last 3 Months</option>
        <option value="Last 6 Months">Last 6 Months</option>
        <option value="Last Year">Last Year</option>
      </select>
      <LineChart
        width={500}
        height={300}
        data={[...filteredData]}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default Dashboard
