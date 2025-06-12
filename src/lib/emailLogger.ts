import { supabase } from './supabase';

export interface EmailLog {
  id?: string;
  recipient_email: string;
  recipient_name: string;
  email_type: 'employee_welcome' | 'employer_welcome' | 'notification' | 'reminder';
  email_subject: string;
  template_used: string;
  status: 'pending' | 'sent' | 'failed' | 'bounced';
  error_message?: string;
  sent_at?: string;
  created_at?: string;
  user_id?: string;
  company_name?: string;
  services?: string[];
  metadata?: Record<string, any>;
}

export interface EmailLogStats {
  total_sent: number;
  total_failed: number;
  success_rate: number;
  recent_emails: EmailLog[];
}

/**
 * Log an email attempt to the database
 */
export const logEmailAttempt = async (emailData: Omit<EmailLog, 'id' | 'created_at'>): Promise<EmailLog | null> => {
  try {
    const { data, error } = await supabase
      .from('email_logs')
      .insert([{
        recipient_email: emailData.recipient_email,
        recipient_name: emailData.recipient_name,
        email_type: emailData.email_type,
        email_subject: emailData.email_subject,
        template_used: emailData.template_used,
        status: emailData.status,
        error_message: emailData.error_message,
        sent_at: emailData.sent_at,
        user_id: emailData.user_id,
        company_name: emailData.company_name,
        services: emailData.services,
        metadata: emailData.metadata,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error logging email attempt:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to log email attempt:', error);
    return null;
  }
};

/**
 * Update email status (e.g., when delivery confirmation is received)
 */
export const updateEmailStatus = async (
  emailId: string, 
  status: EmailLog['status'], 
  errorMessage?: string
): Promise<boolean> => {
  try {
    const updateData: any = {
      status,
      ...(status === 'sent' && { sent_at: new Date().toISOString() }),
      ...(errorMessage && { error_message: errorMessage })
    };

    const { error } = await supabase
      .from('email_logs')
      .update(updateData)
      .eq('id', emailId);

    if (error) {
      console.error('Error updating email status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to update email status:', error);
    return false;
  }
};

/**
 * Get email logs for a specific user or email address
 */
export const getEmailLogs = async (
  filters: {
    user_id?: string;
    recipient_email?: string;
    email_type?: EmailLog['email_type'];
    status?: EmailLog['status'];
    limit?: number;
    days_back?: number;
  } = {}
): Promise<EmailLog[]> => {
  try {
    let query = supabase
      .from('email_logs')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id);
    }
    
    if (filters.recipient_email) {
      query = query.eq('recipient_email', filters.recipient_email);
    }
    
    if (filters.email_type) {
      query = query.eq('email_type', filters.email_type);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.days_back) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - filters.days_back);
      query = query.gte('created_at', daysAgo.toISOString());
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching email logs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch email logs:', error);
    return [];
  }
};

/**
 * Get email statistics for dashboard/reporting
 */
export const getEmailStats = async (days_back: number = 30): Promise<EmailLogStats> => {
  try {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days_back);

    // Get all emails from the specified period
    const { data: emails, error } = await supabase
      .from('email_logs')
      .select('*')
      .gte('created_at', daysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching email stats:', error);
      return {
        total_sent: 0,
        total_failed: 0,
        success_rate: 0,
        recent_emails: []
      };
    }

    const emailList = emails || [];
    const total_sent = emailList.filter(email => email.status === 'sent').length;
    const total_failed = emailList.filter(email => email.status === 'failed').length;
    const total_attempts = emailList.length;
    const success_rate = total_attempts > 0 ? (total_sent / total_attempts) * 100 : 0;

    return {
      total_sent,
      total_failed,
      success_rate: Math.round(success_rate * 100) / 100, // Round to 2 decimal places
      recent_emails: emailList.slice(0, 10) // Get 10 most recent emails
    };
  } catch (error) {
    console.error('Failed to fetch email stats:', error);
    return {
      total_sent: 0,
      total_failed: 0,
      success_rate: 0,
      recent_emails: []
    };
  }
};

/**
 * Check if user has received a specific type of email recently
 */
export const hasRecentEmail = async (
  email: string, 
  emailType: EmailLog['email_type'], 
  hours_back: number = 24
): Promise<boolean> => {
  try {
    const hoursAgo = new Date();
    hoursAgo.setHours(hoursAgo.getHours() - hours_back);

    const { data, error } = await supabase
      .from('email_logs')
      .select('id')
      .eq('recipient_email', email)
      .eq('email_type', emailType)
      .eq('status', 'sent')
      .gte('created_at', hoursAgo.toISOString())
      .limit(1);

    if (error) {
      console.error('Error checking recent emails:', error);
      return false;
    }

    return (data && data.length > 0);
  } catch (error) {
    console.error('Failed to check recent emails:', error);
    return false;
  }
};

/**
 * Bulk log multiple email attempts (useful for batch operations)
 */
export const bulkLogEmails = async (emails: Omit<EmailLog, 'id' | 'created_at'>[]): Promise<EmailLog[]> => {
  try {
    const emailsWithTimestamp = emails.map(email => ({
      ...email,
      created_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('email_logs')
      .insert(emailsWithTimestamp)
      .select();

    if (error) {
      console.error('Error bulk logging emails:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to bulk log emails:', error);
    return [];
  }
};

/**
 * Delete old email logs (for cleanup/maintenance)
 */
export const cleanupOldLogs = async (days_to_keep: number = 90): Promise<number> => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days_to_keep);

    const { data, error } = await supabase
      .from('email_logs')
      .delete()
      .lt('created_at', cutoffDate.toISOString())
      .select('id');

    if (error) {
      console.error('Error cleaning up old logs:', error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error('Failed to cleanup old logs:', error);
    return 0;
  }
};