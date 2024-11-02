import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FarmersPage from './pages/FarmersPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { Product, Farmer } from './types';

const AppContent: React.FC = () => {
  const { addToCart, items, clearCart } = useCart();
  
  const products: Product[] = [
    { id: '1', name: 'Fresh Apples', description: 'Crisp and juicy apples', price: 2.99, quantity: 100, farmerId: '1', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6', category: 'Fruits' },
    { id: '2', name: 'Organic Carrots', description: 'Sweet and crunchy carrots', price: 1.99, quantity: 150, farmerId: '2', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37', category: 'Vegetables' },
    { id: '3', name: 'Free-range Eggs', description: 'Farm-fresh eggs', price: 3.99, quantity: 60, farmerId: '1', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f', category: 'Dairy' },
    { id: '4', name: 'Organic Spinach', description: 'Nutrient-rich spinach leaves', price: 2.49, quantity: 80, farmerId: '2', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb', category: 'Vegetables' },
    { id: '5', name: 'Honey', description: 'Pure, local honey', price: 6.99, quantity: 40, farmerId: '3', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38', category: 'Pantry' },
    { id: '6', name: 'Artisan Bread', description: 'Freshly baked artisan bread', price: 4.99, quantity: 30, farmerId: '3', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', category: 'Bakery' },
  ];

  const farmers: Farmer[] = [
    { id: '1', name: 'John Smith', email: 'john@example.com' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com' },
    { id: '3', name: 'Mike Brown', email: 'mike@example.com' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage products={products} addToCart={addToCart} />} />
            <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/farmers" element={<FarmersPage products={products} farmers={farmers} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;