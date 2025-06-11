// import React, { useState } from 'react';
// import { supabase } from '../lib/supabase';
// import { EmployeeData } from '../types';
// import { User, Mail, Phone, Calendar, MapPin, Briefcase, Award, Users, Clock, FileText } from 'lucide-react';
// import Button from './ui/Button';
// import Input from './ui/Input';
// import Select from './ui/Select';
// import Textarea from './ui/Textarea';
// import Alert from './ui/Alert';
// import Badge from './ui/Badge';

// const EmployeeRegistration: React.FC = () => {
//   const [formData, setFormData] = useState<EmployeeData>({
//     fullName: '',
//     email: '',
//     phone: '',
//     dateOfBirth: '',
//     gender: '',
//     nationality: '',
//     nationalId: '',
//     address: '',
//     serviceTypes: [],
//     experience: '',
//     salaryRange: '',
//     skills: [],
//     ref1Name: '',
//     ref1Phone: '',
//     ref2Name: '',
//     ref2Phone: '',
//     preferredHours: '',
//     workAreas: '',
//     terms: false,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

//   const serviceTypes = [
//     { value: 'nanny', label: 'Nanny' },
//     { value: 'cleaner', label: 'Cleaner' },
//     { value: 'cook', label: 'Cook' },
//     { value: 'gardener', label: 'Gardener' },
//   ];

//   const skillOptions = [
//     { value: 'childcare', label: 'Childcare' },
//     { value: 'deep-cleaning', label: 'Deep Cleaning' },
//     { value: 'meal-prep', label: 'Meal Prep' },
//     { value: 'laundry', label: 'Laundry' },
//     { value: 'pet-care', label: 'Pet Care' },
//     { value: 'elderly-care', label: 'Elderly Care' },
//   ];

//   const genderOptions = [
//     { value: '', label: 'Select gender' },
//     { value: 'male', label: 'Male' },
//     { value: 'female', label: 'Female' },
//     { value: 'other', label: 'Other' },
//   ];

//   const experienceOptions = [
//     { value: '', label: 'Select experience' },
//     { value: '0-1', label: '0-1 years' },
//     { value: '2-3', label: '2-3 years' },
//     { value: '4-5', label: '4-5 years' },
//     { value: '6-10', label: '6-10 years' },
//     { value: '10+', label: '10+ years' },
//   ];

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
    
//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       if (name === 'terms') {
//         setFormData(prev => ({ ...prev, terms: checked }));
//       } else if (name === 'serviceTypes') {
//         setFormData(prev => ({
//           ...prev,
//           serviceTypes: checked 
//             ? [...prev.serviceTypes, value]
//             : prev.serviceTypes.filter(s => s !== value)
//         }));
//       } else if (name === 'skills') {
//         setFormData(prev => ({
//           ...prev,
//           skills: checked 
//             ? [...prev.skills, value]
//             : prev.skills.filter(s => s !== value)
//         }));
//       }
//     } else if (type === 'radio') {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage(null);

//     try {
//       const { error } = await supabase
//         .from('employees')
//         .insert([{
//           full_name: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           date_of_birth: formData.dateOfBirth,
//           gender: formData.gender || null,
//           nationality: formData.nationality || null,
//           national_id: formData.nationalId || null,
//           address: formData.address || null,
//           service_types: formData.serviceTypes,
//           experience: formData.experience || null,
//           salary_range: formData.salaryRange || null,
//           skills: formData.skills,
//           ref1_name: formData.ref1Name || null,
//           ref1_phone: formData.ref1Phone || null,
//           ref2_name: formData.ref2Name || null,
//           ref2_phone: formData.ref2Phone || null,
//           preferred_hours: formData.preferredHours || null,
//           work_areas: formData.workAreas || null,
//         }]);

//       if (error) throw error;

