import React from 'react';
import { TabType } from '../types';
import { Home, UserPlus, CreditCard, Shield, MessageCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About Us', icon: <Home className="w-4 h-4" /> },
    { id: 'register', label: 'Register', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'policies', label: 'Policies', icon: <Shield className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="flex justify-center mb-12 animate-fade-in-up animate-stagger-1">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-large">
        <div className="flex gap-2 flex-wrap justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-4 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 
                flex items-center gap-2 min-w-[120px] justify-center
                ${activeTab === tab.id
                  ? 'bg-white text-primary-700 shadow-medium transform scale-105'
                  : 'text-white/90 hover:bg-white/10 hover:text-white hover:scale-105'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;