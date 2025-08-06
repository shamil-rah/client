import React, { useState, useEffect } from 'react';
import { CodeEntry } from './components/auth/CodeEntry';
import { LoginPage } from './components/auth/LoginPage';
import { BottomNav } from './components/layout/BottomNav';
import { Home } from './components/tabs/Home';
import { Content } from './components/tabs/Content';
import { Merch } from './components/tabs/Merch';
import { Community } from './components/tabs/Community';
import { Profile } from './components/tabs/Profile';

type AppState = 'code-entry' | 'login' | 'main-app';

function App() {
  const [appState, setAppState] = useState<AppState>('code-entry');
  const [activeTab, setActiveTab] = useState('home');


  const handleCodeValidated = () => {
    setAppState('login');
  };

  const handleLoginComplete = () => {
    setAppState('main-app');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'content':
        return <Content />;
      case 'merch':
        return <Merch />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };


  if (appState === 'code-entry') {
    return <CodeEntry onCodeValidated={handleCodeValidated} />;
  }

  if (appState === 'login') {
    return <LoginPage onLogin={handleLoginComplete} />;
  }

 return (
  <div className="min-h-screen bg-black flex">
    {/* Desktop Sidebar Navigation */}
    <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-black border-r border-white/10 z-30 flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="/CASHLESS_SOCIETY.png" 
            alt="Cashless Society Logo" 
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-white text-lg font-cinzel font-semibold tracking-wider leading-tight">
            CASHLESS<br/>SOCIETY
          </h1>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'home', label: 'Home' },
            { id: 'content', label: 'Content' },
            { id: 'merch', label: 'Merch' },
            { id: 'community', label: 'Community' },
            { id: 'profile', label: 'Profile' }
          ].map(({ id, label }) => (
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
              src="/CASHLESS_SOCIETY.png" 
              alt="Cashless Society Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <h1 className="text-white text-lg md:text-xl font-cinzel font-semibold tracking-wider">
              CASHLESS SOCIETY
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
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  </div>
);

}

export default App;
