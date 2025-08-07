import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play, Pause, Heart, Eye, Filter, ArrowLeft, Share, Headphones, Video, Image as ImageIcon, Flame, Music, Film, Mic, Palette, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { MediaContent } from '../../types';

export const Content: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string>('');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Array of sample audio URLs for random playback
  const audioUrls = [
    '/DJ Khaled ft. Drake - GREECE (Official Visualizer).mp3'
  ];

  // Select random audio URL
  const selectRandomAudio = () => {
    const randomIndex = Math.floor(Math.random() * audioUrls.length);
    return audioUrls[randomIndex];
  };

  // Format time in mm:ss format
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause toggle
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume bar click
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Load new random audio
  const loadRandomAudio = () => {
    const newAudioUrl = selectRandomAudio();
    setCurrentAudioUrl(newAudioUrl);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  };

  // Initialize audio when media is selected
  useEffect(() => {
    const selectedMedia = selectedMediaId 
      ? content.find(item => item.id === selectedMediaId) 
      : null;
    
    if (selectedMedia && selectedMedia.type === 'audio') {
      loadRandomAudio();
    }
  }, [selectedMediaId]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      loadRandomAudio(); // Load next random song
    };
    const handleVolumeChange = () => setVolume(audio.volume);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [currentAudioUrl]);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

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
    // Directly show player with immediate playback readiness
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
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-gradient-to-br from-red-900/20 via-black to-black">
            {selectedMedia.type === 'video' ? (
              // Video Player
              <div className="aspect-video bg-black relative">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  poster={selectedMedia.thumbnail}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded bg-red-600/80 text-white text-sm font-semibold font-cinzel">
                    <Video size={16} className="mr-1" />
                    VIDEO
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
            ) : selectedMedia.type === 'audio' ? (
              // Audio Player with Rotating Vinyl
              <div className="bg-gradient-to-br from-red-900/10 to-black p-8">
                <div className="flex flex-col items-center space-y-6">
                  {/* Rotating Vinyl Record */}
                  <div className="relative">
                    <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-800 border-4 border-gray-700 relative overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
                      {/* Vinyl grooves */}
                      <div className="absolute inset-4 rounded-full border border-gray-600 opacity-30"></div>
                      <div className="absolute inset-8 rounded-full border border-gray-600 opacity-20"></div>
                      <div className="absolute inset-12 rounded-full border border-gray-600 opacity-15"></div>
                      <div className="absolute inset-16 rounded-full border border-gray-600 opacity-10"></div>
                      
                      {/* Center label */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      
                      {/* Album art in center */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-2 border-red-600">
                        <img 
                          src={selectedMedia.thumbnail} 
                          alt={selectedMedia.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Needle/Tonearm */}
                    <div className="absolute -top-2 right-8 w-32 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transform rotate-12 origin-right">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Audio Element (hidden) */}
                  <audio
                    ref={audioRef}
                    src={currentAudioUrl}
                    className="hidden"
                    preload="metadata"
                  >
                    Your browser does not support the audio element.
                  </audio>

                  {/* Player Controls */}
                  <div className="w-full max-w-md space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white font-cinzel mb-1">{selectedMedia.title}</h3>
                      <p className="text-red-400 font-josefin">Cashless Society</p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3 text-sm text-gray-400 font-josefin">
                      <span>{formatTime(currentTime)}</span>
                      <div 
                        className="flex-1 bg-gray-800 rounded-full h-1 relative cursor-pointer"
                        onClick={handleProgressClick}
                      >
                        <div 
                          className="bg-red-600 h-1 rounded-full relative transition-all duration-100"
                          style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-center space-x-6">
                      <button 
                        onClick={loadRandomAudio}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <SkipBack size={20} />
                      </button>
                      <button 
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime = Math.max(0, currentTime - 10);
                          }
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={togglePlayPause}
                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause size={24} fill="white" />
                        ) : (
                          <Play size={24} fill="white" className="ml-1" />
                        )}
                      </button>
                      <button 
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                          }
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 6v12l8.5-6L13 6zM4 18l8.5-6L4 6v12z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={loadRandomAudio}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <SkipForward size={20} />
                      </button>
                    </div>
                    
                    {/* Volume Control */}
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => {
                          const newVolume = volume > 0 ? 0 : 0.7;
                          if (audioRef.current) {
                            audioRef.current.volume = newVolume;
                          }
                          setVolume(newVolume);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
                      </button>
                      <div 
                        className="flex-1 bg-gray-800 rounded-full h-1 relative cursor-pointer"
                        onClick={handleVolumeClick}
                      >
                        <div 
                          className="bg-red-600 h-1 rounded-full relative transition-all duration-100"
                          style={{ width: `${volume * 100}%` }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded bg-gray-700/80 border border-red-600/30 text-white text-sm font-semibold font-cinzel">
                    <Music size={16} className="mr-1" />
                    AUDIO
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
            ) : (
              // Image Display
              <div className="aspect-video bg-black flex items-center justify-center relative w-full">
                <img 
                  src={selectedMedia.thumbnail} 
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded bg-gray-700/80 text-white text-sm font-semibold font-cinzel">
                    <ImageIcon size={16} className="mr-1" />
                    IMAGE
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
            )}

            {/* Media Info */}
            <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 font-cinzel break-words">
                  {selectedMedia.title}
                </h1>
                <p className="text-gray-300 mb-4 leading-relaxed font-josefin text-sm sm:text-base">
                  {selectedMedia.description}
                </p>
                <div className="flex items-center space-x-4 sm:space-x-6 text-gray-400 text-sm">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button className="flex items-center justify-center space-x-2">
                <Heart size={18} />
                <span>Like</span>
              </Button>
              <Button variant="secondary" className="flex items-center justify-center space-x-2">
                <Share size={18} />
                <span>Share</span>
              </Button>
              <Button variant="ghost" className="justify-center">
                Add to Favorites
              </Button>
            </div>
            </div>
          </Card>
        </div>

        {/* Related Content */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 font-cinzel px-2 sm:px-0">Related Content</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 px-2 sm:px-0">
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
                      className="w-full h-20 sm:h-24 md:h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="text-white ml-0.5" size={12} />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2">
                      <h3 className="text-white font-semibold text-xs sm:text-sm font-cinzel truncate">{item.title}</h3>
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
      <div className="flex items-center justify-between px-2 sm:px-0">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-white font-cinzel truncate">Content Library</h1>
        <button className="p-1.5 sm:p-2 rounded bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex-shrink-0 ml-2">
          <Filter size={20} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 sm:space-x-2 md:space-x-3 overflow-x-auto pb-2 scrollbar-hide px-2 sm:px-0 -mx-2 sm:mx-0">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 rounded transition-all duration-200 font-josefin flex items-center space-x-1 md:space-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <IconComponent size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-0">
        {filteredContent.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <Card 
              key={item.id} 
              className="p-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300 w-full"
              onClick={() => handleMediaClick(item)}
            >
              <div className="relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-24 xs:h-28 sm:h-32 md:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Type Icon */}
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 md:top-3 md:left-3">
                  <div className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded text-white text-xs md:text-sm ${getTypeColor(item.type)}`}>
                    <TypeIcon size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  </div>
                </div>

                {/* New Badge */}
                {item.isNew && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-3 md:right-3">
                    <span className="bg-red-600 text-white px-1 py-0.5 sm:px-1.5 md:px-2 md:py-1 rounded text-xs font-semibold font-cinzel">
                      NEW
                    </span>
                  </div>
                )}

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="text-white ml-0.5 md:ml-1" size={12} />
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2 md:bottom-3 md:left-3 md:right-3">
                  <h3 className="text-white font-semibold mb-0.5 sm:mb-1 font-cinzel text-xs sm:text-sm lg:text-base truncate leading-tight">{item.title}</h3>
                  <div className="flex items-center justify-between text-gray-300 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye size={10} className="sm:w-3 sm:h-3" />
                        <span className="hidden xs:inline text-xs">{(item.views / 1000).toFixed(1)}k</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart size={10} className="sm:w-3 sm:h-3" />
                        <span className="hidden xs:inline text-xs">{(item.likes / 1000).toFixed(1)}k</span>
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