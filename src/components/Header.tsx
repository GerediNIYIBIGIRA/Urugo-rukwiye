import React from 'react';
import { Users, Heart, Shield } from 'lucide-react';
import Card from './ui/Card';

const Header: React.FC = () => {
  return (
    <div className="mb-12 animate-fade-in-down">
      <Card variant="glass" className="text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-primary-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-4 w-20 h-20 bg-accent-400/10 rounded-full blur-xl" />
        
        <div className="relative z-10">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary-400/30 shadow-glow animate-glow">
                <Users className="w-10 h-10 text-primary-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                <Heart className="w-3 h-3 text-dark-900" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                <Shield className="w-3 h-3 text-dark-900" />
              </div>
            </div>
          </div>
          
          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-400 mb-4 leading-tight">
            <span className="block animate-fade-in-up">Urugo Rukwiye</span>
            <span className="block text-3xl md:text-4xl font-semibold text-primary-300 animate-fade-in-up animate-stagger-1">Platform</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-200 font-medium leading-relaxed max-w-3xl mx-auto animate-fade-in-up animate-stagger-2">
            Connecting Domestic Workers with Employers
          </p>
          
          {/* Tagline */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 animate-fade-in-up animate-stagger-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 rounded-full text-sm font-medium text-primary-300 backdrop-blur-sm border border-primary-400/30">
              <Heart className="w-3 h-3" />
              Trust
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 rounded-full text-sm font-medium text-primary-300 backdrop-blur-sm border border-primary-400/30">
              <Users className="w-3 h-3" />
              Respect
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 rounded-full text-sm font-medium text-primary-300 backdrop-blur-sm border border-primary-400/30">
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