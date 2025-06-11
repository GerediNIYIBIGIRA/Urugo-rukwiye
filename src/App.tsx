import React, { useState } from 'react';
import { TabType } from './types';
import AnimatedBackground from './components/ui/AnimatedBackground';
import Header from './components/Header';
import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import RegistrationSection from './components/RegistrationSection';
import PricingSection from './components/PricingSection';
import PoliciesSection from './components/PoliciesSection';
import ContactSection from './components/ContactSection';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'register':
        return <RegistrationSection />;
      case 'pricing':
        return <PricingSection />;
      case 'policies':
        return <PoliciesSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header />
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="animate-fade-in-up">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;