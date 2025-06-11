import React from 'react';
import { Shield, Users, MessageCircle, Calendar, AlertTriangle, Lock } from 'lucide-react';

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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
        Safety Guidelines & Policies
      </h2>
      <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
        Your safety and well-being are our top priorities. We are committed to fostering 
        a respectful and secure environment for all users.
      </p>

      <div className="space-y-6 mb-8">
        {policies.map((policy, index) => {
          const IconComponent = policy.icon;
          return (
            <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-l-4 border-indigo-600">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <IconComponent className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-600 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {policy.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-2">
              ⚠️ Important Notice
            </h3>
            <p className="text-red-700 font-semibold">
              Failure to comply with these guidelines may result in the suspension or 
              termination of your agreement with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesSection;