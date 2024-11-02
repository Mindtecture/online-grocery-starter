import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductList from '../components/ProductList';
import { Search } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, addToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', ...new Set(products.map(product => product.category))];

  useEffect(() => {
    const filtered = products.filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Shop Our Products (Updated)</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category ? 'bg-green-500 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="mb-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 pr-4 border rounded"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">No products found.</p>
          ) : (
            <ProductList products={filteredProducts} addToCart={addToCart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;