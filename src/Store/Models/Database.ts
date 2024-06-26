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
      cart: {
        Row: {
          created_at: string | null
          date_email_sent: string | null
          emails_sent: number | null
          id: string
          modified_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_email_sent?: string | null
          emails_sent?: number | null
          id: string
          modified_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_email_sent?: string | null
          emails_sent?: number | null
          id?: string
          modified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_products: {
        Row: {
          cart_id: string | null
          created_at: string
          id: string
          mixed_fruit_id: Database["public"]["Enums"]["fruit_type"][] | null
          product_id: string | null
          quantity: number | null
          size_type: Database["public"]["Enums"]["size_type"]
          user_id: string | null
        }
        Insert: {
          cart_id?: string | null
          created_at?: string
          id?: string
          mixed_fruit_id?: Database["public"]["Enums"]["fruit_type"][] | null
          product_id?: string | null
          quantity?: number | null
          size_type?: Database["public"]["Enums"]["size_type"]
          user_id?: string | null
        }
        Update: {
          cart_id?: string | null
          created_at?: string
          id?: string
          mixed_fruit_id?: Database["public"]["Enums"]["fruit_type"][] | null
          product_id?: string | null
          quantity?: number | null
          size_type?: Database["public"]["Enums"]["size_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_products_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          payment_type: Database["public"]["Enums"]["payment_type"] | null
          status_type: Database["public"]["Enums"]["status_type"] | null
          total_price: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_type?: Database["public"]["Enums"]["payment_type"] | null
          status_type?: Database["public"]["Enums"]["status_type"] | null
          total_price?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_type?: Database["public"]["Enums"]["payment_type"] | null
          status_type?: Database["public"]["Enums"]["status_type"] | null
          total_price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_address: {
        Row: {
          address: string | null
          adress_bill: string | null
          city: string | null
          city_bill: string | null
          county: Database["public"]["Enums"]["county_type"] | null
          county_bill: Database["public"]["Enums"]["county_type"] | null
          created_at: string
          email: string | null
          first_name: string | null
          first_name_bill: string | null
          id: string
          info: string | null
          info_bill: string | null
          last_name: string | null
          last_name_bill: string | null
          order_id: string | null
          phone: string | null
          zip_code: string | null
          zip_code_bill: number | null
        }
        Insert: {
          address?: string | null
          adress_bill?: string | null
          city?: string | null
          city_bill?: string | null
          county?: Database["public"]["Enums"]["county_type"] | null
          county_bill?: Database["public"]["Enums"]["county_type"] | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          first_name_bill?: string | null
          id?: string
          info?: string | null
          info_bill?: string | null
          last_name?: string | null
          last_name_bill?: string | null
          order_id?: string | null
          phone?: string | null
          zip_code?: string | null
          zip_code_bill?: number | null
        }
        Update: {
          address?: string | null
          adress_bill?: string | null
          city?: string | null
          city_bill?: string | null
          county?: Database["public"]["Enums"]["county_type"] | null
          county_bill?: Database["public"]["Enums"]["county_type"] | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          first_name_bill?: string | null
          id?: string
          info?: string | null
          info_bill?: string | null
          last_name?: string | null
          last_name_bill?: string | null
          order_id?: string | null
          phone?: string | null
          zip_code?: string | null
          zip_code_bill?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_products: {
        Row: {
          created_at: string
          fruit_type: Database["public"]["Enums"]["fruit_type"] | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          mixed_fruit_id: Database["public"]["Enums"]["fruit_type"][] | null
          order_id: string
          price: number
          product_id: string
          product_type: Database["public"]["Enums"]["product_type"] | null
          quantity: number
          size_type: Database["public"]["Enums"]["size_type"]
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          fruit_type?: Database["public"]["Enums"]["fruit_type"] | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          mixed_fruit_id?: Database["public"]["Enums"]["fruit_type"][] | null
          order_id: string
          price: number
          product_id: string
          product_type?: Database["public"]["Enums"]["product_type"] | null
          quantity: number
          size_type?: Database["public"]["Enums"]["size_type"]
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          fruit_type?: Database["public"]["Enums"]["fruit_type"] | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          mixed_fruit_id?: Database["public"]["Enums"]["fruit_type"][] | null
          order_id?: string
          price?: number
          product_id?: string
          product_type?: Database["public"]["Enums"]["product_type"] | null
          quantity?: number
          size_type?: Database["public"]["Enums"]["size_type"]
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_products_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          fruit_type: Database["public"]["Enums"]["fruit_type"]
          id: string
          images: string[] | null
          in_stock: boolean | null
          price_half: number | null
          price_kg: number | null
          product_type: Database["public"]["Enums"]["product_type"]
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          fruit_type: Database["public"]["Enums"]["fruit_type"]
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          price_half?: number | null
          price_kg?: number | null
          product_type: Database["public"]["Enums"]["product_type"]
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          fruit_type?: Database["public"]["Enums"]["fruit_type"]
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          price_half?: number | null
          price_kg?: number | null
          product_type?: Database["public"]["Enums"]["product_type"]
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          address_bill: string | null
          city: string | null
          city_bill: string | null
          county: Database["public"]["Enums"]["county_type"] | null
          county_bill: Database["public"]["Enums"]["county_type"] | null
          created_at: string | null
          email: string | null
          first_name: string | null
          first_name_bill: string | null
          id: string
          info: string | null
          info_bill: string | null
          last_name: string | null
          last_name_bill: string | null
          phone: string | null
          zip_code: number | null
          zip_code_bill: number | null
        }
        Insert: {
          address?: string | null
          address_bill?: string | null
          city?: string | null
          city_bill?: string | null
          county?: Database["public"]["Enums"]["county_type"] | null
          county_bill?: Database["public"]["Enums"]["county_type"] | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          first_name_bill?: string | null
          id: string
          info?: string | null
          info_bill?: string | null
          last_name?: string | null
          last_name_bill?: string | null
          phone?: string | null
          zip_code?: number | null
          zip_code_bill?: number | null
        }
        Update: {
          address?: string | null
          address_bill?: string | null
          city?: string | null
          city_bill?: string | null
          county?: Database["public"]["Enums"]["county_type"] | null
          county_bill?: Database["public"]["Enums"]["county_type"] | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          first_name_bill?: string | null
          id?: string
          info?: string | null
          info_bill?: string | null
          last_name?: string | null
          last_name_bill?: string | null
          phone?: string | null
          zip_code?: number | null
          zip_code_bill?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      county_type:
        | "Alba"
        | "Arad"
        | "Arges"
        | "Bucuresti"
        | "Bacau"
        | "Bihor"
        | "Bistrita-Nasaud"
        | "Botosani"
        | "Brasov"
        | "Braila"
        | "Buzau"
        | "Caras-Severin"
        | "Calarasi"
        | "Cluj"
        | "Constanta"
        | "Covasna"
        | "Dambovita"
        | "Dolj"
        | "Galati"
        | "Giurgiu"
        | "Gorj"
        | "Harghita"
        | "Hunedoara"
        | "Ialomita"
        | "Iasi"
        | "Ilfov"
        | "Maramures"
        | "Mehedinti"
        | "Mures"
        | "Neamt"
        | "Olt"
        | "Prahova"
        | "Satu Mare"
        | "Salaj"
        | "Sibiu"
        | "Suceava"
        | "Teleorman"
        | "Timis"
        | "Tulcea"
        | "Valcea"
        | "Vaslui"
        | "Vrancea"
      fruit_type:
        | "Nothing"
        | "Ananas"
        | "Aronia"
        | "Banane"
        | "Cocos"
        | "Catina"
        | "Ghimbir"
        | "Goji"
        | "Lamaie"
        | "Mango"
        | "Merisor"
        | "Papaya"
        | "Mixed"
        | "Walnut"
        | "Almond"
        | "Caju"
      payment_type: "Cash" | "Card" | "Transfer"
      product_type: "All" | "Poliflora" | "Salcam" | "Tei" | "Mana"
      size_type: "Big" | "Small"
      status_type: "All" | "Pending" | "Shipped" | "Delivered" | "Cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
