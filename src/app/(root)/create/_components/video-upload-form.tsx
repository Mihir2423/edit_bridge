"use client";

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { Upload, Video, X } from "lucide-react";
import { useState } from "react";
type Props = {
  creators: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  }[];
};

type Response = {
  data: UploadResponse[];
};

type UploadResponse = {
  url: string;
  fields: Record<string, string>;
  key: string;
  fileUrl: string;
  // Add other properties as needed
};

export const VideoUploadForm = ({ creators }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [uploadStatus, setUploadStatus] = useState<string>("");

  async function initiateUpload(files: File[]) {
    const fileData = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    const options = {
      method: "POST",
      url: "https://api.uploadthing.com/v6/uploadFiles",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": process.env.NEXT_PUBLIC_UPLOADTHING_API_KEY,
      },
      data: JSON.stringify({
        files: fileData,
        acl: "public-read",
        contentDisposition: "inline",
      }),
    };

    const { data } = await axios.request(options);
    console.log("Initiate upload response:", data); // Log the entire response
    return data as Response;
  }

  async function uploadFile(file: File, uploadData: UploadResponse) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadStatus("Initiating upload...");

    const filesToUpload = [thumbnail, video].filter(
      (file): file is File => file !== null
    );

    if (filesToUpload.length === 0) {
      setUploadStatus("Error: No files selected for upload");
      return;
    }

    try {
      // Step 1: Initiate the upload
      const Responses = await initiateUpload(filesToUpload);
      console.log("Upload initiated:", Responses);
      const uploadResponses = Responses.data;
      if (!Array.isArray(uploadResponses)) {
        throw new Error("Unexpected response format from initiate upload");
      }

      // Step 2: Upload each file
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        const uploadData = uploadResponses[i];

        if (!uploadData) {
          throw new Error(`No upload data received for file ${file.name}`);
        }

        setUploadStatus(`Uploading ${file.name}...`);
        await uploadFile(file, uploadData);
        console.log(
          `${file.name} uploaded successfully to ${uploadData.fileUrl || "unknown location"}`
        );
      }

      setUploadStatus("All files uploaded successfully!");
      console.log("Upload process completed");
      // Handle successful upload here (e.g., save video details to your backend)
    } catch (error) {
      console.error("Error during upload process:", error);
      setUploadStatus(
        `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Upload Video</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-20 resize-none"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                required
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="video">Video</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                required
              />
              <Button type="button" variant="outline" size="icon">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Select onValueChange={setSelectedUser} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(creators) && creators.length > 0 ? (
                  creators.map((creator) => {
                    return (
                      <SelectItem
                        key={creator.id}
                        value={creator.id}
                        className="p-0"
                      >
                        <div className="flex items-center gap-2 p-0">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={creator?.image as string} />
                            <AvatarFallback className="p-1 text-xs">
                              CR
                            </AvatarFallback>
                          </Avatar>
                          <h1>{creator.name || creator.email}</h1>
                        </div>
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem value="no-creators" disabled>
                    No creators found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button type="submit">Upload</Button>
          {uploadStatus && (
            <div className="font-medium text-gray-500 text-sm">
              {uploadStatus}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
