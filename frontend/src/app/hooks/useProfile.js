// hooks/useProfile.js
import { useReadContract } from 'wagmi';
import { CONTRACTS } from '@/context/constants';

export const useProfile = (address) => {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACTS.PROFILE_MANAGER.address,
    abi: CONTRACTS.PROFILE_MANAGER.abi,
    functionName: 'getProfileByAddress',
    args: [address],
  });

  return {
    profile: data,
    error,
    isLoading,
    hasProfile: !!data && data.role !== 0, // Assuming 0 = unregistered
  };
};
