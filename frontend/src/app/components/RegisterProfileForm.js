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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name) return toast.error("Name required");
  
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACTS.PROFILE_MANAGER.address,
        CONTRACTS.PROFILE_MANAGER.abi,
        signer
      );
  
      // Check existing profile using string comparison
      const existingProfile = await contract.getProfile(address);
      if (existingProfile.exists) {
        router.push(existingProfile.role === "freelancer" 
          ? "/dashboard/freelancer" 
          : "/dashboard/recruiter");
        return;
      }
  
      // Convert UI role to contract's enum index
      const contractRole = profile.role === 0 
        ? 0 // Freelancer
        : 1; // Recruiter
  
      const tx = await contract.createProfile(
        profile.name,
        contractRole,
        profile.hourlyRate || 0
      );
      
      await tx.wait();
      
      // Verify the actual stored role using string comparison
      const newProfile = await contract.getProfile(address);
      router.push(newProfile.role === "freelancer" 
        ? "/dashboard/freelancer" 
        : "/dashboard/recruiter");
  
    } catch (err) {
      if (err.message.includes("Profile already exists")) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACTS.PROFILE_MANAGER.address,
          CONTRACTS.PROFILE_MANAGER.abi,
          provider
        );
        const existing = await contract.getProfile(address);
        router.push(existing.role === "freelancer" 
          ? "/dashboard/freelancer" 
          : "/dashboard/recruiter");
        return;
      }
      toast.error(err.reason || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


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
            className={`flex-1 p-2 rounded ${
              profile.role === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Freelancer
          </button>
          <button
            type="button"
            onClick={() => setProfile({ ...profile, role: 1 })}
            className={`flex-1 p-2 rounded ${
              profile.role === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
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