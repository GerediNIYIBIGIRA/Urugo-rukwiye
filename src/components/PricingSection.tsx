import React from 'react';
import { CheckCircle, CreditCard, Smartphone } from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
        Service Payments
      </h2>
      <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
        Flexible payment options designed to provide value and security for both employers and employees.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-colors">
          <h3 className="text-xl font-bold text-indigo-600 text-center mb-4">
            For Employers
          </h3>
          <div className="text-3xl font-bold text-indigo-600 text-center mb-4">
            2,000 RWF
          </div>
          <p className="text-center font-semibold mb-6">Membership Fee</p>
          <ul className="space-y-3 mb-6">
            {[
              'One-time registration service',
              'Access to verified domestic worker profiles',
              'Advanced search and filtering',
              'Secure messaging system'
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="text-center bg-white p-4 rounded-lg">
            <strong className="text-indigo-600">Placement Service Fee:</strong><br />
            <span className="text-lg font-semibold">10% of first month's agreed salary</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-colors">
          <h3 className="text-xl font-bold text-indigo-600 text-center mb-4">
            For Domestic Employees
          </h3>
          <div className="text-3xl font-bold text-indigo-600 text-center mb-4">
            1,000 RWF
          </div>
          <p className="text-center font-semibold mb-6">Membership Fee</p>
          <ul className="space-y-3 mb-6">
            {[
              'One-time registration service',
              'Profile verification and showcase',
              'Access to job opportunities',
              'Direct communication with employers'
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="text-center bg-white p-4 rounded-lg">
            <strong className="text-indigo-600">Placement Service Fee:</strong><br />
            <span className="text-lg font-semibold">8% of first month's agreed salary</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Payment Methods
        </h3>
        <div className="flex justify-center gap-6">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 hover:border-orange-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-orange-600" />
              <div>
                <div className="font-bold text-orange-600">MTN MoMo</div>
                <div className="text-sm text-gray-600">Mobile Money</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 hover:border-red-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-red-600" />
              <div>
                <div className="font-bold text-red-600">Airtel Money</div>
                <div className="text-sm text-gray-600">Mobile Money</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-indigo-600">
        <h3 className="text-lg font-bold text-indigo-600 mb-4">Refund Policy</h3>
        <ul className="space-y-2">
          {[
            'Membership fees are non-refundable after 7 days of subscription activation',
            'Placement service fees are non-refundable once an employee has commenced work',
            'Partial refund or credit for new placement may be considered for early termination within 7 days due to severe misconduct'
          ].map((policy, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span>{policy}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingSection;