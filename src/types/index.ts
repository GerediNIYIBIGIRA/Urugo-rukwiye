export interface EmployerData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  startDate?: string;
  workingHours?: string;
  requirements?: string;
  terms: boolean;
}

export interface EmployeeData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender?: string;
  nationality?: string;
  nationalId?: string;
  address?: string;
  serviceTypes: string[];
  experience?: string;
  salaryRange?: string;
  skills: string[];
  ref1Name?: string;
  ref1Phone?: string;
  ref2Name?: string;
  ref2Phone?: string;
  preferredHours?: string;
  workAreas?: string;
  terms: boolean;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type TabType = 'about' | 'register' | 'pricing' | 'policies' | 'contact';
export type RegistrationType = 'employer' | 'employee';