import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Heart, MessageCircle, Share, UserPlus } from 'lucide-react';
import { Post } from '../../types';

export const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'chat'>('feed');
  const [newMessage, setNewMessage] = useState('');
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

  const chatMessages = [
    { id: '1', user: 'VibeMaster_99', message: 'New beat is absolutely fire! 🔥', timestamp: '2:34 PM' },
    { id: '2', user: 'BeatLover', message: 'When\'s the next live session?', timestamp: '2:35 PM' },
    { id: '3', user: 'SoundWave Artist', message: 'Tomorrow at 8PM EST! Don\'t miss it', timestamp: '2:36 PM' },
    { id: '4', user: 'MelodyQueen', message: 'Can\'t wait! See you there', timestamp: '2:37 PM' }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

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
        <h1 className="text-2xl md:text-3xl font-bold text-white">Community</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'feed'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'chat'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Live Chat
        </button>
      </div>

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
          {/* Create Post */}
          <Card className="md:col-span-2">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share something with the community..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-3 text-gray-400">
                    <button className="hover:text-blue-400 transition-colors">📷</button>
                    <button className="hover:text-blue-400 transition-colors">🎵</button>
                    <button className="hover:text-blue-400 transition-colors">😊</button>
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
              <Card key={post.id} className={post.isAnnouncement ? 'border-blue-500/50 bg-blue-500/5' : ''}>
                <div className="flex items-start space-x-3">
                  <img 
                    src={post.avatar} 
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">{post.author}</h3>
                      {post.isAnnouncement && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ARTIST
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-3 leading-relaxed">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post content"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-gray-400">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                          <Heart size={18} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                          <MessageCircle size={18} />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                          <Share size={18} />
                          <span>Share</span>
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
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Active Fans</h3>
              <div className="space-y-3">
                {['VibeMaster_99', 'BeatLover', 'MelodyQueen', 'SoundSeeker'].map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{user.charAt(0)}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{user}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" />
                  </div>
                ))}
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {['#NewDrop', '#LiveSession', '#BehindTheScenes', '#MerchDrop'].map((tag, index) => (
                  <span key={index} className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="space-y-4 md:grid md:grid-cols-4 md:gap-8 md:space-y-0">
          {/* Chat Messages */}
          <Card className="h-96 overflow-y-auto md:col-span-3 md:h-[500px]">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {msg.user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-white text-sm">{msg.user}</span>
                      <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Message Input */}
          <div className="flex items-center space-x-3 md:col-span-3">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4"
            >
              <Send size={18} />
            </Button>
          </div>

          {/* Chat Rules */}
          <Card className="bg-yellow-500/10 border-yellow-500/30 md:col-span-1 md:row-span-2">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-500 text-lg">⚠️</span>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Community Guidelines</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Be respectful to all community members</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Keep discussions music-related</li>
                  <li>• Report inappropriate content</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};