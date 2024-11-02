import React, { useState, ChangeEvent } from 'react';
import { Product } from '../types';
import EditProductModal from './EditProductModal';

interface FarmerDashboardProps {
  farmerId: string;
  farmerName: string;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ farmerId, farmerName, products, onAddProduct, onUpdateProduct }) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setNewProduct({ ...newProduct, image: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    } else if (type === 'number') {
      setNewProduct({ ...newProduct, [name]: parseFloat(value) });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: Product = {
      id: Date.now().toString(),
      ...newProduct as Product,
      farmerId,
      price: parseFloat(newProduct.price as string) || 0,
      quantity: parseInt(newProduct.quantity as string) || 0,
    };
    onAddProduct(productToAdd);
    setNewProduct({});
    setImagePreview(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    onUpdateProduct(updatedProduct);
    setEditingProduct(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{farmerName}'s Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Add New Product</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            step="0.01"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Product preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Product
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Products</h3>
        {products.length === 0 ? (
          <p>You haven't added any products yet.</p>
        ) : (
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                <div className="flex items-center">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                  )}
                  <div>
                    <span className="font-semibold">{product.name}</span>
                    <span className="ml-4 text-gray-600">Quantity: {product.quantity}</span>
                  </div>
                </div>
                <div>
                  <span className="mr-4">${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</span>
                  <button 
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;