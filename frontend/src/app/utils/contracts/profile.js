import { getWalletClient } from "@wagmi/core";
import { CONTRACTS } from "@/context/constants";
import { ethers } from "ethers";

export async function registerProfile(name, roleType, hourlyRate) {
  try {
    const walletClient = await getWalletClient();
    const provider = new ethers.BrowserProvider(walletClient);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACTS.PROFILE_MANAGER.address,
      CONTRACTS.PROFILE_MANAGER.abi,
      signer
    );

    const tx = await contract.createProfile(name, roleType, hourlyRate);
    return await tx.wait();
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function updateProfile(name, roleType, hourlyRate) {
  try {
    const walletClient = await getWalletClient();
    const provider = new ethers.BrowserProvider(walletClient);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACTS.PROFILE_MANAGER.address,
      CONTRACTS.PROFILE_MANAGER.abi,
      signer
    );

    const tx = await contract.updateProfile(name, roleType, hourlyRate);
    return await tx.wait();
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

export async function getProfileContract(providerOrSigner) {
  return new ethers.Contract(
    CONTRACTS.PROFILE_MANAGER.address,
    CONTRACTS.PROFILE_MANAGER.abi,
    providerOrSigner
  );
}

export async function getProfile(provider, userAddress) {
  try {
    const contract = await getProfileContract(provider);
    const profile = await contract.getProfile(userAddress);
    const roleString = await contract.roleTypeToString(profile.roleType);

    return {
      name: profile.name,
      roleType: roleString,
      hourlyRate: profile.hourlyRate.toString(),
      exists: profile.exists,
    };
  } catch (error) {
    console.error("Profile fetch failed:", {
      address: CONTRACTS.PROFILE_MANAGER.address,
      userAddress,
      error
    });
    throw error;
  }
}