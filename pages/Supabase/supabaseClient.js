import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://moqavdivobagumfhwyus.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcWF2ZGl2b2JhZ3VtZmh3eXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDIwNjAsImV4cCI6MjA0ODg3ODA2MH0.BcTT_ZOuiwhOvqnikqc54pM4eu9jsvIaKJSqETPRwaY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Ensures token storage for React Native
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
