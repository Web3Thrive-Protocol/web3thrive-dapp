'use client';
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { CONTRACTS } from "@/context/constants";

export default function FreelancerDashboard() {
  const { address } = useAccount();
  const [jobs, setJobs] = useState([]);

  // Load Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (!window.ethereum || !address) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACTS.ESCROW.address,
        CONTRACTS.ESCROW.abi,
        provider
      );

      const count = await contract.jobCounter;
      const jobList = [];

      for (let i = 1; i <= count; i++) {
        const job = await contract.jobs(i);
        if (job.freelancer.toLowerCase() === address.toLowerCase()) {
          jobList.push({ id: i, ...job });
        }
      }

      setJobs(jobList);
    };

    fetchJobs();
  }, [address]);

  // Dispute Job
  const disputeJob = async (id) => {
    if (!window.ethereum) return alert("Wallet not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACTS.ESCROW.address,
      CONTRACTS.ESCROW.abi,
      signer
    );

    try {
      const tx = await contract.disputeJob(id);
      await tx.wait();
      alert("Job disputed!");
    } catch (err) {
      console.error("Dispute failed", err);
      alert("Dispute failed. See console.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Freelancer Jobs</h2>
      {jobs.length === 0 && <p>No jobs assigned.</p>}
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded mb-3">
          <p><strong>Job ID:</strong> {job.id}</p>
          <p><strong>Client:</strong> {job.client}</p>
          <p><strong>Amount:</strong> {ethers.formatEther(job.amount)} ETH</p>
          <p><strong>Status:</strong> {
            ['Pending', 'Completed', 'Disputed', 'Released'][Number(job.status)]
          }</p>
          {Number(job.status) === 0 && (
            <button
              onClick={() => disputeJob(job.id)}
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Dispute
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
