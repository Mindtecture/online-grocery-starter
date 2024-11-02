import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CreditCard, Truck, Calendar } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState<'asap' | 'scheduled'>('asap');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = deliveryOption === 'asap' ? 5.99 : 2.99;
  const total = subtotal + shippingCost;

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the order and create an account if requested
    console.log('Order submitted:', { personalInfo, deliveryOption, deliveryDate, deliveryTimeSlot, paymentMethod, cardInfo, items, createAccount, password });
    clearCart();
    navigate('/order-confirmation');
  };

  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Delivery Address"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={personalInfo.city}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={personalInfo.zipCode}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Delivery Options</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="asap"
                    checked={deliveryOption === 'asap'}
                    onChange={() => setDeliveryOption('asap')}
                  />
                  <span>As soon as possible (${shippingCost.toFixed(2)})</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="scheduled"
                    checked={deliveryOption === 'scheduled'}
                    onChange={() => setDeliveryOption('scheduled')}
                  />
                  <span>Schedule for later (${shippingCost.toFixed(2)})</span>
                </label>
                {deliveryOption === 'scheduled' && (
                  <div className="ml-6 space-y-2">
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span>Credit/Debit Card</span>
                </label>
                {paymentMethod === 'card' && (
                  <div className="ml-6 space-y-2">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardInfo.cardNumber}
                      onChange={handleCardInfoChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardInfo.expiryDate}
                        onChange={handleCardInfoChange}
                        className="w-1/2 p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardInfo.cvv}
                        onChange={handleCardInfoChange}
                        className="w-1/2 p-2 border rounded"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="cardholderName"
                      placeholder="Cardholder Name"
                      value={cardInfo.cardholderName}
                      onChange={handleCardInfoChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={createAccount}
                  onChange={(e) => setCreateAccount(e.target.checked)}
                />
                <span>Create an account for faster checkout</span>
              </label>
              {createAccount && (
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-2"
                  required
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-2 mb-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex justify-between">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;