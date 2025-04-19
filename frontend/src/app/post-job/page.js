'use client';
import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import {CONTRACTS} from "@/context/constants";
import toast from "react-hot-toast";
import { ethers } from "ethers";


export default function PostJob(){
  const {address} = useAccount();
  const {data: signer} = useSigner();

  const [freelancer, setFreelancer] = useState("");
  const [deadline, setDeadline] = useState(""); // in seconds
  const [amount, setAmount]  = useState("");
  const [posting, setPosting] = useState("");


  const handleCreateJob = async () => {
    if(!signer || !freelancer || !deadline || !amount) return;

    setPosting(true);
    try{
      const contract = new ethers.Contract(
        CONTRACTS.ESCROW.address,
        CONTRACTS.ESCROW.abi,
        signer
      );
      const tx = await contract.createJob(freelancer, deadline, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert('Job created and escrow funded!');
      setFreelancer('');
      setDeadline('');
      setAmount('');
    } catch(err){
      console.error(err);
      toast.error("Failed to create job");
    } finally {
      setPosting(false);
    }
  };

  return(
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Job & Fund Escrow</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Freelancer Address"
        value={freelancer}
        onChange={(e) => setFreelancer(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-3"
        type="number"
        placeholder="Deadline (in seconds)"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-3"
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleCreateJob}
        disabled={posting}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {posting ? 'Creating...' : 'Create Job'}
      </button>
    </div>
  );
}




// "use client";
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Briefcase, Tag, MapPin, DollarSign, Clipboard } from "lucide-react";

// const jobCategories = [
//   { value: "developer", label: "Developer" },
//   { value: "designer", label: "Designer" },
//   { value: "marketing", label: "Marketing" },
//   { value: "management", label: "Management" },
// ];

// export default function PostJobPage() {
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       category: "",
//       skills: "",
//       location: "",
//       budget: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       // TODO: replace with your API call
//       await fetch("/api/jobs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       reset();
//       alert("Job posted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to post job");
//     }
//   };

//   return (
//     <main className="mt-10 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
//       <h1 className="text-2xl font-bold mb-6">Post a Job</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Job Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Job Title
//           </label>
//           <div className="relative">
//             <Briefcase className="absolute top-3 left-3 text-gray-400" size={20} />
//             <input
//               {...register("title", { required: "Title is required" })}
//               type="text"
//               placeholder="e.g. Senior React Developer"
//               className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.title ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
//               }`}
//             />
//           </div>
//           {errors.title && (
//             <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <div className="relative">
//             <Clipboard className="absolute top-3 left-3 text-gray-400" size={20} />
//             <textarea
//               {...register("description", { required: "Description is required" })}
//               placeholder="Describe the role, responsibilities, and requirements"
//               rows={5}
//               className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.description ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
//               }`}
//             />
//           </div>
//           {errors.description && (
//             <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
//           )}
//         </div>

//         {/* Category & Skills */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <Controller
//               control={control}
//               name="category"
//               rules={{ required: "Category is required" }}
//               render={({ field }) => (
//                 <div className="relative">
//                   <Tag className="absolute top-3 left-3 text-gray-400" size={20} />
//                   <select
//                     {...field}
//                     className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                       errors.category ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
//                     }`}
//                   >
//                     <option value="" disabled>
//                       Select category
//                     </option>
//                     {jobCategories.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//             />
//             {errors.category && (
//               <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Required Skills
//             </label>
//             <div className="relative">
//               <Tag className="absolute top-3 left-3 text-gray-400" size={20} />
//               <input
//                 {...register("skills", { required: "At least one skill is required" })}
//                 type="text"
//                 placeholder="e.g. React, Node.js, Solidity"
//                 className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.skills ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
//                 }`}
//               />
//             </div>
//             {errors.skills && (
//               <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Location & Budget */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <div className="relative">
//               <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
//               <input
//                 {...register("location", { required: "Location is required" })}
//                 type="text"
//                 placeholder="e.g. Remote, Accra, Lagos"
//                 className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.location ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
//                 }`}
//               />
//             </div>
//             {errors.location && (
//               <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Budget (USD)
//             </label>
//             <div className="relative">
//               <DollarSign className="absolute top-3 left-3 text-gray-400" size={20} />
//               <input
//                 {...register("budget", {
//                   required: "Budget is required",
//                   pattern: {
//                     value: /^\d+$/,
//                     message: "Must be a number",
//                   },
//                 })}
//                 type="text"
//                 placeholder="e.g. 5000"
//                 className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.budget ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
//                 }`}
//               />
//             </div>
//             {errors.budget && (
//               <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="pt-4 border-t">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full flex justify-center items-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             Post Job
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// }