//       setMessage({ type: 'success', text: 'Registration successful! We will contact you soon to complete the verification process and discuss opportunities.' });
//       setFormData({
//         fullName: '',
//         email: '',
//         phone: '',
//         dateOfBirth: '',
//         gender: '',
//         nationality: '',
//         nationalId: '',
//         address: '',
//         serviceTypes: [],
//         experience: '',
//         salaryRange: '',
//         skills: [],
//         ref1Name: '',
//         ref1Phone: '',
//         ref2Name: '',
//         ref2Phone: '',
//         preferredHours: '',
//         workAreas: '',
//         terms: false,
//       });
//     } catch (error) {
//       console.error('Registration error:', error);
//       setMessage({ type: 'error', text: 'Registration failed. Please try again or contact support if the problem persists.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <div className="flex justify-center mb-4">
//           <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-glow">
//             <Users className="w-8 h-8 text-white" />
//           </div>
//         </div>
//         <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//           Domestic Employee Registration
//         </h3>
//         <p className="text-white/80 leading-relaxed">
//           Join our platform and connect with families who value your skills
//         </p>
//       </div>
      
//       {message && (
//         <Alert
//           type={message.type}
//           message={message.text}
//           onClose={() => setMessage(null)}
//         />
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Personal Information */}
//         <div className="space-y-4">
//           <h4 className="text-lg font-semibold text-white flex items-center gap-2">
//             <User className="w-5 h-5" />
//             Personal Information
//           </h4>
          
//           <div className="grid md:grid-cols-2 gap-6">
//             <Input
//               label="Full Name *"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               required
//               icon={<User className="w-4 h-4" />}
//               placeholder="Enter your full name"
//             />
            
//             <Input
//               label="Email Address *"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               icon={<Mail className="w-4 h-4" />}
//               placeholder="your.email@example.com"
//             />
            
//             <Input
//               label="Phone Number *"
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               icon={<Phone className="w-4 h-4" />}
//               placeholder="+250 7XX XXX XXX"
//             />
            
//             <Input
//               label="Date of Birth *"
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleInputChange}
//               required
//               icon={<Calendar className="w-4 h-4" />}
//             />
            
//             <Select
//               label="Gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//               options={genderOptions}
//             />
            
//             <Input
//               label="Nationality"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleInputChange}
//               icon={<MapPin className="w-4 h-4" />}
//               placeholder="e.g., Rwandan"
//             />
            
//             <Input
//               label="National ID Number"
//               name="nationalId"
//               value={formData.nationalId}
//               onChange={handleInputChange}
//               placeholder="Enter your ID number"
//             />
            
//             <Select
//               label="Experience Level"
//               name="experience"
//               value={formData.experience}
//               onChange={handleInputChange}
//               options={experienceOptions}
//             />
//           </div>

//           <Textarea
//             label="Current Address"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             rows={2}
//             placeholder="Enter your current address"
//           />
//         </div>

//         {/* Professional Information */}
//         <div className="space-y-4">
//           <h4 className="text-lg font-semibold text-white flex items-center gap-2">
//             <Briefcase className="w-5 h-5" />
//             Professional Information
//           </h4>
          
