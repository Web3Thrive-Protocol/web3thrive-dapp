"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { CONTRACTS } from "@/context/constants";

export default function ProfileSection() {
  const { address, isConnected } = useAccount()
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    if (!address) return;
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACTS.PROFILE_MANAGER.address,
        CONTRACTS.PROFILE_MANAGER.abi,
        signer
      );
  
      const rawProfile = await contract.profiles(address);
      if (!rawProfile.exists) return;
  
      const ipfsToHttp = (uri) =>
        uri.startsWith("ipfs://")
          ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${uri.slice(7)}`
          : uri;
  
      const metadataResponse = await fetch(ipfsToHttp(rawProfile.metadataURI));
      const metadata = await metadataResponse.json();

      console.log("Address:", address);
      console.log("Raw profile:", rawProfile);
      console.log("Metadata URI:", rawProfile.metadataURI);
      console.log("Fetch URL:", ipfsToHttp(rawProfile.metadataURI));

  
      setProfile({
        name: rawProfile.name,
        role: rawProfile.role,
        ...metadata,
      });
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };
  
  // useEffect(() => {
  //   console.log("ProfileSection mounted. Address:", address);
  //   fetchProfile();
  // }, [address]);
  
  useEffect(() => {
    if (isConnected && address) {
      console.log("ProfileSection mounted. Address:", address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    fetchProfile();
  }, [address]);

  if (!profile) return <p>Loading profile...</p>;
  return (
    <>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
        <div className="flex gap-6">
          <img
            src={profile.image}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Role:</strong> {profile.role}
            </p>
            <p>
              <strong>Bio:</strong> {profile.bio}
            </p>
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
            <p>
              <strong>Expertise:</strong> {profile.expertise}
            </p>
            <p>
              <strong>Skills:</strong> {profile.skills?.join(", ")}
            </p>
            <p>
              <strong>Socials:</strong> {profile.socials}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
