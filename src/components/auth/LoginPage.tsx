import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Music, Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-4">
            <img 
              src="/CASHLESS_SOCIETY.png" 
              alt="Cashless Society Logo" 
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-cinzel">
            {isLogin ? 'WELCOME BACK' : 'JOIN THE SOCIETY'}
          </h1>
          <p className="text-gray-300 font-josefin">
            {isLogin ? 'Enter the darkness' : 'Become one with the collective'}
          </p>
        </div>

        <div className="noir-card rounded p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <Input
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose your alias"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Entering...' : (isLogin ? 'Enter' : 'Join Society')}
            </Button>
          </form>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400 font-josefin">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="secondary" className="w-full">
              <Mail className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button variant="secondary" className="w-full">
              <Music className="w-5 h-5 mr-2" />
              Apple
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-600 hover:text-red-500 transition-colors font-josefin"
          >
            {isLogin ? "Don't have an account? Join us" : "Already a member? Enter"}
          </button>
        </div>
      </div>
    </div>
  );
};