//           <div>
//             <label className="block text-sm font-semibold text-white mb-3">
//               Service Type (Select all that apply) *
//             </label>
//             <div className="flex flex-wrap gap-3">
//               {serviceTypes.map(service => (
//                 <label 
//                   key={service.value} 
//                   className="flex items-center gap-2 cursor-pointer group"
//                 >
//                   <input
//                     type="checkbox"
//                     name="serviceTypes"
//                     value={service.value}
//                     checked={formData.serviceTypes.includes(service.value)}
//                     onChange={handleInputChange}
//                     className="sr-only"
//                   />
//                   <Badge
//                     variant={formData.serviceTypes.includes(service.value) ? 'primary' : 'secondary'}
//                     size="lg"
//                     className={`transition-all duration-200 cursor-pointer ${
//                       formData.serviceTypes.includes(service.value) 
//                         ? 'ring-2 ring-primary-300 shadow-glow' 
//                         : 'hover:scale-105 opacity-70 hover:opacity-100'
//                     }`}
//                   >
//                     {service.label}
//                   </Badge>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-white mb-3">
//               Key Skills (Select all that apply)
//             </label>
//             <div className="flex flex-wrap gap-3">
//               {skillOptions.map(skill => (
//                 <label 
//                   key={skill.value} 
//                   className="flex items-center gap-2 cursor-pointer group"
//                 >
//                   <input
//                     type="checkbox"
//                     name="skills"
//                     value={skill.value}
//                     checked={formData.skills.includes(skill.value)}
//                     onChange={handleInputChange}
//                     className="sr-only"
//                   />
//                   <Badge
//                     variant={formData.skills.includes(skill.value) ? 'success' : 'secondary'}
//                     size="md"
//                     className={`transition-all duration-200 cursor-pointer ${
//                       formData.skills.includes(skill.value) 
//                         ? 'ring-2 ring-success-300 shadow-glow' 
//                         : 'hover:scale-105 opacity-70 hover:opacity-100'
//                     }`}
//                   >
//                     {skill.label}
//                   </Badge>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <Input
//             label="Desired Salary Range (monthly)"
//             name="salaryRange"
//             value={formData.salaryRange}
//             onChange={handleInputChange}
//             placeholder="e.g., 80,000 - 120,000 RWF"
//           />
//         </div>

//         {/* References */}
//         <div className="space-y-4">
//           <h4 className="text-lg font-semibold text-white flex items-center gap-2">
//             <Award className="w-5 h-5" />
//             References
//           </h4>
          
//           <div className="grid md:grid-cols-2 gap-6">
//             <Input
//               label="Reference 1 - Name"
//               name="ref1Name"
//               value={formData.ref1Name}
//               onChange={handleInputChange}
//               placeholder="Full name"
//             />
            
//             <Input
//               label="Reference 1 - Phone"
//               type="tel"
//               name="ref1Phone"
//               value={formData.ref1Phone}
//               onChange={handleInputChange}
//               placeholder="+250 7XX XXX XXX"
//             />
            
//             <Input
//               label="Reference 2 - Name"
//               name="ref2Name"
//               value={formData.ref2Name}
//               onChange={handleInputChange}
//               placeholder="Full name"
//             />
            
//             <Input
//               label="Reference 2 - Phone"
//               type="tel"
//               name="ref2Phone"
//               value={formData.ref2Phone}
//               onChange={handleInputChange}
//               placeholder="+250 7XX XXX XXX"
//             />
//           </div>
//         </div>

//         {/* Work Preferences */}
//         <div className="space-y-4">
//           <h4 className="text-lg font-semibold text-white flex items-center gap-2">
//             <Clock className="w-5 h-5" />
//             Work Preferences
//           </h4>
          
//           <div>
//             <label className="block text-sm font-semibold text-white mb-3">
//               Preferred Working Hours
//             </label>
//             <div className="flex flex-wrap gap-3">
//               {['full-time', 'part-time', 'live-in', 'live-out'].map(option => (
//                 <label 
//                   key={option} 
//                   className="flex items-center gap-2 cursor-pointer group"
//                 >
//                   <input
//                     type="radio"
//                     name="preferredHours"
//                     value={option}
//                     checked={formData.preferredHours === option}
//                     onChange={handleInputChange}
//                     className="sr-only"
//                   />
//                   <Badge
//                     variant={formData.preferredHours === option ? 'warning' : 'secondary'}
//                     size="lg"
//                     className={`transition-all duration-200 cursor-pointer ${
//                       formData.preferredHours === option 
//                         ? 'ring-2 ring-warning-300 shadow-glow' 
//                         : 'hover:scale-105 opacity-70 hover:opacity-100'
//                     }`}
//                   >
//                     {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                   </Badge>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <Textarea
//             label="Geographic Areas You Can Work In"
//             name="workAreas"
//             value={formData.workAreas}
//             onChange={handleInputChange}
//             rows={2}
//             placeholder="e.g., Kigali, Nyamirambo, Kimihurura..."
//           />
//         </div>

