import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800" />
      
      {/* Animated floating shapes */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-accent-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-primary-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Medium floating shapes */}
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-accent-500/6 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-primary-500/5 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Small accent dots */}
        <div className="absolute top-1/5 right-1/5 w-4 h-4 bg-primary-400/30 rounded-full animate-bounce-gentle" />
        <div className="absolute bottom-1/3 right-2/3 w-3 h-3 bg-accent-400/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-primary-300/50 rounded-full animate-bounce-gentle" style={{ animationDelay: '3s' }} />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-dark-900/20" />
    </div>
  );
};

export default AnimatedBackground;