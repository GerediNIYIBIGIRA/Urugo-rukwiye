import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContactData } from '../types';
import { Mail, Phone, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
        Contact Us
      </h2>
      <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
        We're here to help! Whether you have a question, need assistance, or want to 
        provide feedback, please don't hesitate to get in touch.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-indigo-600">Customer Support</h3>
          </div>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> support@urugorukwiyeplatform.com</p>
            <p><strong>Phone:</strong> +250 78X XXX XXX</p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM CAT</span>
            </div>
            <p><strong>Response Time:</strong> Within 2-48 business hours</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-red-600">Safety Concerns</h3>
          </div>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> safety@urugorukwiyeplatform.com</p>
            <p>Report suspicious activity, inappropriate behavior, or safety concerns immediately.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Send us a Message
        </h3>
        
        {message && (
          <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="technical">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="safety">Safety Concern</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Please describe your inquiry in detail..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;