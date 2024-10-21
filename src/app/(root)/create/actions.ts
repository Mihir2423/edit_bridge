"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import axios from "axios";
import { assertAuthenticated } from "@/lib/session";

// Define types
type FileData = {
  name: string;
  size: number;
  type: string;
};

type UploadResponse = {
  url: string;
  fields: Record<string, string>;
  key: string;
  fileUrl: string;
};

// Helper functions
async function initiateUpload(files: FileData[]): Promise<UploadResponse[]> {
  const options = {
    method: "POST",
    url: "https://api.uploadthing.com/v6/uploadFiles",
    headers: {
      "Content-Type": "application/json",
      "X-Uploadthing-Api-Key": process.env.UPLOADTHING_API_KEY,
    },
    data: JSON.stringify({
      files,
      acl: "public-read",
      contentDisposition: "inline",
    }),
  };

  const { data } = await axios.request(options);
  return data.data;
}

async function uploadFile(
  file: File,
  uploadData: UploadResponse
): Promise<void> {
  if (!uploadData.url || !uploadData.fields) {
    throw new Error(`Invalid upload data for file ${file.name}`);
  }

  const formData = new FormData();
  Object.entries(uploadData.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);

  const options = {
    method: "POST",
    url: uploadData.url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  await axios.request(options);
}

// Server action
export const createVideoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      thumbnail: z.string(),
      video: z.string(),
      createdForId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await assertAuthenticated();
    console.log("Handling request", input);
    revalidatePath('/dashboard');
  });
