// src/components/Checkout.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { formatCurrency } from '../utils/formatCurrency';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setBookingConfirmed(true);

    // Simulate an API call or some process
    setTimeout(() => {
      // Redirect to a new page or show a confirmation message
      router.push('/confirmation'); // Replace with your confirmation page route
    }, 1000);
  };

  if (bookingConfirmed) {
    return (
      <div className="confirmation-message">
        <h2>Booking Confirmed!</h2>
        <p>Thank you for your booking. You will be redirected shortly...</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Total Cost: {formatCurrency(totalCost)}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method">Payment Method:</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Checkout;
