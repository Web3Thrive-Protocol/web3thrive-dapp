import { ethers } from "ethers";

export function getProvider() {
    if (typeof window !== "undefined" && window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
      }
      return null; 
}

export async function getSigner() {
    const provider = getProvider();
    if (!provider) {
      throw new Error("No provider available. Connect your wallet.");
    }
  
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  }
  
