import React from 'react';
import { Shield, Users, MessageCircle, Calendar, AlertTriangle, Lock } from 'lucide-react';
import Card from './ui/Card';

const PoliciesSection: React.FC = () => {
  const policies = [
    {
      icon: Shield,
      title: 'Be Honest and Transparent',
      content: 'All information provided in your profile and during communication must be accurate and truthful. Misrepresentation of skills, experience, identity, or job requirements is strictly prohibited.'
    },
    {
      icon: Users,
      title: 'Respect and Professionalism',
      content: 'We treat all users with courtesy and respect. Harassment, discrimination, hate speech, or any form of abusive behavior will not be tolerated. Our platform strictly prohibits discrimination based on race, gender, religion, national origin, disability, or any other protected characteristic.'
    },
    {
      icon: MessageCircle,
      title: 'Communication Guidelines',
      content: 'Keep all initial communications through the platform\'s messaging system. Do not share personal contact details until you are comfortable and have a confirmed interview or engagement.'
    },
    {
      icon: Calendar,
      title: 'Interviews & Meetings',
      content: 'If you arrange an in-person meeting, consider meeting in a public place for the first interview. Inform a friend or family member of your whereabouts.'
    },
    {
      icon: AlertTriangle,
      title: 'Reporting Concerns',
      content: 'If you encounter any suspicious activity, inappropriate behavior, or have safety concerns, please report them immediately to our support team using the \'Report User\' feature or by emailing safety@urugorukwiyeplatform.com.'
    },
    {
      icon: Lock,
      title: 'Data Protection',
      content: 'Never ask for or share sensitive financial information (mobile account details) outside of our secure payment system.'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card variant="glass" className="text-center">
        <h2 className="text-3xl font-bold text-primary-400 mb-6">
          Safety Guidelines & Policies
        </h2>
        <p className="text-primary-200 text-lg leading-relaxed">
          Your safety and well-being are our top priorities. We are committed to fostering 
          a respectful and secure environment for all users.
        </p>
      </Card>

      <div className="space-y-6 mb-8">
        {policies.map((policy, index) => {
          const IconComponent = policy.icon;
          return (
            <Card 
              key={index} 
              variant="glass" 
              hover 
              className="animate-fade-in-up border-primary-400/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary-500/20 p-3 rounded-full border border-primary-400/30">
                  <IconComponent className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-400 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-primary-200 leading-relaxed">
                    {policy.content}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card variant="glass" className="border-error-400/30">
        <div className="flex items-start gap-4">
          <div className="bg-error-500/20 p-3 rounded-full border border-error-400/30">
            <AlertTriangle className="w-6 h-6 text-error-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-error-400 mb-2">
              ⚠️ Important Notice
            </h3>
            <p className="text-error-300 font-semibold">
              Failure to comply with these guidelines may result in the suspension or 
              termination of your agreement with us.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PoliciesSection;