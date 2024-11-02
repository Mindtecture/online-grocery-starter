import React, { useState, ChangeEvent } from 'react';
import { Product } from '../types';

interface EditProductModalProps {
  product: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [imagePreview, setImagePreview] = useState<string | null>(product.image || null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setEditedProduct({ ...editedProduct, image: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    } else if (type === 'number') {
      setEditedProduct({ ...editedProduct, [name]: parseFloat(value) });
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editedProduct,
      price: parseFloat(editedProduct.price.toString()),
      quantity: parseInt(editedProduct.quantity.toString()),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={editedProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={editedProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={editedProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            step="0.01"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={editedProduct.quantity}
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
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;