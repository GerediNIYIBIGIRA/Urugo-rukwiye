import React from 'react';
import { CheckCircle, CreditCard, Smartphone } from 'lucide-react';
import Card from './ui/Card';

const PricingSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card variant="glass" className="text-center">
        <h2 className="text-3xl font-bold text-primary-400 mb-6">
          Service Payments
        </h2>
        <p className="text-primary-200 text-lg leading-relaxed mb-8">
          Flexible payment options designed to provide value and security for both employers and employees.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card variant="glass" hover className="border-primary-400/30">
          <h3 className="text-xl font-bold text-primary-400 text-center mb-4">
            For Employers
          </h3>
          <div className="text-3xl font-bold text-primary-400 text-center mb-4">
            2,000 RWF
          </div>
          <p className="text-center font-semibold mb-6 text-primary-300">Membership Fee</p>
          <ul className="space-y-3 mb-6">
            {[
              'One-time registration service',
              'Access to verified domestic worker profiles',
              'Advanced search and filtering',
              'Secure messaging system'
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-primary-200">
                <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="text-center bg-dark-800/50 p-4 rounded-lg border border-primary-400/20">
            <strong className="text-primary-400">Placement Service Fee:</strong><br />
            <span className="text-lg font-semibold text-primary-300">10% of first month's agreed salary</span>
          </div>
        </Card>

        <Card variant="glass" hover className="border-primary-400/30">
          <h3 className="text-xl font-bold text-primary-400 text-center mb-4">
            For Domestic Employees
          </h3>
          <div className="text-3xl font-bold text-primary-400 text-center mb-4">
            1,000 RWF
          </div>
          <p className="text-center font-semibold mb-6 text-primary-300">Membership Fee</p>
          <ul className="space-y-3 mb-6">
            {[
              'One-time registration service',
              'Profile verification and showcase',
              'Access to job opportunities',
              'Direct communication with employers'
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-primary-200">
                <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="text-center bg-dark-800/50 p-4 rounded-lg border border-primary-400/20">
            <strong className="text-primary-400">Placement Service Fee:</strong><br />
            <span className="text-lg font-semibold text-primary-300">8% of first month's agreed salary</span>
          </div>
        </Card>
      </div>

      <Card variant="glass">
        <h3 className="text-2xl font-bold text-primary-400 text-center mb-6">
          Payment Methods
        </h3>
        <div className="flex justify-center gap-6">
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 p-6 rounded-xl border-2 border-orange-400/30 hover:border-orange-400/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-orange-400" />
              <div>
                <div className="font-bold text-orange-400">MTN MoMo</div>
                <div className="text-sm text-primary-300">Mobile Money</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 p-6 rounded-xl border-2 border-red-400/30 hover:border-red-400/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-red-400" />
              <div>
                <div className="font-bold text-red-400">Airtel Money</div>
                <div className="text-sm text-primary-300">Mobile Money</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="border-primary-400/30">
        <h3 className="text-lg font-bold text-primary-400 mb-4">Refund Policy</h3>
        <ul className="space-y-2">
          {[
            'Membership fees are non-refundable after 7 days of subscription activation',
            'Placement service fees are non-refundable once an employee has commenced work',
            'Partial refund or credit for new placement may be considered for early termination within 7 days due to severe misconduct'
          ].map((policy, index) => (
            <li key={index} className="flex items-start gap-2 text-primary-200">
              <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
              <span>{policy}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default PricingSection;