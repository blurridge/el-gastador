import { createSupabaseBrowserClient } from '@/libs/supabase/client'

export default async function PrivatePage() {
  const supabase = createSupabaseBrowserClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data)
  if (error || !data?.user) {
    console.log(error)
  }

  return <p>Hello {data.user?.email ?? "NONE"}</p>
}
