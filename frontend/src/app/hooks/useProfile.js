"use client";
import { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { CONTRACTS } from '@/context/constants';

export function useProfile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (!address) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACTS.PROFILE_MANAGER.address,
        CONTRACTS.PROFILE_MANAGER.abi,
        await provider.getSigner()
      );

      const [name, role, hourlyRate, exists] = await contract.getProfile(address);
      setProfile(exists ? { name, role, hourlyRate: hourlyRate.toString() } : null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, refresh: fetchProfile };
}