export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      feedback: {
        Row: {
          created_at: string
          id: string
          is_approved: boolean
          message: string
          name: string
          rating: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_approved?: boolean
          message: string
          name: string
          rating: number
        }
        Update: {
          created_at?: string
          id?: string
          is_approved?: boolean
          message?: string
          name?: string
          rating?: number
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          created_at: string
          description: string
          display_order: number
          github: string | null
          gradient: string
          id: string
          image_url: string | null
          is_featured: boolean
          live_url: string | null
          name: string
          tech: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          github?: string | null
          gradient?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          live_url?: string | null
          name: string
          tech: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          github?: string | null
          gradient?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          live_url?: string | null
          name?: string
          tech?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_skills: {
        Row: {
          color_from: string
          color_to: string
          created_at: string
          display_order: number
          id: string
          level: number
          name: string
          updated_at: string
        }
        Insert: {
          color_from?: string
          color_to?: string
          created_at?: string
          display_order?: number
          id?: string
          level: number
          name: string
          updated_at?: string
        }
        Update: {
          color_from?: string
          color_to?: string
          created_at?: string
          display_order?: number
          id?: string
          level?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_stats: {
        Row: {
          created_at: string
          display_order: number
          icon_name: string
          id: string
          label: string
          suffix: string | null
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon_name: string
          id?: string
          label: string
          suffix?: string | null
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          display_order?: number
          icon_name?: string
          id?: string
          label?: string
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      portfolio_tech_stack: {
        Row: {
          category: string
          created_at: string
          display_order: number
          id: string
          technologies: string[]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number
          id?: string
          technologies: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number
          id?: string
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_timeline: {
        Row: {
          created_at: string
          description: string
          display_order: number
          event_type: string
          icon_name: string
          id: string
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          event_type: string
          icon_name: string
          id?: string
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          event_type?: string
          icon_name?: string
          id?: string
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
