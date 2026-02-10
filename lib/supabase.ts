import { createClient } from '@supabase/supabase-js';

// ใช้ ENV เป็นหลัก แต่มีค่า fallback ไปยังโปรเจกต์ miswellness ที่กำหนดไว้
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://wcdgmtofemhgxpqleoqp.supabase.co';

// anon key เป็น public key ที่ปลอดภัยต่อการใช้ฝั่ง client
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZGdtdG9mZW1oZ3hwcWxlb3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzg1NzUsImV4cCI6MjA4NTk1NDU3NX0.beeY5WnBptTiGKHlKuRzr2yuyOl5Zm7AnZhWZ1xjEGU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MwwApplication = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name_th: string;
  name_en?: string;
  nickname?: string;
  birth_date?: string;
  age?: number;
  weight_kg?: number;
  height_cm?: number;
  bust_cm?: number;
  waist_cm?: number;
  hip_cm?: number;
  congenital_disease?: string;
  allergies?: string;
  address_no?: string;
  address_moo?: string;
  address_village?: string;
  address_soi?: string;
  address_road?: string;
  address_tambol?: string;
  address_amphoe?: string;
  address_province?: string;
  phone: string;
  email?: string;
  line_id?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  emergency_name?: string;
  emergency_relation?: string;
  emergency_phone?: string;
  education_level?: string;
  school_name?: string;
  occupation?: string;
  company?: string;
  training_history?: string;
  reference_name?: string;
  reference_relation?: string;
  reference_phone?: string;
  contest_experience?: string;
  special_skills?: string;
  language_skills?: string;
  sponsor_info?: string;
  duty_amphoe?: string;
  duty_province?: string;
  video_url?: string;
  social_work_images?: string;
  photo_self_note?: string;
  consent_conditions: boolean;
  consent_pdpa: boolean;
  applicant_signature?: string;
  application_date?: string;
  status?: string;
  payment_slip_url?: string;
  photo_half_url?: string;
  photo_full_url?: string;
  vote_count?: number;
}
