import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://sfvyhuqnwgmiqzosqyil.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdnlodXFud2dtaXF6b3NxeWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzM3MDMsImV4cCI6MjA2MjYwOTcwM30.8nKFBQzgTdagWYWxRSeWQ0fRaqLKsHQpbBMcWHDSYkk";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
