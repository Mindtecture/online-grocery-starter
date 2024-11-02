import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Local Harvest Market</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-green-200">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-200">Shop</Link></li>
            <li><Link to="/farmers" className="hover:text-green-200">Farmers</Link></li>
            <li>
              <Link to="/cart" className="hover:text-green-200 flex items-center">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </li>
            <li><Link to="/account" className="hover:text-green-200"><User size={20} /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;