import { createClient } from '@supabase/supabase-js'

// Эти значения приходят из GitHub Actions как VITE_* (мы их пробросили в workflow)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// ВАЖНО: тут — тот же UUID, что ты использовал в SQL/политиках.
// ОДИН и тот же везде.
export const WORKSPACE_ID = 'd654cd31-282d-48fa-b92e-79c956020400'
