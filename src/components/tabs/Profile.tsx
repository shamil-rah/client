import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { User, Settings, Heart, ShoppingBag, Bell, LogOut, Star, Download } from 'lucide-react';

export const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'info' | 'collection' | 'settings'>('info');
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    username: 'VibeMaster_99',
    email: 'vibemaster@email.com',
    fanLevel: 7,
    joinDate: 'March 2024',
    totalLikes: 1247,
    totalComments: 89,
    avatar: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  };

  const likedContent = [
    { id: '1', title: 'Midnight Vibes', type: 'Beat', thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg' },
    { id: '2', title: 'Fire Freestyle #12', type: 'Video', thumbnail: 'https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg' },
    { id: '3', title: 'Studio Session Raw', type: 'Video', thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' }
  ];

  const purchasedItems = [
    { id: '1', name: 'Midnight Sessions Hoodie', price: 75, date: '2024-01-15', status: 'Delivered' },
    { id: '2', name: 'Producer Pack Vol. 3', price: 35, date: '2024-01-10', status: 'Downloaded' }
  ];

  const notifications = [
    { id: '1', title: 'New drop available', message: 'Fresh beats just dropped!', time: '2 hours ago', read: false },
    { id: '2', title: 'Comment reply', message: 'Someone replied to your comment', time: '1 day ago', read: true },
    { id: '3', title: 'Merch restock', message: 'Your wishlist item is back in stock', time: '3 days ago', read: true }
  ];

  const getFanLevelName = (level: number) => {
    if (level >= 10) return 'Legend';
    if (level >= 7) return 'Superfan';
    if (level >= 4) return 'Supporter';
    return 'New Fan';
  };

  const getFanLevelColor = (level: number) => {
    if (level >= 10) return 'text-yellow-400';
    if (level >= 7) return 'text-purple-400';
    if (level >= 4) return 'text-blue-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Profile Header */}
      <Card className="text-center md:p-8">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.username}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
          />
          <div className={`absolute top-0 right-1/2 transform translate-x-12 -translate-y-2 bg-gray-900 px-2 py-1 rounded-full border-2 border-gray-700 ${getFanLevelColor(user.fanLevel)}`}>
            <div className="flex items-center space-x-1">
              <Star size={14} />
              <span className="text-xs font-semibold">{user.fanLevel}</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.username}</h1>
        <p className={`font-semibold mb-2 ${getFanLevelColor(user.fanLevel)}`}>
          {getFanLevelName(user.fanLevel)}
        </p>
        <p className="text-gray-400 text-sm mb-4">Member since {user.joinDate}</p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{user.totalLikes}</p>
            <p className="text-gray-400 text-sm">Likes Given</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user.totalComments}</p>
            <p className="text-gray-400 text-sm">Comments</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user.fanLevel}</p>
            <p className="text-gray-400 text-sm">Fan Level</p>
          </div>
        </div>
      </Card>

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'info', label: 'Info', icon: User },
          { id: 'collection', label: 'Collection', icon: Heart },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id as any)}
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeSection === id
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Profile Info Section */}
      {activeSection === 'info' && (
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <Card className="md:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Account Information</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Username"
                value={user.username}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                type="email"
                value={user.email}
                disabled={!isEditing}
              />
              
              {isEditing && (
                <div className="flex space-x-3">
                  <Button size="sm">Save Changes</Button>
                  <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Fan Level Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Level: {getFanLevelName(user.fanLevel)}</span>
                <span className="text-gray-400">Level {user.fanLevel}/10</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(user.fanLevel / 10) * 100}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                Keep engaging to unlock exclusive perks and reach Legend status!
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Collection Section */}
      {activeSection === 'collection' && (
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
          {/* Liked Content */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Heart className="mr-2" size={20} />
              Liked Content ({likedContent.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {likedContent.map((item) => (
                <Card key={item.id} className="flex items-center space-x-3 p-4">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.type}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Purchase History */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Purchase History
            </h3>
            <div className="space-y-3">
              {purchasedItems.map((item) => (
                <Card key={item.id} className="flex items-center justify-between p-4">
                  <div>
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <p className="text-gray-400 text-sm">
                      ${item.price} • {item.date} • {item.status}
                    </p>
                  </div>
                  {item.status === 'Downloaded' && (
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === 'settings' && (
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          {/* Notifications */}
          <Card className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Bell className="mr-2" size={20} />
              Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-lg border ${
                  notif.read ? 'bg-gray-800/50 border-gray-800' : 'bg-blue-500/10 border-blue-500/30'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{notif.title}</h4>
                      <p className="text-gray-400 text-sm">{notif.message}</p>
                      <span className="text-gray-500 text-xs">{notif.time}</span>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Push Notifications</p>
                  <p className="text-gray-400 text-sm">Get notified about new drops and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Updates</p>
                  <p className="text-gray-400 text-sm">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                </label>
              </div>
            </div>
          </Card>

          {/* Support & Account Actions */}
          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Support & Account</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Terms of Service
              </Button>
              <hr className="border-gray-800" />
              <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300">
                <LogOut className="mr-2" size={18} />
                Sign Out
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};