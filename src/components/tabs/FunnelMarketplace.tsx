import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Clock, Eye, TrendingUp, Filter, Star, Code, Palette, Zap, Users, DollarSign, Timer } from 'lucide-react';
import { FunnelListing } from '../../types';

interface FunnelMarketplaceProps {
  onTabChange: (tab: string) => void;
}

export const FunnelMarketplace: React.FC<FunnelMarketplaceProps> = ({ onTabChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('ending-soon');
  const [selectedFunnel, setSelectedFunnel] = useState<FunnelListing | null>(null);
  const [bidAmount, setBidAmount] = useState('');

  const categories = [
    { id: 'all', label: 'All Funnels' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'lead-gen', label: 'Lead Generation' },
    { id: 'saas', label: 'SaaS' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'agency', label: 'Agency' }
  ];

  const sortOptions = [
    { id: 'ending-soon', label: 'Ending Soon' },
    { id: 'newest', label: 'Newest First' },
    { id: 'price-low', label: 'Lowest Bid' },
    { id: 'price-high', label: 'Highest Bid' },
    { id: 'most-bids', label: 'Most Bids' }
  ];

  const funnelListings: FunnelListing[] = [
    {
      id: '1',
      title: 'High-Converting E-commerce Funnel',
      description: 'Complete sales funnel with product pages, checkout flow, upsells, and email sequences. Proven to convert at 15%+',
      category: 'ecommerce',
      images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'],
      startingBid: 500,
      currentBid: 1250,
      highestBidder: 'BusinessGuru_23',
      bidsCount: 12,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      isActive: true,
      features: ['Mobile Responsive', 'Payment Integration', 'Email Automation', 'Analytics Setup'],
      techStack: ['HTML/CSS', 'JavaScript', 'Stripe API', 'Mailchimp'],
      isNew: true
    },
    {
      id: '2',
      title: 'Lead Generation Landing Page Suite',
      description: 'Professional lead magnet funnel with opt-in forms, thank you pages, and automated follow-up sequences',
      category: 'lead-gen',
      images: ['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'],
      startingBid: 300,
      currentBid: 875,
      highestBidder: 'MarketingPro_99',
      bidsCount: 8,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      isActive: true,
      features: ['A/B Testing Ready', 'CRM Integration', 'Social Proof Elements', 'Mobile Optimized'],
      techStack: ['React', 'Node.js', 'MongoDB', 'SendGrid']
    },
    {
      id: '3',
      title: 'SaaS Onboarding & Trial Funnel',
      description: 'Complete user onboarding experience with trial signup, feature tours, and conversion optimization',
      category: 'saas',
      images: ['https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg'],
      startingBid: 800,
      currentBid: 1500,
      highestBidder: 'TechFounder_42',
      bidsCount: 15,
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
      isActive: true,
      features: ['User Dashboard', 'Progress Tracking', 'In-app Messaging', 'Payment Processing'],
      techStack: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
      isNew: true
    },
    {
      id: '4',
      title: 'Coaching Program Sales Funnel',
      description: 'High-converting coaching funnel with video sales letter, testimonials, and payment plans',
      category: 'coaching',
      images: ['https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'],
      startingBid: 400,
      currentBid: 950,
      highestBidder: 'CoachMaster_77',
      bidsCount: 6,
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      isActive: true,
      features: ['Video Integration', 'Testimonial Carousel', 'Payment Plans', 'Booking System'],
      techStack: ['WordPress', 'PHP', 'Vimeo API', 'PayPal']
    },
    {
      id: '5',
      title: 'Agency Service Showcase Funnel',
      description: 'Professional agency website with service pages, case studies, and client acquisition forms',
      category: 'agency',
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
      startingBid: 600,
      currentBid: 1100,
      highestBidder: 'AgencyOwner_55',
      bidsCount: 9,
      endTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
      isActive: true,
      features: ['Portfolio Gallery', 'Case Studies', 'Contact Forms', 'Team Profiles'],
      techStack: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel']
    },
    {
      id: '6',
      title: 'Webinar Registration & Replay Funnel',
      description: 'Complete webinar funnel with registration, reminder emails, live streaming, and replay access',
      category: 'lead-gen',
      images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'],
      startingBid: 450,
      currentBid: 720,
      highestBidder: 'WebinarKing_88',
      bidsCount: 4,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      isActive: true,
      features: ['Live Streaming', 'Automated Emails', 'Replay Protection', 'Registration Forms'],
      techStack: ['React', 'Express.js', 'WebRTC', 'AWS S3']
    }
  ];

  const filteredFunnels = selectedCategory === 'all' 
    ? funnelListings 
    : funnelListings.filter(funnel => funnel.category === selectedCategory);

  const sortedFunnels = [...filteredFunnels].sort((a, b) => {
    switch (sortBy) {
      case 'ending-soon':
        return a.endTime.getTime() - b.endTime.getTime();
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'price-low':
        return a.currentBid - b.currentBid;
      case 'price-high':
        return b.currentBid - a.currentBid;
      case 'most-bids':
        return b.bidsCount - a.bidsCount;
      default:
        return 0;
    }
  });

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ecommerce':
        return DollarSign;
      case 'lead-gen':
        return Users;
      case 'saas':
        return Code;
      case 'coaching':
        return Star;
      case 'agency':
        return Palette;
      default:
        return Zap;
    }
  };

  const handlePlaceBid = () => {
    if (selectedFunnel && bidAmount && parseFloat(bidAmount) > selectedFunnel.currentBid) {
      // Handle bid placement logic here
      setSelectedFunnel(null);
      setBidAmount('');
      // Show success message
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="text-center py-8 border-b border-white/10">
        <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-4 tracking-wider">
          FUNNEL MARKETPLACE
        </h1>
        <p className="text-gray-300 text-lg font-josefin">
          Bid on premium, ready-to-deploy sales funnels
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 font-josefin">{funnelListings.length}</div>
          <div className="text-gray-400 text-sm font-josefin">Active Auctions</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 font-josefin">
            ${funnelListings.reduce((sum, f) => sum + f.currentBid, 0).toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm font-josefin">Total Bid Value</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 font-josefin">
            {funnelListings.reduce((sum, f) => sum + f.bidsCount, 0)}
          </div>
          <div className="text-gray-400 text-sm font-josefin">Total Bids</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 font-josefin">24h</div>
          <div className="text-gray-400 text-sm font-josefin">Avg. Auction Time</div>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-red-600" />
            <span className="text-white font-cinzel font-semibold">Filter:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-black border border-white/20 text-white p-2 rounded font-josefin focus:border-red-600 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black border border-white/20 text-white p-2 rounded font-josefin focus:border-red-600 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-gray-400 text-sm font-josefin">
          {sortedFunnels.length} funnels available
        </div>
      </div>

      {/* Funnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFunnels.map((funnel) => {
          const CategoryIcon = getCategoryIcon(funnel.category);
          const timeRemaining = formatTimeRemaining(funnel.endTime);
          const isEndingSoon = funnel.endTime.getTime() - Date.now() < 3 * 60 * 60 * 1000; // Less than 3 hours
          
          return (
            <Card key={funnel.id} className="overflow-hidden hover:border-red-600/50 transition-all duration-300">
              <div className="relative">
                <img 
                  src={funnel.images[0]} 
                  alt={funnel.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
                    <CategoryIcon size={14} className="text-red-400" />
                    <span className="text-white text-xs font-cinzel capitalize">{funnel.category}</span>
                  </div>
                  {funnel.isNew && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold font-cinzel">
                      NEW
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded text-xs font-semibold font-cinzel ${
                    isEndingSoon 
                      ? 'bg-red-600/90 text-white animate-pulse' 
                      : 'bg-black/80 backdrop-blur-sm text-gray-300'
                  }`}>
                    <Timer size={12} className="inline mr-1" />
                    {timeRemaining}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 font-cinzel">{funnel.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-josefin">{funnel.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-xs font-josefin">Current Bid</p>
                    <p className="text-2xl font-bold text-red-600 font-josefin">${funnel.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs font-josefin">Bids</p>
                    <p className="text-lg font-semibold text-white font-josefin">{funnel.bidsCount}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {funnel.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-josefin">
                      {feature}
                    </span>
                  ))}
                  {funnel.features.length > 3 && (
                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-josefin">
                      +{funnel.features.length - 3} more
                    </span>
                  )}
                </div>
                
                <Button 
                  onClick={() => setSelectedFunnel(funnel)}
                  className="w-full"
                  disabled={timeRemaining === 'Ended'}
                >
                  {timeRemaining === 'Ended' ? 'Auction Ended' : 'Place Bid'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bid Modal */}
      {selectedFunnel && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-black border border-white/20 rounded overflow-hidden my-8">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white font-cinzel font-semibold text-xl">{selectedFunnel.title}</h3>
              <button 
                onClick={() => {
                  setSelectedFunnel(null);
                  setBidAmount('');
                }}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedFunnel.images[0]} 
                    alt={selectedFunnel.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-cinzel font-semibold mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFunnel.features.map((feature, index) => (
                          <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm font-josefin">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-cinzel font-semibold mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFunnel.techStack.map((tech, index) => (
                          <span key={index} className="bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-1 rounded text-sm font-josefin">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 mb-6 font-josefin leading-relaxed">{selectedFunnel.description}</p>
                  
                  <div className="bg-gray-900/50 p-4 rounded mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-gray-400 text-sm font-josefin">Current Bid</p>
                        <p className="text-2xl font-bold text-red-600 font-josefin">${selectedFunnel.currentBid}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-josefin">Time Remaining</p>
                        <p className="text-xl font-semibold text-white font-josefin">
                          {formatTimeRemaining(selectedFunnel.endTime)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-cinzel font-semibold mb-2">Your Bid Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder={`Minimum: ${selectedFunnel.currentBid + 25}`}
                          min={selectedFunnel.currentBid + 25}
                          className="w-full bg-black border border-white/20 text-white pl-8 pr-4 py-3 rounded font-josefin focus:border-red-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-1 font-josefin">
                        Minimum bid: ${selectedFunnel.currentBid + 25}
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={handlePlaceBid}
                        className="flex-1"
                        disabled={!bidAmount || parseFloat(bidAmount) <= selectedFunnel.currentBid}
                      >
                        Place Bid
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => onTabChange('content')}
                        className="px-8"
                      >
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};