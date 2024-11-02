import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Users, TrendingUp } from 'lucide-react';

// Mock data for the dashboard
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const orders = [
  { id: '1001', customer: 'John Doe', total: 75.50, status: 'Processing' },
  { id: '1002', customer: 'Jane Smith', total: 120.00, status: 'Shipped' },
  { id: '1003', customer: 'Bob Johnson', total: 45.20, status: 'Delivered' },
  { id: '1004', customer: 'Alice Brown', total: 95.00, status: 'Processing' },
  { id: '1005', customer: 'Charlie Davis', total: 150.75, status: 'Shipped' },
];

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const totalSales = salesData.reduce((sum, data) => sum + data.sales, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalSales / totalOrders;

  const renderOverview = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="w-10 h-10 text-green-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold">250</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="w-10 h-10 text-yellow-500 mr-4" />
            <div>
              <p className="text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-500 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className={`mr-4 ${activeTab === 'overview' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${activeTab === 'orders' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>
      {activeTab === 'overview' ? renderOverview() : renderOrders()}
    </div>
  );
};

export default AdminDashboardPage;