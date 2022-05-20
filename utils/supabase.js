
import { createClient } from '@supabase/supabase-js'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aWlhbmh2dnRhd2VhYnd3bmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI0Nzk4MTgsImV4cCI6MTk2ODA1NTgxOH0.jJAIbC5ivf-7rppT1EqqU8OQpdqqCLLbhtvTUS4_PUA'
const supabaseUrl = 'https://mviianhvvtaweabwwnje.supabase.co'
export const supabase = createClient(supabaseUrl, SERVICE_KEY)