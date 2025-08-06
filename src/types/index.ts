export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  role: 'fan' | 'admin';
  fanLevel: number;
}

export interface MediaContent {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'image';
  thumbnail: string;
  url: string;
  category: string;
  likes: number;
  views: number;
  description?: string;
  isNew?: boolean;
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: 'clothing' | 'accessories' | 'beats' | 'limited';
  sizes?: string[];
  stock: number;
  isNew?: boolean;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isAnnouncement?: boolean;
}

export interface CartItem {
  id: string;
  item: MerchItem;
  quantity: number;
  size?: string;
}