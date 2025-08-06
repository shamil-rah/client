import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProfileWidget } from '../ui/ProfileWidget';
import { Play, Heart, MessageSquare, Calendar, Sparkles, Users, Music, ShoppingBag, TrendingUp } from 'lucide-react';
import { MediaContent, MerchItem, Post } from '../../types';

interface HomeProps {
  onTabChange: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onTabChange }) => {
  // Community Updates
  const communityUpdates: Post[] = [
    {
      id: '1',
      author: 'SoundWave Artist',
      avatar: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      content: 'Just finished a late night session! The new track is coming together beautifully.',
      timestamp: new Date(Date.now() - 3600000),
      likes: 234,
      comments: 45,
      isAnnouncement: true
    },
    {
      id: '2',
      author: 'VibeMaster_99',
      avatar: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      content: 'That last freestyle session was INSANE! 🔥 Already listened to it 10 times today',
      timestamp: new Date(Date.now() - 7200000),
      likes: 89,
      comments: 23
    }
  ];

  // Latest Content Releases
  const latestContent: MediaContent[] = [
    {
      id: '1',
      title: 'Midnight Vibes',
      type: 'audio',
      thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      url: '#',
      category: 'beats',
      likes: 1248,
      views: 5432,
      isNew: true
    },
    {
      id: '2',
      title: 'Fire Freestyle #12',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg',
      url: '#',
      category: 'freestyles',
      likes: 2156,
      views: 8743,
      isNew: true
    }
  ];

  // New Merch Highlights
  const newMerch: MerchItem[] = [
    {
      id: '1',
      name: 'Athletic Joggers (AOP)',
      price: 119.99,
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
      description: 'All-over print athletic joggers with premium comfort fit',
      category: 'clothing',
      stock: 50,
      isNew: true
    },
    {
      id: '3',
      name: 'Cashless Society Knit Beanie',
      price: 49.99,
      images: ['https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg'],
      description: 'Trendy winter hat. Embroidered beanie.',
      category: 'accessories',
      stock: 25,
      isNew: true
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-2 tracking-wider">
          COMMUNITY DASHBOARD
        </h1>
        <p className="text-gray-400 font-josefin">Stay connected with the collective</p>
      </div>

      {/* User Profile Widget */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3 font-cinzel">YOUR PROFILE</h2>
        <ProfileWidget onViewProfile={() => onTabChange('profile')} />
      </div>

      {/* Community Updates */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center font-cinzel">
          <Users className="mr-2" size={24} />
          COMMUNITY UPDATES
        </h2>
        <div className="space-y-3">
          {communityUpdates.slice(0, 3).map((update) => (
            <Card key={update.id} className="hover:border-red-500/50">
              <div className="flex items-start space-x-3">
                <img 
                  src={update.avatar} 
                  alt={update.author}
                  className="w-10 h-10 rounded object-cover border border-white/10"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-white font-cinzel text-sm">{update.author}</h3>
                    {update.isAnnouncement && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold font-cinzel">
                        ARTIST
                      </span>
                    )}
                    <span className="text-gray-500 text-xs font-josefin">{formatTimeAgo(update.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{update.content}</p>
                </div>
              </div>
            </Card>
          ))}
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => onTabChange('community')}
          >
            View All Community Posts
          </Button>
        </div>
      </div>

      {/* Latest Content Releases */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center font-cinzel">
          <Music className="mr-2" size={24} />
          LATEST CONTENT
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestContent.map((content) => (
            <Card key={content.id} className="p-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => onTabChange('content')}>
              <div className="relative">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {content.isNew && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold font-cinzel">
                      NEW
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-red-600/80 backdrop-blur-sm rounded flex items-center justify-center">
                    <Play className="text-white ml-0.5" size={16} />
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-semibold text-sm font-cinzel">{content.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-4" 
          onClick={() => onTabChange('content')}
        >
          Explore All Content
        </Button>
      </div>

      {/* New Merch Highlights */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center font-cinzel">
          <ShoppingBag className="mr-2" size={24} />
          NEW MERCH
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newMerch.map((item) => (
            <Card key={item.id} className="p-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => onTabChange('merch')}>
              <div className="relative">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {item.isNew && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold font-cinzel">
                      NEW
                    </span>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-semibold text-sm font-cinzel">{item.name}</h3>
                  <p className="text-red-400 font-josefin text-sm">${item.price} AUD</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-4" 
          onClick={() => onTabChange('merch')}
        >
          Shop All Merch
        </Button>
      </div>

      {/* Quick Stats */}
      <Card className="border-red-600/40">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center font-cinzel">
          <TrendingUp className="mr-2" size={20} />
          COMMUNITY STATS
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-red-400">1.2k</p>
            <p className="text-gray-400 text-sm font-josefin">Active Fans</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">89</p>
            <p className="text-gray-400 text-sm font-josefin">New Tracks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">456</p>
            <p className="text-gray-400 text-sm font-josefin">Community Posts</p>
          </div>
        </div>
      </Card>
    </div>
  );
};