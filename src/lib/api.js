// src/lib/api.js
import { createClient } from '@supabase/supabase-js'

// Эти значения приходят из Vite (на билде подтягиваются из GitHub Secrets)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Клиент Supabase. В тестах/линте мы сеть не трогаем (см. storage.js),
// а сам файл лишь парсится, поэтому эта строка линтеру не мешает.
export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '', {
  auth: { persistSession: false },
})

// Один и тот же workspace для всех клиентов (таблица crm_buckets)
export const WORKSPACE_ID = 'd654cd31-282d-48fa-b92e-79c956020400'
