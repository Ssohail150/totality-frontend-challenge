// src/components/Cart.tsx

import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, updateQuantity, removeFromCart }) => {
  // Ensure cartItems is defined and is an array
  const validCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {validCartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {validCartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={`/images/${item.id}.jpeg`} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>{formatCurrency(item.price)} x {item.quantity}</p>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>Increase</button>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>Decrease</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
