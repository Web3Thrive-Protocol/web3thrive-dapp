'use client';
import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import {CONTRACTS} from "@/context/constants";


export default function RecruiterDashboard() {
  const { address } = useAccount();
  const provider = usePublicClient();
  const { data: signer } = useSigner();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const contract = new ethers.Contract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI, provider);
      const count = await contract.jobCounter();
      const jobList = [];

      for (let i = 1; i <= count; i++) {
        const job = await contract.jobs(i);
        if (job.client.toLowerCase() === address.toLowerCase()) {
          jobList.push({ id: i, ...job });
        }
      }

      setJobs(jobList);
    };

    if (address) fetchJobs();
  }, [address]);


  const completeJob = async (id) => {
    const contract = new ethers.Contract(CONTRACTS.ESCROW.address, CONTRACTS.ESCROW.abi, signer);
    const tx = await contract.completeJob(id);
    await tx.wait();
    alert('Job marked as complete!');
  };

  const releaseFunds = async (id) => {
    const contract = new ethers.Contract(CONTRACTS.ESCROW.address, CONTRACTS.ESCROW.abi, signer);
    const tx = await contract.releaseFunds(id);
    await tx.wait();
    alert('Funds released!');
  };

    return (
      <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recruiter Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded mb-3">
          <p><strong>Job ID:</strong> {job.id}</p>
          <p><strong>Freelancer:</strong> {job.freelancer}</p>
          <p><strong>Amount:</strong> {ethers.utils.formatEther(job.amount)} ETH</p>
          <p><strong>Status:</strong> {Object.keys({ 0: 'Pending', 1: 'Completed', 2: 'Disputed', 3: 'Released' })[job.status]}</p>
          {job.status === 0 && (
            <button onClick={() => completeJob(job.id)} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded mr-2">
              Complete
            </button>
          )}
          {(job.status === 1 || (Date.now() / 1000) > job.deadline) && (
            <button onClick={() => releaseFunds(job.id)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
              Release Funds
            </button>
          )}
        </div>
      ))}
    </div>
    );
  }