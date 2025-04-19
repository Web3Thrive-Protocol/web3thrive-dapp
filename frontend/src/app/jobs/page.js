'use client';
import { useState, useEffect } from "react";
import { usePublicClient } from "wagmi";
import { ethers } from "ethers";
import { CONTRACTS } from "@/context/constants";

export default function Jobs() {
  const provider = usePublicClient();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const contract = new ethers.Contract(
          CONTRACTS.ESCROW.address,
          CONTRACTS.ESCROW.abi,
          provider
        );

        const count = await contract.jobCounter;
        const jobLists = [];

        for (let i = 1; i <= count; i++) {
          const job = await contract.jobs(i);
          jobLists.push({ id: i, ...job });
        }

        setJobs(jobLists);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Jobs in Escrow</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow-sm">
              <p><strong>Job ID:</strong> {job.id}</p>
              <p><strong>Client:</strong> {job.client}</p>
              <p><strong>Freelancer:</strong> {job.freelancer}</p>
              <p><strong>Amount:</strong> {ethers.formatEther(job.amount)} ETH</p>
              <p><strong>Status:</strong> {
                ['Pending', 'Completed', 'Disputed', 'Released'][Number(job.status)]
              }</p>
              <p><strong>Deadline:</strong> {new Date(Number(job.deadline) * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
