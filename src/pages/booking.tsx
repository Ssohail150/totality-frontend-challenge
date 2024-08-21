// src/pages/booking.tsx
import React from 'react';
import Cart from '../components/Cart';

const BookingPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Your Bookings</h1>
      <Cart />
    </div>
  );
};

export default BookingPage;
