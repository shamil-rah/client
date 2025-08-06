import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Heart, MessageCircle, Share, UserPlus, Camera, Music, Smile } from 'lucide-react';
import { Post } from '../../types';

export const Community: React.FC = () => {
  const [newPost, setNewPost] = useState('');

  const posts: Post[] = [
    {
      id: '1',
      author: 'SoundWave Artist',
      avatar: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      content: 'Just finished a late night session! The new track is coming together beautifully. Can\'t wait to share it with you all 🎵',
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
    },
    {
      id: '3',
      author: 'BeatLover',
      avatar: 'https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg',
      content: 'Anyone else excited for the merch drop tomorrow? That hoodie design is clean ✨',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      timestamp: new Date(Date.now() - 10800000),
      likes: 156,
      comments: 67
    }
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Handle creating post
      setNewPost('');
    }
  };

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-cinzel">Community Feed</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {/* Create Post */}
        <Card className="md:col-span-2 border-white/20 bg-gradient-to-br from-black to-gray-900/50">
          <div className="border-b border-white/10 pb-4 mb-4">
            <h3 className="text-white font-cinzel font-semibold">Share with the Community</h3>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-400 rounded flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold">U</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share something with the community..."
                className="w-full bg-black border border-white/20 rounded p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 font-josefin"
                rows={3}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-3 text-gray-400">
                  <button className="p-2 rounded hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
                    <Camera size={18} />
                  </button>
                  <button className="p-2 rounded hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
                    <Music size={18} />
                  </button>
                  <button className="p-2 rounded hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
                    <Smile size={18} />
                  </button>
                </div>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  size="sm"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4 md:col-span-2">
          {posts.map((post) => (
            <Card key={post.id} className={`transition-all duration-300 hover:border-white/30 ${post.isAnnouncement ? 'border-red-600/50 bg-gradient-to-br from-red-600/5 to-red-600/10' : 'border-white/10 hover:shadow-xl'}`}>
              <div className="flex items-start space-x-3">
                <img 
                  src={post.avatar} 
                  alt={post.author}
                  className="w-12 h-12 rounded object-cover border-2 border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-white font-cinzel">{post.author}</h3>
                    {post.isAnnouncement && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold font-cinzel">
                        ARTIST
                      </span>
                    )}
                    <span className="text-gray-500 text-sm font-josefin">{formatTimeAgo(post.timestamp)}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed font-josefin">{post.content}</p>
                  
                  {post.image && (
                    <div className="mb-4 rounded overflow-hidden border border-white/10">
                      <img 
                        src={post.image} 
                        alt="Post content"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-gray-400 pt-3 border-t border-white/10">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 px-3 py-1 rounded hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
                        <Heart size={18} />
                        <span className="font-josefin">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 rounded hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
                        <MessageCircle size={18} />
                        <span className="font-josefin">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 rounded hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
                        <Share size={18} />
                        <span className="font-josefin">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Sidebar for desktop */}
        <div className="hidden md:block space-y-4">
          <Card className="border-white/20">
            <h3 className="text-lg font-bold text-white mb-4 font-cinzel border-b border-white/10 pb-2">Active Fans</h3>
            <div className="space-y-4">
              {['VibeMaster_99', 'BeatLover', 'MelodyQueen', 'SoundSeeker'].map((user, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-white/5 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-400 rounded flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-semibold">{user.charAt(0)}</span>
                  </div>
                  <span className="text-gray-300 text-sm font-josefin flex-1">{user}</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-sm" />
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="border-white/20">
            <h3 className="text-lg font-bold text-white mb-4 font-cinzel border-b border-white/10 pb-2">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['#NewDrop', '#LiveSession', '#BehindTheScenes', '#MerchDrop'].map((tag, index) => (
                <span key={index} className="inline-block bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-2 rounded text-sm font-cinzel hover:bg-red-600/30 transition-colors duration-300 cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};