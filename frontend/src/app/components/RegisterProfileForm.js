'use client';

import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import Select from "react-select";
import {CONTRACTS} from '@/context/constants';
import toast from "react-hot-toast";
import { ethers } from "ethers";
import {useRouter} from "next/navigation";

const skillOptions = [
  { value: "solidity", label: "Solidity" },
  { value: "design", label: "UI/UX Design" },
  { value: "writing", label: "Technical Writing" },
  { value: "frontend", label: "Frontend Dev" },
  { value: "marketing", label: "Marketing" },
  // Add more
];

export default function RegistrationForm() {
  const { address } = useAccount();

      



  const [role, setRole] = useState("freelancer");
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    hours: "",
    expertise: "",
    socials: "",
  });
  const [skills, setSkills] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadToIPFS = async (file, type = "image") => {
    const res = await fetch("/api/url");
    const { url } = await res.json();

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/json",
      },
      body: file,
    });

    const cid = new URL(url).pathname.split("/").pop();
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACTS.PROFILE_MANAGER.address, CONTRACTS.PROFILE_MANAGER.abi, signer);

      if (!address || !contract) throw new Error("Wallet or contract not ready");

      // Step 1: Upload image
      const imageUrl = await uploadToIPFS(imageFile, "image");

      // Step 2: Build metadata
      const metadata = {
        ...formData,
        role,
        skills: skills.map((s) => s.value),
        image: imageUrl,
        wallet: address,
        timestamp: new Date().toISOString(),
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });

      // Step 3: Upload metadata
      const metadataURI = await uploadToIPFS(metadataBlob, "json");

      // Step 4: Smart contract call
      const tx = await contract.registerProfile(formData.name, role, metadataURI);
      await tx.wait();

      toast.success("Profile registered successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Create Your Profile</h2>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="freelancer"
            checked={role === "freelancer"}
            onChange={() => setRole("freelancer")}
          />
          Freelancer
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="recruiter"
            checked={role === "recruiter"}
            onChange={() => setRole("recruiter")}
          />
          Recruiter
        </label>
      </div>

      <input
        name="name"
        placeholder="Name"
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        required
      />

      {role === "freelancer" && (
        <>
          <Select
            isMulti
            options={skillOptions}
            value={skills}
            onChange={setSkills}
            className="w-full"
            placeholder="Select skills"
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="hours"
            placeholder="Hours Available"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="expertise"
            placeholder="Area of Expertise"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </>
      )}

      <textarea
        name="bio"
        placeholder="Bio"
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="socials"
        placeholder="Socials (Twitter, GitHub, etc)"
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {preview && <img src={preview} alt="Preview" className="h-16 rounded" />}
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
