import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleQuantityChange = (productId: string, change: number) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {items.map((item) => (
              <li key={item.product.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div className="flex items-center flex-grow">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">${item.product.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(item.product.id, -1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.product.id, 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl">Total:</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-green-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-green-600 transition duration-300 text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;