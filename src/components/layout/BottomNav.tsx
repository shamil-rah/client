import React from 'react';
import { Home, Play, ShoppingBag, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'content', icon: Play, label: 'Content' },
    { id: 'merch', icon: ShoppingBag, label: 'Merch' },
    { id: 'community', icon: MessageCircle, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded transition-all duration-300 ${
              activeTab === id
                ? 'text-red-600 bg-white/5'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs font-medium font-josefin">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};