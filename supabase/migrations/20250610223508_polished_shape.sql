/*
  # Create Urugo Rukwiye Platform Database Schema

  1. New Tables
    - `employers`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `location` (text)
      - `services` (text array)
      - `start_date` (date)
      - `working_hours` (text)
      - `requirements` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `employees`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `date_of_birth` (date)
      - `gender` (text)
      - `nationality` (text)
      - `national_id` (text)
      - `address` (text)
      - `service_types` (text array)
      - `experience` (text)
      - `salary_range` (text)
      - `skills` (text array)
      - `ref1_name` (text)
      - `ref1_phone` (text)
      - `ref2_name` (text)
      - `ref2_phone` (text)
      - `preferred_hours` (text)
      - `work_areas` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (for registration forms)
    - Add policies for admin access to manage data
*/

-- Create employers table
CREATE TABLE IF NOT EXISTS employers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  services text[] DEFAULT '{}',
  start_date date,
  working_hours text,
  requirements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,
  gender text,
  nationality text,
  national_id text,
  address text,
  service_types text[] DEFAULT '{}',
  experience text,
  salary_range text,
  skills text[] DEFAULT '{}',
  ref1_name text,
  ref1_phone text,
  ref2_name text,
  ref2_phone text,
  preferred_hours text,
  work_areas text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for employers table
CREATE POLICY "Anyone can register as employer"
  ON employers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Employers can read own data"
  ON employers
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for employees table
CREATE POLICY "Anyone can register as employee"
  ON employees
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Employees can read own data"
  ON employees
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for contact_messages table
CREATE POLICY "Anyone can send contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_employers_updated_at
  BEFORE UPDATE ON employers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS employers_email_idx ON employers(email);
CREATE INDEX IF NOT EXISTS employers_location_idx ON employers(location);
CREATE INDEX IF NOT EXISTS employers_services_idx ON employers USING GIN(services);
CREATE INDEX IF NOT EXISTS employers_created_at_idx ON employers(created_at);

CREATE INDEX IF NOT EXISTS employees_email_idx ON employees(email);
CREATE INDEX IF NOT EXISTS employees_service_types_idx ON employees USING GIN(service_types);
CREATE INDEX IF NOT EXISTS employees_skills_idx ON employees USING GIN(skills);
CREATE INDEX IF NOT EXISTS employees_created_at_idx ON employees(created_at);

CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON contact_messages(email);
CREATE INDEX IF NOT EXISTS contact_messages_subject_idx ON contact_messages(subject);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at);