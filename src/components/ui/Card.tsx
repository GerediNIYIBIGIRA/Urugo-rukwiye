import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated' | 'gradient';
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  glow = false
}) => {
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/95 backdrop-blur-sm shadow-soft border border-white/50',
    glass: 'glass-card',
    elevated: 'bg-white shadow-large border border-neutral-100',
    gradient: 'gradient-primary text-white shadow-medium'
  };
  
  const hoverClasses = hover ? 'card-hover' : '';
  const glowClasses = glow ? 'glow-effect' : '';
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${glowClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;