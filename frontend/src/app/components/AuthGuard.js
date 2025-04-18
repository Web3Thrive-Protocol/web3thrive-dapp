"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useProfile } from '@/hooks/useProfile';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { profile, loading } = useProfile();

  useEffect(() => {
    const validPaths = ['/', '/register', '/dashboard/freelancer', '/dashboard/recruiter'];
    
    // Immediate exit for invalid paths
    if (!validPaths.includes(pathname)) {
      router.replace('/');
      return;
    }

    // No wallet connected - only allow landing page
    if (!isConnected && pathname !== '/') {
      router.replace('/');
      return;
    }

    // Wallet connected - handle profile states
    if (isConnected && !loading) {
      const targetPath = profile?.exists 
        ? `/dashboard/${profile.role.toLowerCase()}`
        : '/register';

      if (pathname !== targetPath) {
        router.replace(targetPath);
      }
    }
  }, [isConnected, loading, profile?.exists, pathname]);

  // Show loading state during initial checks
  if ((isConnected && loading) || (!isConnected && pathname !== '/')) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-gray-500">Verifying session...</div>
      </div>
    );
  }

  return children;
}