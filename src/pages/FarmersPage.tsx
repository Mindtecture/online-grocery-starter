import React, { useState } from 'react';
import { Product, Farmer } from '../types';
import FarmerDashboard from '../components/FarmerDashboard';

interface FarmersPageProps {
  products: Product[];
  farmers: Farmer[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const FarmersPage: React.FC<FarmersPageProps> = ({ products, farmers, setProducts }) => {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Farmers Dashboard</h1>
      
      {!selectedFarmer ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Farmer</h2>
          <ul className="space-y-4">
            {farmers.map((farmer) => (
              <li key={farmer.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{farmer.name}</h3>
                <p className="text-gray-600">{farmer.email}</p>
                <button
                  onClick={() => setSelectedFarmer(farmer)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  View Dashboard
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedFarmer(null)}
            className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Back to Farmer List
          </button>
          <FarmerDashboard
            farmerId={selectedFarmer.id}
            farmerName={selectedFarmer.name}
            products={products.filter(p => p.farmerId === selectedFarmer.id)}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        </div>
      )}
    </div>
  );
};

export default FarmersPage;