import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dvsztzvmkvqmwfpzqtsf.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2c3p0enZta3ZxbXdmcHpxdHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5ODkwNzksImV4cCI6MTk5MDU2NTA3OX0.UJ6nVk2vgtOu8YlaDbSOA4KIYnZ6pAyU3tsXV4Z1Y1Q"

export const supabase = createClient(supabaseUrl, supabaseKey)