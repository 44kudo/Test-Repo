// src/lib/storage.js
import { supabase, WORKSPACE_ID } from './api'

const CACHE_KEY = 'astro-crm-cache'

// ───── helpers: cache ──────────────────────────────────────────
function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]') }
  catch { return [] }
}
function writeCache(list) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(list))
}

// ───── public API used by App.jsx ──────────────────────────────
/** Загружаем список: сервер → кэш → UI.
 *  Если офлайн/ошибка — вернём кэш, чтобы UI не «падал».
 */
export async function loadContacts() {
  const { data, error } = await supabase
    .from('crm_buckets')
    .select('data, updated_at')
    .eq('workspace_id', WORKSPACE_ID)
    .single()

  if (error) {
    // офлайн: даём кэш, UI продолжает работать
    return readCache()
  }
  const list = data?.data ?? []
  writeCache(list)   // синхронизируем локальную копию
  return list
}

/** Сохранение: сначала пишем в кэш (моментально в UI), затем — на сервер.
 *  После успешного апсёрта Realtime обновит и другие устройства.
 */
export async function saveContacts(list) {
  writeCache(list) // optimistic update для офлайна
  const { error } = await supabase
    .from('crm_buckets')
    .upsert({ workspace_id: WORKSPACE_ID, data: list })
  if (error) {
    console.error('saveContacts:', error.message)
  }
}

/** Сброс демо-данных (можно убрать, если демо не нужно) */
export async function resetDemo() {
  const demo = [
    { id: crypto.randomUUID(), name: 'Alice New',  phone: '123-456', note: 'First contact', stage: 'new',         tasks: [] },
    { id: crypto.randomUUID(), name: 'Bob In Progress', phone: '555-123', note: '',         stage: 'in_progress', tasks: [] },
    { id: crypto.randomUUID(), name: 'Carol Won', phone: '987-654', note: '',               stage: 'won',        tasks: [] }
  ]
  await saveContacts(demo)
  return demo
}

/** Очистка всех контактов */
export async function clearAllContacts() {
  await saveContacts([])
  return []
}

/** Первичная инициализация: если пусто — накидываем демо */
export async function seedIfEmpty() {
  const list = await loadContacts()
  if (!list || list.length === 0) return resetDemo()
  return list
}

/** Realtime подписка — при серверном UPDATE подтягиваем свежие данные */
export function subscribeToRemoteChanges(onChange) {
  const channel = supabase
    .channel('realtime:crm_buckets')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'crm_buckets', filter: `workspace_id=eq.${WORKSPACE_ID}` },
      async () => {
        const fresh = await loadContacts()
        onChange(fresh)
      }
    )
    .subscribe()

  // функция отписки — вызовется в cleanup эффекта React
  return () => supabase.removeChannel(channel)
}


