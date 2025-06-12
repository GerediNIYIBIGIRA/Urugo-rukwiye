


import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { EmployerData } from '../types';
import { User, Mail, Phone, MapPin, Calendar, Clock, FileText, Briefcase } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Alert from './ui/Alert';
import Badge from './ui/Badge';

const EmployerRegistration: React.FC = () => {
  const [formData, setFormData] = useState<EmployerData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    services: [],
    startDate: '',
    workingHours: '',
    requirements: '',
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const serviceOptions = [
    { value: 'nanny', label: 'Nanny' },
    { value: 'cleaner', label: 'Cleaner' },
    { value: 'chef', label: 'Chef' },
    { value: 'gardener', label: 'Gardener' },
  ];

  const workingHoursOptions = [
    { value: '', label: 'Select option' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'live-in', label: 'Live-in' },
    { value: 'live-out', label: 'Live-out' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'terms') {
        setFormData(prev => ({ ...prev, terms: checked }));
      } else if (name === 'services') {
        setFormData(prev => ({
          ...prev,
          services: checked 
            ? [...prev.services, value]
            : prev.services.filter(s => s !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const sendWelcomeEmail = async (email: string, name: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          name: name,
          type: 'employer'
        }),
      });

      if (!response.ok) {
        console.error('Failed to send welcome email');
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('employers')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          services: formData.services,
          start_date: formData.startDate || null,
          working_hours: formData.workingHours || null,
          requirements: formData.requirements || null,
        }]);

      if (error) throw error;

      // Send welcome email
      await sendWelcomeEmail(formData.email, formData.fullName);

      setMessage({ type: 'success', text: 'Registration successful! A welcome email has been sent to your email address. We will contact you soon to complete the verification process.' });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        services: [],
        startDate: '',
        workingHours: '',
        requirements: '',
        terms: false,
      });
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'Registration failed. Please try again or contact support if the problem persists.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center shadow-glow border border-primary-400/30">
            <User className="w-8 h-8 text-primary-400" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary-400 mb-2">
          Employer Registration
        </h3>
        <p className="text-primary-300 leading-relaxed">
          Find the perfect domestic worker for your household needs
        </p>
      </div>
      
      {message && (
        <Alert
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary-400 flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              icon={<User className="w-4 h-4" />}
              placeholder="Enter your full name"
            />
            
            <Input
              label="Email Address *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              icon={<Mail className="w-4 h-4" />}
              placeholder="your.email@example.com"
            />
            
            <Input
              label="Phone Number *"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              icon={<Phone className="w-4 h-4" />}
              placeholder="+250 7XX XXX XXX"
            />
            
            <Input
              label="Location *"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              icon={<MapPin className="w-4 h-4" />}
              placeholder="City, District"
            />
          </div>
        </div>

        {/* Service Requirements */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary-400 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Service Requirements
          </h4>
          
          <div>
            <label className="block text-sm font-semibold text-primary-300 mb-3">
              Type of Service Needed *
            </label>
            <div className="flex flex-wrap gap-3">
              {serviceOptions.map(service => (
                <label 
                  key={service.value} 
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={service.value}
                    checked={formData.services.includes(service.value)}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Badge
                    variant={formData.services.includes(service.value) ? 'primary' : 'secondary'}
                    size="lg"
                    className={`transition-all duration-200 cursor-pointer ${
                      formData.services.includes(service.value) 
                        ? 'ring-2 ring-primary-400/50 shadow-glow' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {service.label}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Desired Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              icon={<Calendar className="w-4 h-4" />}
            />
            
            <Select
              label="Preferred Working Hours"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleInputChange}
              options={workingHoursOptions}
            />
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary-400 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Additional Information
          </h4>
          
          <Textarea
            label="Specific Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            rows={4}
            placeholder="Please describe any specific requirements, preferences, or additional information about the role..."
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 p-4 bg-dark-800/30 rounded-xl border border-primary-400/20">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-primary-600 bg-dark-700 border-primary-400 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label className="text-sm text-primary-300 leading-relaxed">
            I agree to the <span className="text-primary-400 font-medium">Terms and Conditions</span> and{' '}
            <span className="text-primary-400 font-medium">Privacy Policy</span>. I understand that a membership fee applies and confirm that all information provided is accurate. *
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full shadow-glow-lg"
        >
          {isSubmitting ? 'Processing Registration...' : 'Register as Employer'}
        </Button>
      </form>
    </div>
  );
};

export default EmployerRegistration;