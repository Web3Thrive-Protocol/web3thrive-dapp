import {getPublicClient, getWalletClient} from "@wagmi/core";
import {CONTRACTS} from "@/context/constants";
import {ethers} from "ethers";


export async function registerProfile(name, role, metadataURI) {
    const walletClient = await getWalletClient();
    const signer = new ethers.BrowserProvider(walletClient).getSigner();
    const contract = new ethers.Contract(CONTRACTS.PROFILE_MANAGER.address, CONTRACTS.PROFILE_MANAGER.abi, signer);

    const tx = await contract.registerProfile(name, role, metadataURI);
    return await tx.wait();
}

export async function updateProfile(metadataURI){
    const walletClient = await getWalletClient();
    const signer = new ethers.BrowserProvider(walletClient).getSigner();
    const contract = new ethers.Contract(CONTRACTS.PROFILE_MANAGER.address, CONTRACTS.PROFILE_MANAGER.abi, signer);

    const tx = await contract.updateProfile(metadataURI);
    return await tx.wait();
}


// Returns an ethers.Contract instance bound to either a provider or signer
export async function getProfileContract(providerOrSigner) {
    return new ethers.Contract(
      CONTRACTS.PROFILE_MANAGER.address,
      CONTRACTS.PROFILE_MANAGER.abi,
      providerOrSigner
    );
  }
  
  // Get a profile by address
  export async function getProfile(provider, userAddress) {
    const contract = await getProfileContract(provider);
  
    try {
      const profile = await contract.profiles(userAddress);
  
      return {
        name: profile.name,
        role: profile.role,
        metadataURI: profile.metadataURI,
        exists: profile.exists,
      };
    } catch (err) {
      console.error("Contract read failed. Debug info:");
      console.error("Address:", CONTRACTS.PROFILE_MANAGER.address);
      console.error("ABI has 'profiles'?:", CONTRACTS.PROFILE_MANAGER.abi.some(item => item.name === "profiles"));
      console.error("User address:", userAddress);
      throw err;
    }
  }
  