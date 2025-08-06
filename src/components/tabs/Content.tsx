import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Play, Heart, Eye, Filter } from 'lucide-react';
import { MediaContent } from '../../types';

export const Content: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: '🔥' },
    { id: 'beats', label: 'Beats', icon: '🎧' },
    { id: 'behind-scenes', label: 'Behind the Scenes', icon: '🎬' },
    { id: 'freestyles', label: 'Freestyles', icon: '🎤' },
    { id: 'visuals', label: 'Visuals', icon: '🖼️' }
  ];

  const content: MediaContent[] = [
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
      title: 'Studio Session Raw',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      url: '#',
      category: 'behind-scenes',
      likes: 892,
      views: 3210
    },
    {
      id: '3',
      title: 'Fire Freestyle #12',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg',
      url: '#',
      category: 'freestyles',
      likes: 2156,
      views: 8743,
      isNew: true
    },
    {
      id: '4',
      title: 'Abstract Waves',
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      url: '#',
      category: 'visuals',
      likes: 634,
      views: 1890
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? content 
    : content.filter(item => item.category === selectedCategory);

  const handleMediaClick = (media: MediaContent) => {
    setSelectedMedia(media);
    setShowPlayer(true);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Content Library</h1>
        <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredContent.map((item) => (
          <Card 
            key={item.id} 
            className="p-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => handleMediaClick(item)}
          >
            <div className="relative">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Type Icon */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white ${
                  item.type === 'video' ? 'bg-red-500/80' :
                  item.type === 'audio' ? 'bg-green-500/80' : 'bg-purple-500/80'
                }`}>
                  {item.type === 'video' ? '▶️' : item.type === 'audio' ? '🎵' : '🖼️'}
                </span>
              </div>

              {/* New Badge */}
              {item.isNew && (
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    NEW
                  </span>
                </div>
              )}

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="text-white ml-1" size={24} />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <div className="flex items-center justify-between text-gray-300 text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{item.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart size={14} />
                      <span>{item.likes.toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Media Player Modal */}
      {showPlayer && selectedMedia && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div>
                <h3 className="text-white font-semibold">{selectedMedia.title}</h3>
                <p className="text-gray-400 text-sm">
                  {selectedMedia.views.toLocaleString()} views • {selectedMedia.likes.toLocaleString()} likes
                </p>
              </div>
              <button 
                onClick={() => setShowPlayer(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center">
                <Play className="text-white mx-auto mb-4" size={64} />
                <p className="text-gray-300">Media player would be embedded here</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                  <Heart size={18} />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <span>Share</span>
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};