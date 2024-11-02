export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  farmerId: string;
  image?: string;
  category: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  customerId: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}