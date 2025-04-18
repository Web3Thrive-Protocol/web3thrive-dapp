'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { CONTRACTS } from '@/context/constants';
import { Skeleton } from "@/components/ui/skeleton";

export default function FreelancerProfile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!address) {
        setProfile(null);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACTS.PROFILE_MANAGER.address,
        CONTRACTS.PROFILE_MANAGER.abi,
        await provider.getSigner()
      );

      const [name, role, hourlyRate, exists] = await contract.getProfile(address);
      
      setProfile(exists ? {
        name,
        role,
        hourlyRate: hourlyRate.toString(),
        exists
      } : null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleRefresh = () => {
    fetchProfile();
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <Skeleton height={28} width={200} className="mb-4" />
        <div className="space-y-2">
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={120} />
          <Skeleton height={20} width={180} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-red-500">Error: {error}</div>
        <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">Profile Overview</h2>
        <button
          onClick={handleRefresh}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-2">
        <p><strong>Name:</strong> {profile?.name || 'Not set'}</p>
        <p><strong>Role:</strong> {profile?.role || 'Freelancer'}</p>
        <p><strong>Hourly Rate:</strong> ${profile?.hourlyRate || '0'}/hour</p>
      </div>
    </div>
  );
}




// 'use client';
// import { useEffect } from "react";
// import { useProfile } from '@/hooks/useProfile';
// import { Skeleton } from "@/components/ui/skeleton";
// import { useAccount } from 'wagmi';

// export default function FreelancerProfile() {
//   const { address } = useAccount();
//   const { profile, loading, error, refresh } = useProfile();

//   // Refresh profile when address changes or component mounts
//   useEffect(() => {
//     refresh();
//   }, [address, refresh]);

//   if (loading) return <ProfileSkeleton />;
  
//   if (error) return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="text-red-500">Error loading profile: {error}</div>
//     </div>
//   );

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
//       <div className="space-y-2">
//         <p><strong>Name:</strong> {profile?.name || 'Not set'}</p>
//         <p><strong>Role:</strong> {profile?.role || 'Freelancer'}</p>
//         <p><strong>Hourly Rate:</strong> ${profile?.hourlyRate || '0'}/hour</p>
//       </div>
//     </div>
//   );
// }

// const ProfileSkeleton = () => (
//   <div className="bg-white p-6 rounded-lg shadow">
//     <Skeleton height={28} width={200} className="mb-4" />
//     <div className="space-y-2">
//       <Skeleton height={20} width={150} />
//       <Skeleton height={20} width={120} />
//       <Skeleton height={20} width={180} />
//     </div>
//   </div>
// );