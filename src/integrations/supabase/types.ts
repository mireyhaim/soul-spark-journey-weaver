export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_interactions: {
        Row: {
          ai_response: string
          context: Json | null
          created_at: string | null
          id: string
          journey_id: string | null
          message_content: string
          user_id: string
        }
        Insert: {
          ai_response: string
          context?: Json | null
          created_at?: string | null
          id?: string
          journey_id?: string | null
          message_content: string
          user_id: string
        }
        Update: {
          ai_response?: string
          context?: Json | null
          created_at?: string | null
          id?: string
          journey_id?: string | null
          message_content?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          bio: string | null
          created_at: string | null
          expertise_areas: string[] | null
          id: string
          social_links: Json | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          expertise_areas?: string[] | null
          id?: string
          social_links?: Json | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          expertise_areas?: string[] | null
          id?: string
          social_links?: Json | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_days: {
        Row: {
          content: Json
          day_number: number
          estimated_duration_minutes: number | null
          id: string
          journey_id: string
          reflection_questions: string[] | null
          title: string
        }
        Insert: {
          content: Json
          day_number: number
          estimated_duration_minutes?: number | null
          id?: string
          journey_id: string
          reflection_questions?: string[] | null
          title: string
        }
        Update: {
          content?: Json
          day_number?: number
          estimated_duration_minutes?: number | null
          id?: string
          journey_id?: string
          reflection_questions?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_days_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      journeys: {
        Row: {
          category: string | null
          created_at: string | null
          creator_id: string
          description: string | null
          duration: number
          id: string
          image_url: string | null
          price: number | null
          status: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          duration: number
          id?: string
          image_url?: string | null
          price?: number | null
          status?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          duration?: number
          id?: string
          image_url?: string | null
          price?: number | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "journeys_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          journey_id: string
          payment_method: string | null
          status: string | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          journey_id: string
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          journey_id?: string
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_journey_progress: {
        Row: {
          completed_at: string | null
          completed_days: number[] | null
          current_day: number | null
          id: string
          journey_id: string
          last_interaction_at: string | null
          last_message: string | null
          reflections: Json | null
          started_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_days?: number[] | null
          current_day?: number | null
          id?: string
          journey_id: string
          last_interaction_at?: string | null
          last_message?: string | null
          reflections?: Json | null
          started_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_days?: number[] | null
          current_day?: number | null
          id?: string
          journey_id?: string
          last_interaction_at?: string | null
          last_message?: string | null
          reflections?: Json | null
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_journey_progress_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_journey_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          name: string | null
          preferences: Json | null
          profile_image_url: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          name?: string | null
          preferences?: Json | null
          profile_image_url?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          name?: string | null
          preferences?: Json | null
          profile_image_url?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