//         {/* Terms and Conditions */}
//         <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
//           <input
//             type="checkbox"
//             name="terms"
//             checked={formData.terms}
//             onChange={handleInputChange}
//             required
//             className="mt-1 w-4 h-4 text-primary-600 bg-white/90 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
//           />
//           <label className="text-sm text-white/90 leading-relaxed">
//             I agree to the <span className="text-primary-300 font-medium">Terms and Conditions</span> and{' '}
//             <span className="text-primary-300 font-medium">Privacy Policy</span>. I understand that a membership fee applies and confirm that all information provided is accurate. *
//           </label>
//         </div>

//         <Button
//           type="submit"
//           variant="primary"
//           size="lg"
//           loading={isSubmitting}
//           className="w-full shadow-glow-lg"
//         >
//           {isSubmitting ? 'Processing Registration...' : 'Register as Domestic Employee'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeRegistration;


import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { EmployeeData } from '../types';
import { User, Mail, Phone, Calendar, MapPin, Briefcase, Award, Users, Clock, FileText } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Alert from './ui/Alert';
import Badge from './ui/Badge';

const EmployeeRegistration: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    nationalId: '',
    address: '',
    serviceTypes: [],
    experience: '',
    salaryRange: '',
    skills: [],
    ref1Name: '',
    ref1Phone: '',
    ref2Name: '',
    ref2Phone: '',
    preferredHours: '',
    workAreas: '',
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const serviceTypes = [
    { value: 'nanny', label: 'Nanny' },
    { value: 'cleaner', label: 'Cleaner' },
    { value: 'cook', label: 'Cook' },
    { value: 'gardener', label: 'Gardener' },
  ];

  const skillOptions = [
    { value: 'childcare', label: 'Childcare' },
    { value: 'deep-cleaning', label: 'Deep Cleaning' },
    { value: 'meal-prep', label: 'Meal Prep' },
    { value: 'laundry', label: 'Laundry' },
    { value: 'pet-care', label: 'Pet Care' },
    { value: 'elderly-care', label: 'Elderly Care' },
  ];

  const genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const experienceOptions = [
    { value: '', label: 'Select experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '2-3', label: '2-3 years' },
    { value: '4-5', label: '4-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '10+', label: '10+ years' },
  ];

  const workingHoursOptions = [
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
      } else if (name === 'serviceTypes') {
        setFormData(prev => ({
          ...prev,
          serviceTypes: checked 
            ? [...prev.serviceTypes, value]
            : prev.serviceTypes.filter(s => s !== value)
        }));
      } else if (name === 'skills') {
        setFormData(prev => ({
          ...prev,
          skills: checked 
            ? [...prev.skills, value]
            : prev.skills.filter(s => s !== value)
        }));
      }
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Client-side validation
    if (formData.serviceTypes.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one service type.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('employees')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender || null,
          nationality: formData.nationality || null,
          national_id: formData.nationalId || null,
          address: formData.address || null,
          service_types: formData.serviceTypes,
          experience: formData.experience || null,
          salary_range: formData.salaryRange || null,
          skills: formData.skills,
          ref1_name: formData.ref1Name || null,
          ref1_phone: formData.ref1Phone || null,
          ref2_name: formData.ref2Name || null,
          ref2_phone: formData.ref2Phone || null,
          preferred_hours: formData.preferredHours || null,
          work_areas: formData.workAreas || null,
        }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Registration successful! We will contact you soon to complete the verification process and discuss opportunities.' });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        nationalId: '',
        address: '',
        serviceTypes: [],
        experience: '',
        salaryRange: '',
        skills: [],
        ref1Name: '',
        ref1Phone: '',
        ref2Name: '',
        ref2Phone: '',
        preferredHours: '',
        workAreas: '',
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
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-glow">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Domestic Employee Registration
        </h3>
        <p className="text-white/80 leading-relaxed">
          Join our platform and connect with families who value your skills
        </p>
      </div>
      
      {message && (
        <Alert
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
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
              label="Date of Birth *"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              icon={<Calendar className="w-4 h-4" />}
            />
            
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={genderOptions}
            />
            
            <Input
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              icon={<MapPin className="w-4 h-4" />}
              placeholder="e.g., Rwandan"
            />
            
            <Input
              label="National ID Number"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleInputChange}
              placeholder="Enter your ID number"
            />
            
            <Select
              label="Experience Level"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              options={experienceOptions}
            />
          </div>

          <Textarea
            label="Current Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={2}
            placeholder="Enter your current address"
          />
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Professional Information
          </h4>
          
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              Service Type (Select all that apply) *
            </label>
            <div className="flex flex-wrap gap-3">
              {serviceTypes.map(service => (
                <label 
                  key={service.value} 
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    name="serviceTypes"
                    value={service.value}
                    checked={formData.serviceTypes.includes(service.value)}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Badge
                    variant={formData.serviceTypes.includes(service.value) ? 'primary' : 'secondary'}
                    size="lg"
                    className={`transition-all duration-200 cursor-pointer ${
                      formData.serviceTypes.includes(service.value) 
                        ? 'ring-2 ring-primary-300 shadow-glow' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {service.label}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              Key Skills (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-3">
              {skillOptions.map(skill => (
                <label 
                  key={skill.value} 
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill.value}
                    checked={formData.skills.includes(skill.value)}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Badge
                    variant={formData.skills.includes(skill.value) ? 'success' : 'secondary'}
                    size="md"
                    className={`transition-all duration-200 cursor-pointer ${
                      formData.skills.includes(skill.value) 
                        ? 'ring-2 ring-success-300 shadow-glow' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {skill.label}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Desired Salary Range (monthly)"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleInputChange}
            placeholder="e.g., 80,000 - 120,000 RWF"
          />
        </div>

        {/* References */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            References
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Reference 1 - Name"
              name="ref1Name"
              value={formData.ref1Name}
              onChange={handleInputChange}
              placeholder="Full name"
            />
            
            <Input
              label="Reference 1 - Phone"
              type="tel"
              name="ref1Phone"
              value={formData.ref1Phone}
              onChange={handleInputChange}
              placeholder="+250 7XX XXX XXX"
            />
            
            <Input
              label="Reference 2 - Name"
              name="ref2Name"
              value={formData.ref2Name}
              onChange={handleInputChange}
              placeholder="Full name"
            />
            
            <Input
              label="Reference 2 - Phone"
              type="tel"
              name="ref2Phone"
              value={formData.ref2Phone}
              onChange={handleInputChange}
              placeholder="+250 7XX XXX XXX"
            />
          </div>
        </div>

        {/* Work Preferences */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Work Preferences
          </h4>
          
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              Preferred Working Hours
            </label>
            <div className="flex flex-wrap gap-3">
              {workingHoursOptions.map(option => (
                <label 
                  key={option.value} 
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="preferredHours"
                    value={option.value}
                    checked={formData.preferredHours === option.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Badge
                    variant={formData.preferredHours === option.value ? 'warning' : 'secondary'}
                    size="lg"
                    className={`transition-all duration-200 cursor-pointer ${
                      formData.preferredHours === option.value 
                        ? 'ring-2 ring-warning-300 shadow-glow' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {option.label}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          <Textarea
            label="Geographic Areas You Can Work In"
            name="workAreas"
            value={formData.workAreas}
            onChange={handleInputChange}
            rows={2}
            placeholder="e.g., Kigali, Nyamirambo, Kimihurura..."
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-primary-600 bg-white/90 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label className="text-sm text-white/90 leading-relaxed">
            I agree to the <span className="text-primary-300 font-medium">Terms and Conditions</span> and{' '}
            <span className="text-primary-300 font-medium">Privacy Policy</span>. I understand that a membership fee applies and confirm that all information provided is accurate. *
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full shadow-glow-lg"
        >
          {isSubmitting ? 'Processing Registration...' : 'Register as Domestic Employee'}
        </Button>
      </form>
    </div>
  );
};

export default EmployeeRegistration;