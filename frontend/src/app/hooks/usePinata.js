import { useState } from 'react';

export default function usePinata() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file, metadata = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Get upload URL
      const res = await fetch('/api/url');
      if (!res.ok) throw new Error('Failed to get upload URL');
      const { url: uploadUrl } = await res.json();

      // Upload file
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'x-pinata-name': metadata.name || file.name,
          'x-pinata-meta-json': JSON.stringify(metadata)
        },
        body: file
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.statusText}`);
      }

      // Get CID from headers
      const cid = uploadRes.headers.get('x-pinata-cid');
      if (!cid) throw new Error('CID not found in response');

      return {
        cid,
        url: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`,
        metadataUrl: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}/metadata.json`
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadMetadata = async (metadata) => {
    const blob = new Blob([JSON.stringify(metadata)], {
      type: 'application/json'
    });
    
    return uploadFile(blob, {
      name: 'metadata.json',
      contentType: 'application/json'
    });
  };

  return { uploadFile, uploadMetadata, loading, error };
}