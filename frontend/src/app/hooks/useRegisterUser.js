// hooks/useRegisterUser.js

import { useCallback } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useContracts } from "@/context/ContractContext";
import toast from "react-hot-toast";

export const useRegisterUser = () => {
  const { address } = useAccount();
  const { profileContract } = useContracts();

  const {
    data: registerData,
    writeAsync: register,
    isLoading: isRegistering,
  } = useContractWrite({
    ...profileContract,
    functionName: "registerUser",
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: registerData?.hash,
    onSuccess() {
      toast.success("Registration successful!");
    },
    onError(error) {
      toast.error("Error waiting for confirmation");
      console.error(error);
    },
  });

  const registerUser = useCallback(
    async (role) => {
      if (!address || !role) return toast.error("Missing wallet or role");
      try {
        await register({ args: [role] });
      } catch (error) {
        toast.error("Registration failed");
        console.error(error);
      }
    },
    [address, register]
  );

  return {
    registerUser,
    isRegistering: isRegistering || isWaiting,
    isSuccess,
  };
};
