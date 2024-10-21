"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { Loader2, Terminal, Upload, Video, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { createVideoAction } from "../actions";

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

async function initiateUpload(files: FileData[]): Promise<UploadResponse[]> {
  const options = {
    method: "POST",
    url: "https://api.uploadthing.com/v6/uploadFiles",
    headers: {
      "Content-Type": "application/json",
      "X-Uploadthing-Api-Key": process.env.NEXT_PUBLIC_UPLOADTHING_API_KEY,
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
async function uploadFiles(files: File[]) {
  const fileData = files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));

  const uploadResponses = await initiateUpload(fileData);

  const uploadPromises = files.map((file, index) =>
    uploadFile(file, uploadResponses[index])
  );

  await Promise.all(uploadPromises);
  
  return uploadResponses.map((res) => res.fileUrl);
}

const videoUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.instanceof(File).nullable(),
  video: z.instanceof(File).nullable(),
  createdForId: z.string().min(1, "User selection is required"),
});

type VideoUploadFormProps = {
  creators: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  }[];
};

export const VideoUploadForm = ({ creators }: VideoUploadFormProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof videoUploadSchema>>({
    resolver: zodResolver(videoUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: null,
      video: null,
      createdForId: "",
    },
  });

  const { execute, isPending, isSuccess, error } =
    useServerAction(createVideoAction);

  const onSubmit = async (values: z.infer<typeof videoUploadSchema>) => {
    if (!thumbnail || !video) {
      console.error("Missing thumbnail or video");
      return;
    }

    try {
      // First, upload the files and get their URLs
      setUploading(true);
      const [thumbnailUrl, videoUrl] = await uploadFiles([thumbnail, video]);

      await execute({
        title: values.title,
        description: values.description,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        createdForId: values.createdForId,
      });
    } catch (uploadError) {
      console.error("Upload failed:", uploadError);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Upload Video</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter video description"
                      className="h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </FormItem>

            <FormItem>
              <FormLabel>Video</FormLabel>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="createdForId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {creators.map((creator) => (
                        <SelectItem key={creator.id} value={creator.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={creator.image || undefined} />
                              <AvatarFallback className="p-1 text-xs">
                                {creator.name?.[0] || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span>{creator.name || creator.email}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || uploading}>
              {isPending || uploading ? (
                <>
                  Uploading...
                  <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {isSuccess && (
        <Alert variant="default" className="mt-4">
          <Terminal className="w-4 h-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Video uploaded successfully!</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <Terminal className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
};
