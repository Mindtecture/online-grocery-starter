import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Star } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

const AccountPage: React.FC = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    loyaltyPoints: 150,
  });

  const [orders] = useState<Order[]>([
    { id: '1001', date: '2024-03-01', total: 75.50, status: 'Delivered' },
    { id: '1002', date: '2024-02-15', total: 45.20, status: 'Delivered' },
    { id: '1003', date: '2024-01-30', total: 120.00, status: 'Processing' },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <User className="w-12 h-12 text-green-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-lg font-semibold">{user.loyaltyPoints} Loyalty Points</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p>You haven't placed any orders yet.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <Link to={`/order/${order.id}`} className="text-blue-500 hover:underline text-sm">
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;