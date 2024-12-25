import SignOut from '@/components/SignOut'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data)
  if (error || !data?.user) {
    console.log(error)
  }

  return (<><div><p>Hello {data.user?.email ?? "NONE"}</p><SignOut /></div></>)
}
