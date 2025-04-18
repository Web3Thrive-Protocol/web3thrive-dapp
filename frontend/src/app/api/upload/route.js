import { NextResponse } from "next/server";
import {pinata} from "@/utils/pinataConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { url } = await pinata.upload.public.createSignedURL({
      expires: 600, // 10 minutes
      metadata: {
        name: "profile-upload",
        keyvalues: {
          type: "web3-profile"
        }
      }
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Pinata API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}




// import { NextResponse } from "next/server";
// import { pinata } from "@/utils/pinataConfig";

// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     const url = await pinata.upload.public.createSignedURL({
//       expires: 30,
//     });
//     return NextResponse.json({ url }, { status: 200 });
//   } catch (error) {
//     console.error("Error generating signed URL:", error);
//     return NextResponse.json({ error: "Server Error" }, { status: 500 });
//   }
// }
