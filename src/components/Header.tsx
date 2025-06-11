import React from 'react';
import { Users, Heart, Shield } from 'lucide-react';
import Card from './ui/Card';

const Header: React.FC = () => {
  return (
    <div className="mb-12 animate-fade-in-down">
      <Card variant="glass" className="text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-4 w-20 h-20 bg-secondary-400/10 rounded-full blur-xl" />
        
        <div className="relative z-10">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-glow animate-glow">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-400 rounded-full flex items-center justify-center animate-bounce-gentle">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="block animate-fade-in-up">Urugo Rukwiye</span>
            <span className="block text-3xl md:text-4xl font-semibold text-white/90 animate-fade-in-up animate-stagger-1">Platform</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto animate-fade-in-up animate-stagger-2">
            Connecting Domestic Workers with Employers
          </p>
          
          {/* Tagline */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 animate-fade-in-up animate-stagger-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/30">
              <Heart className="w-3 h-3" />
              Trust
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/30">
              <Users className="w-3 h-3" />
              Respect
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/30">
              <Shield className="w-3 h-3" />
              Mutual Benefit
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Header;