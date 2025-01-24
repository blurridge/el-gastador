'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { useGoogleSignIn } from '@/features/auth';

import googleIcon from '@/assets/icons/google_icon.svg';

const GoogleSignIn = () => {
  const { refetch: signInWithGoogle } = useGoogleSignIn();
  return (
    <Button onClick={() => signInWithGoogle()} className="w-full" variant="neutral">
      <Image src={googleIcon} alt="Google Icon" width={24} height={24} />
    </Button>
  );
};

export default GoogleSignIn;
