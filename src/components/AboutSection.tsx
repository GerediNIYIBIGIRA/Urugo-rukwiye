import React from 'react';
import { CheckCircle, Heart, Shield, Users, Target, Award, Globe, Zap } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All users undergo thorough verification for safety and trust',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      title: 'Smart Matching',
      description: 'Advanced algorithms connect the right people for perfect fits',
      color: 'text-secondary-600'
    },
    {
      icon: Heart,
      title: 'Community Support',
      description: '24/7 support system ensuring smooth experiences for all',
      color: 'text-error-600'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Continuous monitoring and feedback system for excellence',
      color: 'text-success-600'
    }
  ];

  const values = [
    'Transparency in all interactions',
    'Safety and security for all users',
    'Efficiency in matching process',
    'Fair opportunities for workers',
    'Peace of mind for employers',
    'Dignity and respect for all'
  ];

  const stats = [
    { number: '1000+', label: 'Happy Families', icon: Heart },
    { number: '2500+', label: 'Verified Workers', icon: Users },
    { number: '98%', label: 'Success Rate', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Shield }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <Card variant="glass" className="text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-glow animate-glow">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            About Urugo Rukwiye Platform
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
            Our mission is to revolutionize the way domestic employees and employers 
            find each other, fostering a community built on trust, respect, and mutual benefit.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="primary" size="lg">Trusted Platform</Badge>
            <Badge variant="secondary" size="lg">Verified Users</Badge>
            <Badge variant="success" size="lg">24/7 Support</Badge>
          </div>
        </div>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={index} 
              variant="glass" 
              hover 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-white/80 font-medium">
                {stat.label}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Vision and Values */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass" hover className="animate-slide-in-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
          </div>
          <p className="text-white/90 leading-relaxed text-lg">
            We envision a future where every home has the reliable support it needs, 
            and every domestic professional finds fulfilling and dignified employment 
            that respects their skills and contributions.
          </p>
        </Card>
        
        <Card variant="glass" hover className="animate-slide-in-right">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Values</h3>
          </div>
          <ul className="space-y-3">
            {values.map((value, index) => (
              <li 
                key={index} 
                className="flex items-center gap-3 text-white/90 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-6 h-6 bg-success-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success-400" />
                </div>
                <span className="leading-relaxed">{value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 animate-fade-in-up">
          Why Choose Our Platform?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                variant="glass" 
                hover 
                glow
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center ${feature.color} backdrop-blur-sm border border-white/20`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;