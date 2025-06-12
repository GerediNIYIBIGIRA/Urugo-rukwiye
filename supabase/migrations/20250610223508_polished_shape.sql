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


-- Create email_logs table for tracking all email communications
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_email VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    email_type VARCHAR(50) NOT NULL CHECK (email_type IN ('employee_welcome', 'employer_welcome', 'notification', 'reminder')),
    email_subject TEXT NOT NULL,
    template_used VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
    error_message TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    company_name VARCHAR(255),
    services TEXT[], -- Array of services for employer emails
    metadata JSONB DEFAULT '{}' -- Additional data as needed
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_email ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_email_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_type ON email_logs(recipient_email, email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status_created ON email_logs(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_type_status ON email_logs(user_id, email_type, status);

-- Create a function to automatically cleanup old logs (optional)
CREATE OR REPLACE FUNCTION cleanup_old_email_logs()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Delete logs older than 90 days
    DELETE FROM email_logs 
    WHERE created_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$;

-- Create a view for email statistics (optional but useful for reporting)
CREATE OR REPLACE VIEW email_stats AS
SELECT 
    DATE(created_at) as date,
    email_type,
    status,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE status = 'sent') as sent_count,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_count,
    ROUND(
        (COUNT(*) FILTER (WHERE status = 'sent')::DECIMAL / COUNT(*)) * 100, 
        2
    ) as success_rate
FROM email_logs
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), email_type, status
ORDER BY date DESC, email_type, status;

-- Enable Row Level Security (RLS)
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow users to view their own email logs
CREATE POLICY "Users can view their own email logs" ON email_logs
    FOR SELECT USING (
        auth.uid() = user_id OR 
        auth.email() = recipient_email
    );

-- Allow service role to insert/update email logs
CREATE POLICY "Service role can manage email logs" ON email_logs
    FOR ALL USING (
        auth.role() = 'service_role'
    );

-- Allow authenticated users to insert email logs for their own emails
CREATE POLICY "Users can insert their own email logs" ON email_logs
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        auth.email() = recipient_email
    );

-- Grant necessary permissions
GRANT SELECT ON email_logs TO authenticated;
GRANT INSERT ON email_logs TO authenticated;
GRANT SELECT ON email_stats TO authenticated;

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