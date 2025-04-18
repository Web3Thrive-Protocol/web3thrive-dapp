// contract address, ABI

import EscrowABI from "../../../../artifacts/contracts/Escrow.sol/Escrow.json";
import LearningModuleABI from "../../../../artifacts/contracts/LearningModule.sol/LearningModule.json";
import ProfileManagerABI from "../../../../artifacts/contracts/ProfileManager.sol/ProfileManager.json";
import ReputationABI from "../../../../artifacts/contracts/Reputation.sol/Reputation.json";

export const CONTRACTS = {
  ESCROW: {
    address: "0xC32D7d91D9577b95356b160495C218D43F6e3859",
    abi: EscrowABI.abi,
  },
  LEARNING_MODULE: {
    address: "0x18E579B1Cd6D6622CfA3709477567af13049440e",
    abi: LearningModuleABI.abi,
  },
  PROFILE_MANAGER: {
    address: "0x3EE46cAF305e01D027630eAC04b6F92Ed612331d",
    abi: ProfileManagerABI.abi,
  },
  REPUTATION: {
    address: "0x930d9e87cC0e4705dD75961Cbbb666E9833EfC7f",
    abi: ReputationABI.abi,
  },
};
