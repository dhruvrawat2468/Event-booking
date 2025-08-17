import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pzszxhztfdioencjtlpn.supabase.co"
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6c3p4aHp0ZmRpb2VuY2p0bHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Njc5NzUsImV4cCI6MjA2NjU0Mzk3NX0.W4A6dGtBHaRx-1pnBUQ7eM2CenL3wC8pPQDulogVAIM"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;