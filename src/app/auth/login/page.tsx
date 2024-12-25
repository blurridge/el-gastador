import { createSupabaseBrowserClient } from "@/libs/supabase/client";

export default function Home() {
  const supabase = createSupabaseBrowserClient()
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  return (
    <div>
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
