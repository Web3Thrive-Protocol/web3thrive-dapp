'use client';

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { CONTRACTS } from '@/context/constants';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const { address } = useAccount();
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "",
    role: 0, // 0 = Freelancer, 1 = Recruiter
    hourlyRate: ""
  });
  const [loading, setLoading] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(true);

  // Check existing profile on mount
  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!address) return;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACTS.PROFILE_MANAGER.address,
          CONTRACTS.PROFILE_MANAGER.abi,
          provider
        );

        const profile = await contract.getProfile(address);
        if (profile.exists) {
          const role = profile.role.toString() === "0" ? "freelancer" : "recruiter";
          router.replace(`/dashboard/${role}`);
        }
      } catch (error) {
        // If profile does not exist, ignore and continue
        if (error?.data?.message?.includes("Profile does not exist")) {
          console.log("No profile found, proceed to create");
        } else {
          toast.error("Failed to check profile status");
          console.error(error);
        }
      } finally {
        setCheckingExisting(false);
      }
    };

    checkExistingProfile();
  }, [address, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name) return toast.error("Name is required");

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACTS.PROFILE_MANAGER.address,
        CONTRACTS.PROFILE_MANAGER.abi,
        signer
      );

      // Check again before creating
      try {
        const profileData = await contract.getProfile(address);
        if (profileData.exists) {
          const role = profileData.role.toString() === "0" ? "freelancer" : "recruiter";
          return router.replace(`/dashboard/${role}`);
        }
      } catch (error) {
        // If error means no profile, allow creation
        if (!error?.data?.message?.includes("Profile does not exist")) {
          throw error; // rethrow other errors
        }
      }

      const tx = await contract.createProfile(
        profile.name,
        Number(profile.role),
        profile.role === 0
          ? ethers.parseUnits(profile.hourlyRate || "0", 0)
          : 0
      );

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        const newProfile = await contract.getProfile(address);
        const role = newProfile.role.toString() === "0" ? "freelancer" : "recruiter";
        router.replace(`/dashboard/${role}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.reason || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (checkingExisting) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <div className="animate-pulse text-gray-500">Checking profile status...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Your Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setProfile({ ...profile, role: 0 })}
            className={`flex-1 p-2 rounded ${profile.role === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Freelancer
          </button>
          <button
            type="button"
            onClick={() => setProfile({ ...profile, role: 1 })}
            className={`flex-1 p-2 rounded ${profile.role === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Recruiter
          </button>
        </div>

        {profile.role === 0 && (
          <input
            type="number"
            placeholder="Hourly Rate (optional)"
            value={profile.hourlyRate}
            onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
            className="w-full p-2 border rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
}
