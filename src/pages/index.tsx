// src/pages/index.tsx

import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import { formatCurrency } from '../utils/formatCurrency';

interface Property {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  amenities: string[];
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const properties: Property[] = [
  {
    id: '1',
    image: '/images/download.jpeg',
    title: 'Sunny Apartment',
    description: 'A bright and cozy apartment with a beautiful view.',
    price: 120,
    location: 'New York',
    bedrooms: 2,
    amenities: ['wifi', 'pool'],
  },
  {
    id: '2',
    image: '/images/download1.jpeg',
    title: 'Modern House',
    description: 'A spacious modern house with all amenities.',
    price: 250,
    location: 'San Francisco',
    bedrooms: 3,
    amenities: ['wifi', 'gym'],
  },
  {
    id: '3',
    image: '/images/download2.jpeg',
    title: 'Beachfront Villa',
    description: 'Luxurious villa right on the beach.',
    price: 400,
    location: 'Miami',
    bedrooms: 4,
    amenities: ['wifi', 'pool', 'beachfront'],
  },
  {
    id: '4',
    image: '/images/download3.jpeg',
    title: 'City Center Loft',
    description: 'Stylish loft in the heart of the city.',
    price: 180,
    location: 'Chicago',
    bedrooms: 1,
    amenities: ['wifi'],
  },
];

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState({
      location: '',
      minPrice: 0,
      maxPrice: Infinity,
      minBedrooms: 0,
      amenities: [] as string[],
    });
  
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    const filteredProperties = properties.filter(property => {
      const matchesLocation = !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      const matchesBedrooms = property.bedrooms >= filters.minBedrooms;
      const matchesAmenities = filters.amenities.length === 0 || filters.amenities.every(amenity => property.amenities.includes(amenity));
  
      return matchesLocation && matchesPrice && matchesBedrooms && matchesAmenities;
    });
  
    const handleAddToCart = (item: CartItem) => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          return prevItems.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
        }
        return [...prevItems, { ...item, quantity: 1 }];
      });
    };
  
    const handleRemoveFromCart = (id: string) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };
  
    const handleQuantityChange = (id: string, quantity: number) => {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
      );
    };
  
    return (
      <div className="container">
        <h1>Property Listings</h1>
  
        {/* Filters */}
        <div className="filters">
          <label>
            Location:
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </label>
          <label>
            Min Price:
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: +e.target.value })}
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })}
            />
          </label>
          <label>
            Min Bedrooms:
            <input
              type="number"
              value={filters.minBedrooms}
              onChange={(e) => setFilters({ ...filters, minBedrooms: +e.target.value })}
            />
          </label>
          <label>
            Amenities:
            <input
              type="text"
              value={filters.amenities.join(', ')}
              onChange={(e) => setFilters({ ...filters, amenities: e.target.value.split(',').map(item => item.trim()) })}
            />
          </label>
        </div>
  
        <div className="property-list">
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.image}
              title={property.title}
              description={property.description}
              price={property.price}
              addToCart={handleAddToCart}
            />
          ))}
        </div>
  
        <div className="side-panels">
          <div className="cart">
            <Cart
              cartItems={cartItems}
              updateQuantity={handleQuantityChange}
              removeFromCart={handleRemoveFromCart}
            />
          </div>
          <div className="checkout">
            <Checkout cartItems={cartItems} />
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;