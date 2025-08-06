import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ShoppingCart, Heart, Filter, Star, ChevronDown } from 'lucide-react';
import { MerchItem, CartItem } from '../../types';

interface MerchProps {
  cart: CartItem[];
  addToCart: (item: MerchItem, size?: string) => void;
  onViewCart: () => void;
}

export const Merch: React.FC<MerchProps> = ({ cart, addToCart, onViewCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetically');
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'beats', label: 'Beats' },
    { id: 'limited', label: 'Limited Edition' }
  ];

  const sortOptions = [
    { id: 'alphabetically', label: 'Alphabetically, A-Z' },
    { id: 'price-low', label: 'Price, Low to High' },
    { id: 'price-high', label: 'Price, High to Low' },
    { id: 'newest', label: 'Date, New to Old' }
  ];

  const merchItems: MerchItem[] = [
    {
      id: '1',
      name: 'Athletic Joggers (AOP)',
      price: 119.99,
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
      description: 'All-over print athletic joggers with premium comfort fit',
      category: 'clothing',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: 50,
      isNew: true
    },
    {
      id: '2',
      name: 'Basketball Rib Shorts (AOP)',
      price: 69.99,
      images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'],
      description: 'Premium basketball shorts with all-over print design',
      category: 'clothing',
      stock: 35
    },
    {
      id: '3',
      name: 'Cashless Society Knit Beanie',
      price: 49.99,
      images: ['https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg'],
      description: 'Trendy winter hat. Embroidered beanie. Gift for tech lovers. Casual knitwear. Warm headwear',
      category: 'accessories',
      stock: 25,
      isNew: true
    },
    {
      id: '4',
      name: 'Classic Dad Cap',
      price: 16.88,
      images: ['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'],
      description: 'Classic adjustable dad cap with embroidered logo',
      category: 'accessories',
      stock: 100
    },
    {
      id: '5',
      name: 'Vertical and Horizontal Matte Posters',
      price: 29.99,
      images: ['https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'],
      description: 'High-quality matte finish posters in multiple orientations',
      category: 'limited',
      stock: 15
    },
    {
      id: '6',
      name: 'Unisex Midweight Softstyle Fleece Crewneck Sweatshirt',
      price: 99.99,
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
      description: 'Premium fleece crewneck with soft cotton blend',
      category: 'clothing',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: 40
    },
    {
      id: '7',
      name: 'Unisex Lightweight Hooded Sweatshirt',
      price: 99.99,
      images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'],
      description: 'Comfortable lightweight hoodie perfect for any season',
      category: 'clothing',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: 30
    },
    {
      id: '8',
      name: 'The Power Struggle - A Fierce Battle',
      price: 24.99,
      images: ['https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg'],
      description: 'Exclusive digital artwork collection',
      category: 'limited',
      stock: 5
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? merchItems 
    : merchItems.filter(item => item.category === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-6">
      {/* Header */}
      <div className="text-center py-8 border-b border-white/10">
        <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-4 tracking-wider">
          PRODUCTS
        </h1>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <span className="filter-label">Filter:</span>
            <div className="flex space-x-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select appearance-none pr-8"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select appearance-none pr-8"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="filter-label">Sort by:</span>
          <span className="product-count">{sortedItems.length} PRODUCTS</span>
          <button 
            onClick={onViewCart}
            className="relative p-2 text-white hover:text-red-600 transition-colors"
          >
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {sortedItems.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-image">
              <img 
                src={item.images[0]} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="product-info">
              <h3 className="product-title">{item.name}</h3>
              <p className="product-price">${item.price} AUD</p>
              <p className="product-description">{item.description}</p>
              
              {/* Sizes (if applicable) */}
              {item.sizes && (
                <div className="mb-4">
                  <p className="text-white font-cinzel font-semibold mb-2">Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <span key={size} className="px-3 py-1 border border-white/20 text-gray-300 text-sm font-josefin">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => setSelectedItem(item)}
                className="add-to-cart-btn"
                disabled={item.stock === 0}
              >
                {item.stock === 0 ? 'Out of Stock' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl modal-noir rounded overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white font-cinzel font-semibold text-xl">{selectedItem.name}</h3>
              <button 
                onClick={() => {
                  setSelectedItem(null);
                  setSelectedSize('');
                }}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedItem.images[0]} 
                    alt={selectedItem.name}
                    className="w-full aspect-square object-cover rounded"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-red-600 font-josefin">${selectedItem.price} AUD</span>
                    <span className="text-gray-400 font-josefin">
                      {selectedItem.stock > 0 ? `${selectedItem.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 font-josefin leading-relaxed">{selectedItem.description}</p>
                  
                  {selectedItem.sizes && (
                    <div className="mb-6">
                      <p className="text-white font-cinzel font-semibold mb-3">Select Size:</p>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-black border border-white/20 text-white p-3 rounded font-josefin focus:border-red-600 focus:outline-none"
                      >
                        <option value="">Choose a size</option>
                        {selectedItem.sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button 
                      onClick={() => {
                        addToCart(selectedItem, selectedSize || undefined);
                        setSelectedItem(null);
                        setSelectedSize('');
                      }}
                      className="flex-1"
                      disabled={selectedItem.stock === 0 || (selectedItem.sizes && !selectedSize)}
                    >
                      {selectedItem.stock === 0 
                        ? 'Out of Stock' 
                        : selectedItem.sizes && !selectedSize 
                        ? 'Select Size' 
                        : 'Add to Cart'
                      }
                    </Button>
                    <Button variant="secondary" className="px-8">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};