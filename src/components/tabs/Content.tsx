import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play, Heart, Eye, Filter, ArrowLeft, Share, Headphones, Video, Image as ImageIcon, Flame, Music, Film, Mic, Palette } from 'lucide-react';
import { MediaContent } from '../../types';

export const Content: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: Flame },
    { id: 'beats', label: 'Beats', icon: Headphones },
    { id: 'behind-scenes', label: 'Behind the Scenes', icon: Film },
    { id: 'freestyles', label: 'Freestyles', icon: Mic },
    { id: 'visuals', label: 'Visuals', icon: Palette }
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
      description: 'Dark atmospheric beat with haunting melodies and crushing 808s. Perfect for late night sessions.',
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
      views: 3210,
      description: 'Exclusive behind-the-scenes footage from our latest recording session. See the creative process unfold.'
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
      description: 'Raw freestyle session over dark instrumentals. Pure energy and lyrical prowess on display.',
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
      views: 1890,
      description: 'Digital artwork exploring the intersection of sound and visual art. Part of our visual album series.'
    },
    {
      id: '5',
      title: 'Dark Ritual Beat',
      type: 'audio',
      thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      url: '#',
      category: 'beats',
      likes: 1567,
      views: 4321,
      description: 'Ceremonial dark beat with ritualistic elements and deep bass frequencies.'
    },
    {
      id: '6',
      title: 'Sanctum Tour',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      url: '#',
      category: 'behind-scenes',
      likes: 2341,
      views: 7890,
      description: 'Take a tour through the creative sanctum where all the magic happens.'
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? content 
    : content.filter(item => item.category === selectedCategory);

  const selectedMedia = selectedMediaId 
    ? content.find(item => item.id === selectedMediaId) 
    : null;

  const handleMediaClick = (media: MediaContent) => {
    setSelectedMediaId(media.id);
  };

  const handleBackToContent = () => {
    setSelectedMediaId(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'audio':
        return Music;
      case 'image':
        return ImageIcon;
      default:
        return Play;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-600/80';
      case 'audio':
        return 'bg-gray-700/80 border border-red-600/30';
      case 'image':
        return 'bg-gray-700/80';
      default:
        return 'bg-gray-700/80';
    }
  };

  // If a media item is selected, show the player view
  if (selectedMedia) {
    return (
      <div className="space-y-6 pb-24 md:pb-6">
        {/* Back Button */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToContent}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Content</span>
          </Button>
        </div>

        {/* Media Player */}
        <Card className="overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center relative">
            <img 
              src={selectedMedia.thumbnail} 
              alt={selectedMedia.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600/80 backdrop-blur-sm rounded flex items-center justify-center">
                <Play className="text-white ml-1" size={32} />
              </div>
            </div>
            
            {/* Type Badge */}
            <div className="absolute top-4 left-4">
              <div className={`inline-flex items-center justify-center px-3 py-1 rounded text-white text-sm font-semibold font-cinzel ${getTypeColor(selectedMedia.type)}`}>
                {React.createElement(getTypeIcon(selectedMedia.type), { size: 16, className: "mr-1" })}
                {selectedMedia.type.toUpperCase()}
              </div>
            </div>

            {/* New Badge */}
            {selectedMedia.isNew && (
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold font-cinzel">
                  NEW
                </span>
              </div>
            )}
          </div>

          {/* Media Info */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 font-cinzel">
                  {selectedMedia.title}
                </h1>
                <p className="text-gray-300 mb-4 leading-relaxed font-josefin">
                  {selectedMedia.description}
                </p>
                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <span className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{selectedMedia.views.toLocaleString()} views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart size={16} />
                    <span>{selectedMedia.likes.toLocaleString()} likes</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button className="flex items-center space-x-2">
                <Heart size={18} />
                <span>Like</span>
              </Button>
              <Button variant="secondary" className="flex items-center space-x-2">
                <Share size={18} />
                <span>Share</span>
              </Button>
              <Button variant="ghost">
                Add to Favorites
              </Button>
            </div>
          </div>
        </Card>

        {/* Related Content */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 font-cinzel">Related Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content
              .filter(item => item.id !== selectedMedia.id && item.category === selectedMedia.category)
              .slice(0, 4)
              .map((item) => (
                <Card 
                  key={item.id} 
                  className="p-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleMediaClick(item)}
                >
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-red-600/80 backdrop-blur-sm rounded flex items-center justify-center">
                        <Play className="text-white ml-0.5" size={16} />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white font-semibold text-sm font-cinzel">{item.title}</h3>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Default content grid view
  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-cinzel">Content Library</h1>
        <button className="p-2 rounded bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded transition-all duration-200 font-josefin flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <IconComponent size={16} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredContent.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
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
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded text-white text-sm ${getTypeColor(item.type)}`}>
                    <TypeIcon size={16} />
                  </div>
                </div>

                {/* New Badge */}
                {item.isNew && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold font-cinzel">
                      NEW
                    </span>
                  </div>
                )}

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-red-600/80 backdrop-blur-sm rounded flex items-center justify-center">
                    <Play className="text-white ml-1" size={24} />
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold mb-1 font-cinzel">{item.title}</h3>
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
          );
        })}
      </div>
    </div>
  );
};