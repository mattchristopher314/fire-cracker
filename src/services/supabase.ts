import { createClient } from "@supabase/supabase-js";

export const supabaseUrl =
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
  nextDraw: string;
}

export interface TaxJSONData {
  rates: {
    bandLower?: number;
    bandUpper?: number;
    rate: number;
    personalSavingsAllowance?: number;
  }[];
}

export interface Database {
  public: {
    Tables: {
      "global-stats": {
        Row: {
          created_at: string;
          data: Json | null;
          id: number;
          parent: string | null;
          source: string | null;
          source_updated: string | null;
        };
        Insert: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          parent?: string | null;
          source?: string | null;
          source_updated?: string | null;
        };
        Update: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          parent?: string | null;
          source?: string | null;
          source_updated?: string | null;
        };
        Relationships: [];
      };
      holdings: {
        Row: {
          created_at: string;
          data: Json | null;
          description: string | null;
          id: string;
          quantity: number | null;
          vehicle: string;
        };
        Insert: {
          created_at?: string;
          data?: Json | null;
          description?: string | null;
          id: string;
          quantity?: number | null;
          vehicle: string;
        };
        Update: {
          created_at?: string;
          data?: Json | null;
          description?: string | null;
          id?: string;
          quantity?: number | null;
          vehicle?: string;
        };
        Relationships: [
          {
            foreignKeyName: "holdings_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar: string | null;
          created_at: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      settings: {
        Row: {
          created_at: string;
          id: string;
          payload: Json | null;
          type: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          payload?: Json | null;
          type: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          payload?: Json | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "settings_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
