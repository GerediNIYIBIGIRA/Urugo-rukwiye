import React, { useState } from 'react';
import { RegistrationType } from '../types';
import { Users, Briefcase } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import EmployerRegistration from './EmployerRegistration';
import EmployeeRegistration from './EmployeeRegistration';

const RegistrationSection: React.FC = () => {
  const [registrationType, setRegistrationType] = useState<RegistrationType>('employer');

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <Card variant="glass" className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
          Choose your registration type and become part of Rwanda's most trusted 
          domestic worker and employer matching platform.
        </p>
      </Card>
      
      {/* Registration Type Selector */}
      <div className="flex justify-center">
        <Card variant="glass" className="p-2">
          <div className="flex gap-2">
            <Button
              variant={registrationType === 'employer' ? 'primary' : 'ghost'}
              size="lg"
              onClick={() => setRegistrationType('employer')}
              icon={<Briefcase className="w-5 h-5" />}
              className={`min-w-[200px] ${registrationType === 'employer' ? 'shadow-glow' : 'text-white hover:bg-white/10'}`}
            >
              Register as Employer
            </Button>
            <Button
              variant={registrationType === 'employee' ? 'primary' : 'ghost'}
              size="lg"
              onClick={() => setRegistrationType('employee')}
              icon={<Users className="w-5 h-5" />}
              className={`min-w-[200px] ${registrationType === 'employee' ? 'shadow-glow' : 'text-white hover:bg-white/10'}`}
            >
              Register as Employee
            </Button>
          </div>
        </Card>
      </div>

      {/* Registration Form */}
      <Card variant="glass" className="animate-fade-in-up">
        {registrationType === 'employer' ? <EmployerRegistration /> : <EmployeeRegistration />}
      </Card>
    </div>
  );
};

export default RegistrationSection;