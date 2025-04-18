export const fetchFromIPFS = async (cid, path = '') => {
  try {
    const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}${path}`;
    const res = await fetch(url);
    
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    
    const contentType = res.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return await res.json();
    }
    
    if (contentType?.includes('image')) {
      return URL.createObjectURL(await res.blob());
    }
    
    return await res.text();
  } catch (error) {
    console.error('IPFS Fetch Error:', error);
    throw error;
  }
};




// import axios from "axios";
// import FormData from "form-data"; // Server-side FormData for Pinata


// import {
//     apiKey,
//     apiSecret,
//     gatewayToken,
//     readHeader,
//     getHeader,
//     ipfsGateway,
//     sendJSONheader
// } from "@/utils/pinataConfig";



// // Helper: get human‑readable date and unix timestamp
// function getDate() {
//     const now = new Date();
//     const dateValue = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
//     const time = Math.floor(now.getTime() / 1000);
//     return { dateValue, time };
//   }
  
//   /**
//    * 1) sendJSONToIPFS
//    *    - pins your metadata object
//    *    - returns { success, ipfsHash, gatewayUrl }
//    */
//   export async function sendJSONToIPFS(metadata) {
//     try {
//       const { dateValue, time } = getDate();
//       const payload = {
//         ...metadata,
//         createdAt: dateValue,
//         timestamp: time,
//       };
  
//       const res = await axios.post(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         payload,
//         sendJSONheader
//       );
  
//       const ipfsHash = res.data.IpfsHash;
//       return {
//         success: true,
//         ipfsHash,
//         gatewayUrl: `https://${ipfsGateway}.mypinata.cloud/ipfs/${ipfsHash}`,
//       };
//     } catch (err) {
//       // console.error("Pinata pinJSONToIPFS error:", {
//       //   error: err,
//       //   message: err.message,
//       //   responseData: err.response?.data,
//       //   status: err.response?.status,
//       // });
  
//       // return {
//       //   success: false,
//       //   error: err.message || "Unknown error",
//       console.error("Pinata pinJSONToIPFS raw error:", err);
//     }
//   } 
//   /**
//    * 2) fetchJSONFromIPFS
//    *    - reads JSON back from IPFS via public gateway
//    */
//   export async function fetchJSONFromIPFS(cid) {
//     try {
//       const url = `https://${ipfsGateway}.mypinata.cloud/ipfs/${cid}`;
//       const res = await axios.get(url);
//       return { success: true, data: res.data };
//     } catch (err) {
//       console.error("Pinata fetch error:", err.message);
//       return { success: false, error: err.message };
//     }
//   }
  
//   /**
//    * 3) updateJSONOnIPFS
//    *    - creates a new version of your metadata,
//    *      linking to the previous CID if you want
//    */
//   export async function updateJSONOnIPFS(newMetadata, previousCid = null) {
//     try {
//       const { dateValue, time } = getDate();
//       const payload = {
//         ...newMetadata,
//         updatedAt: dateValue,
//         updatedTimestamp: time,
//         previousVersion: previousCid,
//       };
  
//       const res = await axios.post(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         payload,
//         sendJSONheader
//       );
  
//       const ipfsHash = res.data.IpfsHash;
//       return {
//         success: true,
//         newIpfsHash: ipfsHash,
//         gatewayUrl: `https://${ipfsGateway}.mypinata.cloud/ipfs/${ipfsHash}`,
//       };
//     } catch (err) {
//       console.error("Pinata update error:", err.response?.data || err.message);
//       return { success: false, error: err.response?.data?.error || err.message };
//     }
//   }


//   export async function uploadImageToIPFS({ buffer, filename }) {
//     const formData = new FormData();
//     formData.append("file", buffer, filename);
  
//     try {
//       const res = await axios.post(
//         "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         formData,
//         {
//           maxBodyLength: "Infinity",
//           headers: {
//             ...formData.getHeaders(),
//             pinata_api_key: apiKey,
//             pinata_secret_api_key: apiSecret,
//           },
//         }
//       );
  
//       const ipfsHash = res.data.IpfsHash;
//       return {
//         success: true,
//         ipfsUrl: `https://${ipfsGateway}.mypinata.cloud/ipfs/${ipfsHash}`,
//       };
//     } catch (err) {
//       console.error("Image upload error:", err.message);
//       return { success: false, error: err.message };
//     }
//   }


