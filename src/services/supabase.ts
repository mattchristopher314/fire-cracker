import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface PBJSONData {
  oddsReciprocal: number;
  prizeAllocations: { value: number; number: number }[];
  averageRatePercentage: number;
}

export interface TaxJSONData {
  rates: { bandLower?: number; bandUpper?: number; rate: number }[];
}

export interface Database {
  public: {
    Tables: {
      "global-stats": {
        Row: {
          created_at: string;
          data: PBJSONData | TaxJSONData | null;
          id: number;
          parent: string | null;
          source: string | null;
        };
        Insert: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          parent?: string | null;
          source?: string | null;
        };
        Update: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          parent?: string | null;
          source?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
