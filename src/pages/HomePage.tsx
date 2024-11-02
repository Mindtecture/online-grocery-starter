import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, ThumbsUp, Star } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, addToCart }) => {
  const featuredProducts = products.slice(0, 3);
  const flashSaleProducts = products.slice(3, 6);

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Fresh produce"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Local Harvest Market</h1>
              <p className="text-xl text-white mb-8">Fresh, local produce delivered to your doorstep</p>
              <Link to="/products" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sales Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Flash Sales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-500">
              <div className="bg-green-500 text-white text-center py-2">
                <span className="font-semibold">Limited Time Offer!</span>
              </div>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-600">${(product.price * 0.8).toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">1. Choose Your Products</h3>
            <p className="text-gray-600">Browse our selection of fresh, locally-sourced products.</p>
          </div>
          <div className="text-center">
            <Truck size={48} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">2. We Deliver</h3>
            <p className="text-gray-600">We'll deliver your order right to your doorstep.</p>
          </div>
          <div className="text-center">
            <ThumbsUp size={48} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">3. Enjoy Fresh Produce</h3>
            <p className="text-gray-600">Enjoy your farm-fresh products and support local farmers.</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                alt="Sarah J." 
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">"The produce from Local Harvest Market is always fresh and delicious. I love supporting local farmers!"</p>
            <p className="font-semibold">- Sarah J.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                alt="Mike T." 
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">"Great selection of organic products and excellent customer service. Highly recommended!"</p>
            <p className="font-semibold">- Mike T.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                alt="Emily R." 
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">"I've been a regular customer for months now. The quality and freshness are unmatched!"</p>
            <p className="font-semibold">- Emily R.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p>Local Harvest Market connects you with the freshest produce from local farmers. We're committed to supporting sustainable agriculture and bringing you the best quality products.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-green-200">Home</Link></li>
                <li><Link to="/products" className="hover:text-green-200">Shop</Link></li>
                <li><Link to="/farmers" className="hover:text-green-200">Our Farmers</Link></li>
                <li><Link to="/about" className="hover:text-green-200">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-green-200">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>123 Farm Road, Harvest Town, HT 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@localharvestmarket.com</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Local Harvest Market. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;