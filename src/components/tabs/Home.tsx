import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play, Heart, MessageSquare, Calendar, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const featuredDrop = {
    title: "Blood Moon Rituals",
    type: "New Dark Beat Drop",
    thumbnail: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    description: "Latest dark instrumental featuring haunting synths and crushing 808s"
  };

  const announcements = [
    {
      id: 1,
      title: "Sanctum Tour - Behind the Darkness",
      content: "Take an exclusive look at where the darkness is born. New sanctum tour dropping this Friday!",
      timestamp: "2 hours ago",
      type: "video"
    },
    {
      id: 2,
      title: "Ritual Session Tonight",
      content: "Join the collective live at 8PM EST for an impromptu dark freestyle session. Bring your darkness!",
      timestamp: "4 hours ago",
      type: "live"
    }
  ];

  const behindScenes = [
    "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    "https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg"
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Featured Drop */}
      <Card className="relative overflow-hidden border-red-600/40 md:p-8">
        <div className="absolute top-4 right-4">
          <span className="badge-noir px-3 py-1 rounded text-sm">
            NEW
          </span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src={featuredDrop.thumbnail} 
              alt={featuredDrop.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-3xl font-bold text-white mb-1 font-cinzel">{featuredDrop.title}</h3>
            <p className="text-red-600 text-sm mb-2 font-cinzel">{featuredDrop.type}</p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">{featuredDrop.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <Button variant="primary" className="flex items-center space-x-2">
            <Play size={18} />
            <span>Unleash Now</span>
          </Button>
          <div className="flex items-center space-x-4 text-gray-400">
            <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
              <Heart size={18} />
              <span>1.2k</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
              <MessageSquare size={18} />
              <span>89</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Announcements */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center font-cinzel">
          <Calendar className="mr-2" size={24} />
          ANNOUNCEMENTS
        </h2>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:border-red-500/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-white font-cinzel">{announcement.title}</h3>
                    {announcement.type === 'live' && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold font-cinzel">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{announcement.content}</p>
                  <span className="text-gray-500 text-xs">{announcement.timestamp}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Behind the Scenes */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center font-cinzel">
          <Sparkles className="mr-2" size={24} />
          BEHIND THE SCENES
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
          {behindScenes.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-40 h-40 md:w-full md:h-48 rounded-xl overflow-hidden relative group cursor-pointer">
              <img 
                src={image} 
                alt={`Behind the veil ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-red-600/40 transition-colors duration-300 flex items-center justify-center">
                <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Poll */}
      <Card className="border-red-600/40">
        <h3 className="text-lg font-bold text-white mb-4 font-cinzel">WHAT SHOULD WE CREATE NEXT?</h3>
        <div className="space-y-3">
          {['Dark Beat Pack', 'Ritual Video', 'Gothic Merch', 'Live Séance'].map((option, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded bg-black hover:bg-red-600/10 text-gray-300 hover:text-white transition-all duration-300 border border-transparent hover:border-red-600/30 font-josefin"
            >
              {option}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};