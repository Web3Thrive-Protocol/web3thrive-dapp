"use client";

import React, { createContext, useContext } from "react";
import { useContract } from "wagmi";
import { CONTRACTS } from "@/context/constants"

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const escrowContract = useContract(CONTRACTS.ESCROW);
  const profileContract = useContract(CONTRACTS.PROFILE_MANAGER);
  const learningContract = useContract(CONTRACTS.LEARNING_MODULE);
  const reputationContract = useContract(CONTRACTS.REPUTATION);

  return (
    <ContractContext.Provider
      value={{
        escrowContract,
        profileContract,
        learningContract,
        reputationContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => useContext(ContractContext);
