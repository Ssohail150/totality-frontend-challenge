// src/components/PropertyCard.tsx
import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  addToCart: (item: CartItem) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ id, image, title, description, price, addToCart }) => {
  const handleAddToCart = () => {
    addToCart({ id, title, price, quantity: 1 });
  };

  return (
    <div className="property-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{formatCurrency(price)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default PropertyCard;
