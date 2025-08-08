import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Clock, TrendingUp, Award, Eye, Download, AlertCircle, CheckCircle, Timer } from 'lucide-react';
import { FunnelListing, Bid } from '../../types';

export const FunnelBids: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'active' | 'won' | 'lost'>('active');

  // Mock data for user's bids
  const userBids: Bid[] = [
    {
      id: '1',
      funnelId: '1',
      bidder: 'You',
      amount: 1250,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isWinning: true
    },
    {
      id: '2',
      funnelId: '3',
      bidder: 'You',
      amount: 1400,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isWinning: false
    },
    {
      id: '3',
      funnelId: '2',
      bidder: 'You',
      amount: 800,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isWinning: true
    }
  ];

  // Mock funnel data (in real app, this would come from API)
  const funnelData: { [key: string]: FunnelListing } = {
    '1': {
      id: '1',
      title: 'High-Converting E-commerce Funnel',
      description: 'Complete sales funnel with product pages, checkout flow, upsells, and email sequences.',
      category: 'ecommerce',
      images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'],
      startingBid: 500,
      currentBid: 1250,
      highestBidder: 'You',
      bidsCount: 12,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      isActive: true,
      features: ['Mobile Responsive', 'Payment Integration', 'Email Automation'],
      techStack: ['HTML/CSS', 'JavaScript', 'Stripe API']
    },
    '2': {
      id: '2',
      title: 'Lead Generation Landing Page Suite',
      description: 'Professional lead magnet funnel with opt-in forms and automated follow-up sequences.',
      category: 'lead-gen',
      images: ['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'],
      startingBid: 300,
      currentBid: 875,
      highestBidder: 'You',
      bidsCount: 8,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      isActive: true,
      features: ['A/B Testing Ready', 'CRM Integration', 'Social Proof Elements'],
      techStack: ['React', 'Node.js', 'MongoDB']
    },
    '3': {
      id: '3',
      title: 'SaaS Onboarding & Trial Funnel',
      description: 'Complete user onboarding experience with trial signup and feature tours.',
      category: 'saas',
      images: ['https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg'],
      startingBid: 800,
      currentBid: 1500,
      highestBidder: 'TechFounder_42',
      bidsCount: 15,
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
      isActive: true,
      features: ['User Dashboard', 'Progress Tracking', 'In-app Messaging'],
      techStack: ['Vue.js', 'Laravel', 'MySQL']
    }
  };

  // Mock won auctions
  const wonAuctions = [
    {
      id: '4',
      title: 'Coaching Program Sales Funnel',
      finalBid: 950,
      wonDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      downloaded: true,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
    },
    {
      id: '5',
      title: 'Agency Service Showcase Funnel',
      finalBid: 1100,
      wonDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      downloaded: false,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
    }
  ];

  // Mock lost auctions
  const lostAuctions = [
    {
      id: '6',
      title: 'Webinar Registration & Replay Funnel',
      yourBid: 650,
      winningBid: 720,
      lostDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
    }
  ];

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const activeBids = userBids.filter(bid => funnelData[bid.funnelId]?.isActive);

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-cinzel">My Bids & Auctions</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 font-josefin">{activeBids.length}</div>
          <div className="text-gray-400 text-sm font-josefin">Active Bids</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600 font-josefin">{wonAuctions.length}</div>
          <div className="text-gray-400 text-sm font-josefin">Won Auctions</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-600 font-josefin">
            {activeBids.filter(bid => bid.isWinning).length}
          </div>
          <div className="text-gray-400 text-sm font-josefin">Leading</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 font-josefin">
            ${activeBids.reduce((sum, bid) => sum + bid.amount, 0).toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm font-josefin">Total Bid Value</div>
        </Card>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'active', label: 'Active Bids', count: activeBids.length },
          { id: 'won', label: 'Won Auctions', count: wonAuctions.length },
          { id: 'lost', label: 'Lost Auctions', count: lostAuctions.length }
        ].map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id as any)}
            className={`flex-1 py-3 px-4 rounded transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeSection === id
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="font-josefin">{label}</span>
            <span className="bg-black/30 px-2 py-1 rounded text-xs">{count}</span>
          </button>
        ))}
      </div>

      {/* Active Bids */}
      {activeSection === 'active' && (
        <div className="space-y-4">
          {activeBids.length === 0 ? (
            <Card className="text-center py-12">
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-cinzel">No Active Bids</h3>
              <p className="text-gray-400 font-josefin">You haven't placed any bids yet. Browse the marketplace to get started!</p>
            </Card>
          ) : (
            activeBids.map((bid) => {
              const funnel = funnelData[bid.funnelId];
              if (!funnel) return null;
              
              const timeRemaining = formatTimeRemaining(funnel.endTime);
              const isEndingSoon = funnel.endTime.getTime() - Date.now() < 3 * 60 * 60 * 1000;
              
              return (
                <Card key={bid.id} className={`${bid.isWinning ? 'border-green-600/50 bg-green-600/5' : 'border-yellow-600/50 bg-yellow-600/5'}`}>
                  <div className="flex items-start space-x-4">
                    <img 
                      src={funnel.images[0]} 
                      alt={funnel.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white font-cinzel">{funnel.title}</h3>
                          <p className="text-gray-300 text-sm font-josefin">{funnel.description}</p>
                        </div>
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded ${
                          bid.isWinning 
                            ? 'bg-green-600/20 border border-green-600/30 text-green-400' 
                            : 'bg-yellow-600/20 border border-yellow-600/30 text-yellow-400'
                        }`}>
                          {bid.isWinning ? <Award size={16} /> : <TrendingUp size={16} />}
                          <span className="text-sm font-semibold font-cinzel">
                            {bid.isWinning ? 'WINNING' : 'OUTBID'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 font-josefin">Your Bid</p>
                          <p className="text-white font-semibold font-josefin">${bid.amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-josefin">Current High</p>
                          <p className="text-white font-semibold font-josefin">${funnel.currentBid}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-josefin">Total Bids</p>
                          <p className="text-white font-semibold font-josefin">{funnel.bidsCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-josefin">Time Left</p>
                          <p className={`font-semibold font-josefin ${isEndingSoon ? 'text-red-400' : 'text-white'}`}>
                            {timeRemaining}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary">
                            Increase Bid
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </div>
                        {isEndingSoon && (
                          <div className="flex items-center space-x-1 text-red-400 text-sm">
                            <AlertCircle size={16} />
                            <span className="font-josefin">Ending Soon!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Won Auctions */}
      {activeSection === 'won' && (
        <div className="space-y-4">
          {wonAuctions.length === 0 ? (
            <Card className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-cinzel">No Won Auctions</h3>
              <p className="text-gray-400 font-josefin">You haven't won any auctions yet. Keep bidding to win your first funnel!</p>
            </Card>
          ) : (
            wonAuctions.map((auction) => (
              <Card key={auction.id} className="border-green-600/50 bg-green-600/5">
                <div className="flex items-start space-x-4">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white font-cinzel">{auction.title}</h3>
                        <p className="text-gray-300 text-sm font-josefin">Won on {formatDate(auction.wonDate)}</p>
                      </div>
                      <div className="flex items-center space-x-1 px-3 py-1 rounded bg-green-600/20 border border-green-600/30 text-green-400">
                        <CheckCircle size={16} />
                        <span className="text-sm font-semibold font-cinzel">WON</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-400 font-josefin">Winning Bid</p>
                        <p className="text-white font-semibold font-josefin">${auction.finalBid}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-josefin">Status</p>
                        <p className={`font-semibold font-josefin ${auction.downloaded ? 'text-green-400' : 'text-yellow-400'}`}>
                          {auction.downloaded ? 'Downloaded' : 'Ready to Download'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-josefin">Won Date</p>
                        <p className="text-white font-semibold font-josefin">{formatDate(auction.wonDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex items-center space-x-1">
                        <Download size={16} />
                        <span>{auction.downloaded ? 'Download Again' : 'Download Files'}</span>
                      </Button>
                      <Button size="sm" variant="secondary">
                        View Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Lost Auctions */}
      {activeSection === 'lost' && (
        <div className="space-y-4">
          {lostAuctions.length === 0 ? (
            <Card className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-cinzel">No Lost Auctions</h3>
              <p className="text-gray-400 font-josefin">You haven't lost any auctions yet. Keep your winning streak going!</p>
            </Card>
          ) : (
            lostAuctions.map((auction) => (
              <Card key={auction.id} className="border-red-600/30 bg-red-600/5">
                <div className="flex items-start space-x-4">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-20 h-20 object-cover rounded opacity-75"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white font-cinzel">{auction.title}</h3>
                        <p className="text-gray-300 text-sm font-josefin">Lost on {formatDate(auction.lostDate)}</p>
                      </div>
                      <div className="flex items-center space-x-1 px-3 py-1 rounded bg-red-600/20 border border-red-600/30 text-red-400">
                        <AlertCircle size={16} />
                        <span className="text-sm font-semibold font-cinzel">LOST</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-400 font-josefin">Your Bid</p>
                        <p className="text-white font-semibold font-josefin">${auction.yourBid}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-josefin">Winning Bid</p>
                        <p className="text-red-400 font-semibold font-josefin">${auction.winningBid}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-josefin">Difference</p>
                        <p className="text-gray-400 font-semibold font-josefin">+${auction.winningBid - auction.yourBid}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        Find Similar
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};