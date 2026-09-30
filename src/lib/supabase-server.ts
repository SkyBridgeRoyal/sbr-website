import { createClient } from '@supabase/supabase-js'

// This client uses the SECRET key and must only be imported
// from server-side code (server actions, API routes) —
// never from a file that runs in the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey)

