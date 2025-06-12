import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContactData } from '../types';
import { Mail, Phone, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Alert from './ui/Alert';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'feedback', label: 'Feedback' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Thank you for your message! We\'ll get back to you within 2-48 business hours.' });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card variant="glass" className="text-center">
        <h2 className="text-3xl font-bold text-primary-400 mb-6">
          Contact Us
        </h2>
        <p className="text-primary-200 text-lg leading-relaxed">
          We're here to help! Whether you have a question, need assistance, or want to 
          provide feedback, please don't hesitate to get in touch.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card variant="glass" hover className="border-primary-400/30">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary-400" />
            <h3 className="text-lg font-bold text-primary-400">Customer Support</h3>
          </div>
          <div className="space-y-2 text-primary-200">
            <p><strong>Email:</strong> support@urugorukwiyeplatform.com</p>
            <p><strong>Phone:</strong> +250 78X XXX XXX</p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM CAT</span>
            </div>
            <p><strong>Response Time:</strong> Within 2-48 business hours</p>
          </div>
        </Card>

        <Card variant="glass" hover className="border-error-400/30">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-error-400" />
            <h3 className="text-lg font-bold text-error-400">Safety Concerns</h3>
          </div>
          <div className="space-y-2 text-primary-200">
            <p><strong>Email:</strong> safety@urugorukwiyeplatform.com</p>
            <p>Report suspicious activity, inappropriate behavior, or safety concerns immediately.</p>
          </div>
        </Card>
      </div>

      <Card variant="glass">
        <h3 className="text-2xl font-bold text-primary-400 text-center mb-6">
          Send us a Message
        </h3>
        
        {message && (
          <Alert
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Your Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
            
            <Input
              label="Your Email *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          
          <Select
            label="Subject *"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            options={subjectOptions}
          />

          <Textarea
            label="Message *"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            placeholder="Please describe your inquiry in detail..."
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full shadow-glow-lg"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactSection;