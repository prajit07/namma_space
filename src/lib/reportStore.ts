import { supabase } from "./supabase";

export interface Report {
  id: number;
  username: string;
  platform: string;
  category: string;
  description: string;
  status: string;
  date: string;
  reportCount: number;
  isAnonymous: boolean;
  email?: string;
  phone?: string;
  evidence_urls?: string[];
  created_at?: string;
}

// Optional: if no Supabase URL is provided, we can fallback to mock data initially
// But since this is a real-life app structure, we will expect the database to be connected.

/**
 * Fetch all reports from Supabase.
 */
export async function getReports(): Promise<Report[]> {
  // If no env variables, return empty (prevents crashing during setup)
  if (!import.meta.env.VITE_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
  
  // Format Supabase camelCase/snake_case mapping if needed
  return (data || []).map((row) => ({
    ...row,
    reportCount: row.report_count,
    isAnonymous: row.is_anonymous,
  })) as Report[];
}

/**
 * Add a new report to Supabase.
 */
export async function addReport(report: Omit<Report, "id" | "status" | "reportCount" | "date" | "created_at">): Promise<Report | null> {
  if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn("Supabase not configured. Setup .env.local to save reports.");
    return null;
  }

  const { data, error } = await supabase
    .from('reports')
    .insert([
      {
        username: report.username,
        platform: report.platform,
        category: report.category,
        description: report.description,
        is_anonymous: report.isAnonymous,
        email: report.email,
        phone: report.phone,
        evidence_urls: report.evidence_urls || [],
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding report:", error);
    return null;
  }
  return data as Report;
}

/**
 * Update the status of a specific report.
 */
export async function updateReportStatus(id: number, status: string): Promise<boolean> {
  if (!import.meta.env.VITE_SUPABASE_URL) return false;

  const { error } = await supabase
    .from('reports')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error("Error updating report status:", error);
    return false;
  }
  return true;
}

/**
 * Fetch only confirmed reports for the public Awareness Feed.
 */
export async function getConfirmedReports(): Promise<Report[]> {
  if (!import.meta.env.VITE_SUPABASE_URL) return [];

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('status', 'Confirmed')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching confirmed reports:", error);
    return [];
  }
  
  return (data || []).map((row) => ({
    ...row,
    reportCount: row.report_count,
    isAnonymous: row.is_anonymous,
  })) as Report[];
}
