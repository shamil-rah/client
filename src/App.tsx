import React, { useState, useEffect } from 'react';
import { CodeEntry } from './components/auth/CodeEntry';
import { LoginPage } from './components/auth/LoginPage';
import { BottomNav } from './components/layout/BottomNav';
import { Home } from './components/tabs/Home';
import { Content } from './components/tabs/Content';
import { Merch } from './components/tabs/Merch';
import { Cart } from './components/tabs/Cart';
import { Community } from './components/tabs/Community';
import { Profile } from './components/tabs/Profile';
import { FunnelMarketplace } from './components/tabs/FunnelMarketplace';
import { FunnelBids } from './components/tabs/FunnelBids';
import { CartItem } from './types';

type AppState = 'code-entry' | 'login' | 'main-app';
type AppMode = 'music' | 'funnel';

function App() {
  const [appState, setAppState] = useState<AppState>('code-entry');
  const [appMode, setAppMode] = useState<AppMode>('music');
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [enteredCode, setEnteredCode] = useState('');

  const handleCodeValidated = (code: string) => {
    setEnteredCode(code);
    setAppMode(code === 'FUNNELMARKET2024' ? 'funnel' : 'music');
    setAppState('login');
  };

  const handleLoginComplete = () => {
    setAppState('main-app');
  };

  const addToCart = (item: any, size?: string) => {
    const existingItem = cart.find(cartItem => 
      cartItem.item.id === item.id && cartItem.size === size
    );

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.item.id === item.id && cartItem.size === size
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { id: Date.now().toString(), item, quantity: 1, size }]);
    }
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const renderContent = () => {
    if (appMode === 'funnel') {
      switch (activeTab) {
        case 'home':
          return <FunnelMarketplace onTabChange={setActiveTab} />;
        case 'content':
          return <FunnelBids />;
        case 'merch':
          return <FunnelMarketplace onTabChange={setActiveTab} />;
        case 'cart':
          return <FunnelBids />;
        case 'community':
          return <Community />;
        case 'profile':
          return <Profile />;
        default:
          return <FunnelMarketplace onTabChange={setActiveTab} />;
      }
    }

    switch (activeTab) {
      case 'home':
        return <Home onTabChange={setActiveTab} />;
      case 'content':
        return <Content />;
      case 'merch':
        return <Merch cart={cart} addToCart={addToCart} onViewCart={() => setActiveTab('cart')} />;
      case 'cart':
        return <Cart 
          cart={cart} 
          updateQuantity={updateCartQuantity} 
          removeFromCart={removeFromCart} 
          onBackToMerch={() => setActiveTab('merch')} 
        />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  const getNavLabels = () => {
    if (appMode === 'funnel') {
      return [
        { id: 'home', label: 'Marketplace' },
        { id: 'content', label: 'My Bids' },
        { id: 'merch', label: 'Browse' },
        { id: 'cart', label: 'Watchlist' },
        { id: 'community', label: 'Community' },
        { id: 'profile', label: 'Profile' }
      ];
    }
    return [
      { id: 'home', label: 'Home' },
      { id: 'content', label: 'Content' },
      { id: 'merch', label: 'Merch' },
      { id: 'cart', label: 'Cart' },
      { id: 'community', label: 'Community' },
      { id: 'profile', label: 'Profile' }
    ];
  };

  if (appState === 'code-entry') {
    return <CodeEntry onCodeValidated={(code) => handleCodeValidated(code)} />;
  }

  if (appState === 'login') {
    return <LoginPage onLogin={handleLoginComplete} />;
  }

  const appTitle = appMode === 'funnel' ? 'FUNNEL MARKETPLACE' : 'CASHLESS SOCIETY';
  const logoSrc = appMode === 'funnel' ? '/CASHLESS_SOCIETY.png' : '/CASHLESS_SOCIETY.png';

 return (
  <div className="min-h-screen bg-black flex">
    {/* Desktop Sidebar Navigation */}
    <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-black border-r border-white/10 z-30 flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src={logoSrc}
            alt={`${appTitle} Logo`}
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-white text-lg font-cinzel font-semibold tracking-wider leading-tight text-center">
            {appMode === 'funnel' ? (
              <>FUNNEL<br/>MARKETPLACE</>
            ) : (
              <>CASHLESS<br/>SOCIETY</>
            )}
          </h1>
        </div>
        
        <nav className="space-y-2">
          {getNavLabels().map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center justify-start px-4 py-3 transition-all duration-300 font-josefin ${
                activeTab === id
                  ? 'text-red-600 border-l-2 border-red-600 bg-white/5'
                  : 'text-white hover:text-red-600 hover:bg-white/5'
              }`}
            >
              <span className="font-medium">{label}</span>
              {id === 'cart' && cart.length > 0 && appMode === 'music' && (
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>

    {/* Main Content Area (shifted right for sidebar) */}
    <div className="flex-1 md:ml-64 flex flex-col">
           {/* Header */}
      <header className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <img 
              src={logoSrc}
              alt={`${appTitle} Logo`}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <h1 className="text-white text-lg md:text-xl font-cinzel font-semibold tracking-wider">
              {appTitle}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Add header icons/buttons here if needed */}
          </div>
        </div>
      </header>

        
      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} labels={getNavLabels()} />
      </div>
    </div>
  </div>
);

}

export default App;
