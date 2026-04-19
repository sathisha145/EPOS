'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  PoundSterling, 
  ShoppingBag, 
  Users, 
  Clock,
  Coffee,
  Croissant,
  Sandwich,
  CreditCard,
  Banknote,
  Calendar
} from 'lucide-react'

type TimeRange = 'today' | 'week' | 'month'

interface SalesData {
  totalRevenue: number
  orderCount: number
  avgOrderValue: number
  customerCount: number
  comparedToLast: number
  topItems: { name: string; quantity: number; revenue: number }[]
  hourlyData: { hour: string; revenue: number }[]
  paymentMethods: { method: string; amount: number; count: number }[]
}

const MOCK_DATA: Record<TimeRange, SalesData> = {
  today: {
    totalRevenue: 1847.50,
    orderCount: 142,
    avgOrderValue: 13.01,
    customerCount: 198,
    comparedToLast: 12.5,
    topItems: [
      { name: 'Cappuccino', quantity: 48, revenue: 201.60 },
      { name: 'Flat White', quantity: 35, revenue: 157.50 },
      { name: 'Latte', quantity: 32, revenue: 144.00 },
      { name: 'Croissant', quantity: 28, revenue: 98.00 },
      { name: 'Panini Prosciutto', quantity: 22, revenue: 187.00 },
    ],
    hourlyData: [
      { hour: '08:00', revenue: 245.50 },
      { hour: '09:00', revenue: 312.80 },
      { hour: '10:00', revenue: 285.20 },
      { hour: '11:00', revenue: 198.40 },
      { hour: '12:00', revenue: 356.80 },
      { hour: '13:00', revenue: 298.60 },
      { hour: '14:00', revenue: 150.20 },
    ],
    paymentMethods: [
      { method: 'Card', amount: 1423.80, count: 112 },
      { method: 'Cash', amount: 423.70, count: 30 },
    ],
  },
  week: {
    totalRevenue: 12456.80,
    orderCount: 987,
    avgOrderValue: 12.62,
    customerCount: 1245,
    comparedToLast: 8.3,
    topItems: [
      { name: 'Cappuccino', quantity: 312, revenue: 1310.40 },
      { name: 'Flat White', quantity: 256, revenue: 1152.00 },
      { name: 'Latte', quantity: 234, revenue: 1053.00 },
      { name: 'Croissant', quantity: 198, revenue: 693.00 },
      { name: 'Eggs Benedict', quantity: 145, revenue: 1522.50 },
    ],
    hourlyData: [
      { hour: 'Mon', revenue: 1845.50 },
      { hour: 'Tue', revenue: 1678.20 },
      { hour: 'Wed', revenue: 1923.80 },
      { hour: 'Thu', revenue: 1756.40 },
      { hour: 'Fri', revenue: 2134.60 },
      { hour: 'Sat', revenue: 2456.80 },
      { hour: 'Sun', revenue: 661.50 },
    ],
    paymentMethods: [
      { method: 'Card', amount: 9876.50, count: 785 },
      { method: 'Cash', amount: 2580.30, count: 202 },
    ],
  },
  month: {
    totalRevenue: 48923.40,
    orderCount: 3876,
    avgOrderValue: 12.62,
    customerCount: 4532,
    comparedToLast: 15.2,
    topItems: [
      { name: 'Cappuccino', quantity: 1245, revenue: 5229.00 },
      { name: 'Flat White', quantity: 1023, revenue: 4603.50 },
      { name: 'Latte', quantity: 934, revenue: 4203.00 },
      { name: 'Eggs Benedict', quantity: 567, revenue: 5953.50 },
      { name: 'Avocado Toast', quantity: 489, revenue: 4303.20 },
    ],
    hourlyData: [
      { hour: 'Week 1', revenue: 11234.50 },
      { hour: 'Week 2', revenue: 12456.80 },
      { hour: 'Week 3', revenue: 13567.90 },
      { hour: 'Week 4', revenue: 11664.20 },
    ],
    paymentMethods: [
      { method: 'Card', amount: 39138.70, count: 3101 },
      { method: 'Cash', amount: 9784.70, count: 775 },
    ],
  },
}

export function EPOSReports() {
  const [timeRange, setTimeRange] = useState<TimeRange>('today')
  const data = MOCK_DATA[timeRange]

  const maxHourlyRevenue = Math.max(...data.hourlyData.map(d => d.revenue))

  return (
    <div className="h-full overflow-y-auto bg-[#1a1a1a] p-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#f5f0eb]">Sales Reports</h1>
        <div className="flex gap-2 bg-[#242424] p-1 rounded-xl">
          {(['today', 'week', 'month'] as TimeRange[]).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                timeRange === range
                  ? 'bg-[#d4a574] text-[#1a1410]'
                  : 'text-[#a89f92] hover:text-[#f5f0eb]'
              }`}
            >
              {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#d4a574]/20 flex items-center justify-center">
              <PoundSterling className="w-6 h-6 text-[#d4a574]" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${data.comparedToLast >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.comparedToLast >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(data.comparedToLast)}%
            </div>
          </div>
          <p className="text-[#7a6f63] text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-[#f5f0eb]">£{data.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
            <ShoppingBag className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-[#7a6f63] text-sm mb-1">Orders</p>
          <p className="text-3xl font-bold text-[#f5f0eb]">{data.orderCount}</p>
        </div>

        <div className="bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-[#7a6f63] text-sm mb-1">Customers</p>
          <p className="text-3xl font-bold text-[#f5f0eb]">{data.customerCount}</p>
        </div>

        <div className="bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-[#7a6f63] text-sm mb-1">Avg Order Value</p>
          <p className="text-3xl font-bold text-[#f5f0eb]">£{data.avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <h2 className="text-lg font-bold text-[#f5f0eb] mb-4">Revenue Overview</h2>
          <div className="flex items-end gap-2 h-48">
            {data.hourlyData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-[#d4a574] rounded-t-lg transition-all hover:bg-[#c9946a]"
                  style={{ height: `${(item.revenue / maxHourlyRevenue) * 100}%` }}
                ></div>
                <span className="text-[#7a6f63] text-xs">{item.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <h2 className="text-lg font-bold text-[#f5f0eb] mb-4">Payment Methods</h2>
          <div className="space-y-4">
            {data.paymentMethods.map((method, idx) => {
              const percentage = (method.amount / data.totalRevenue) * 100
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {method.method === 'Card' ? (
                        <CreditCard className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Banknote className="w-5 h-5 text-green-400" />
                      )}
                      <span className="text-[#f5f0eb] font-medium">{method.method}</span>
                    </div>
                    <span className="text-[#a89f92] text-sm">{method.count} orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-[#3d342b] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${method.method === 'Card' ? 'bg-blue-400' : 'bg-green-400'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[#f5f0eb] font-semibold w-24 text-right">
                      £{method.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="lg:col-span-3 bg-[#242424] rounded-2xl p-5 border border-[#3d342b]">
          <h2 className="text-lg font-bold text-[#f5f0eb] mb-4">Top Selling Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {data.topItems.map((item, idx) => {
              const icons = [Coffee, Coffee, Coffee, Croissant, Sandwich]
              const Icon = icons[idx] || Coffee
              return (
                <div key={idx} className="bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#d4a574]/20 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <p className="text-[#f5f0eb] font-medium mb-1">{item.name}</p>
                  <p className="text-[#d4a574] font-bold text-lg">£{item.revenue.toFixed(2)}</p>
                  <p className="text-[#7a6f63] text-sm">{item.quantity} sold</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
