import { NextResponse } from "next/server";
import { uploadImageToIPFS, sendJSONToIPFS } from "@/utils/pinata";

// Handle POST requests to /api/uploadToIPFS
export async function POST(req) {
  const contentType = req.headers.get("content-type");

  try {
    // Handle metadata (JSON)
    if (contentType.includes("application/json")) {
      const { metadata } = await req.json();
      const result = await sendJSONToIPFS(metadata);

      if (result.success) {
        return NextResponse.json({
          success: true,
          metadataURI: result.gatewayUrl,
          ipfsHash: result.ipfsHash,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }
    }

    // Handle image upload (FormData)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file found" },
          { status: 400 }
        );
      }

      // Convert Web API File -> Blob -> Buffer for Pinata
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const pinataResponse = await uploadImageToIPFS({
        buffer,
        filename: file.name,
      });

      if (pinataResponse.success) {
        const ipfsUrl = pinataResponse.ipfsUrl;
        const ipfsHash = ipfsUrl.split("/").pop(); // extract IPFS hash from URL

        return NextResponse.json({
          success: true,
          ipfsUrl,
          ipfsHash,
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    // Fallback for unsupported content types
    return NextResponse.json(
      { success: false, error: "Unsupported content type" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
