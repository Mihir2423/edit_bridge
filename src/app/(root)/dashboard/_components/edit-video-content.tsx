"use client";

import { FileInput } from "@/components/globals/file-input";
import { FormInput } from "@/components/globals/form-input";
import { FormTextArea } from "@/components/globals/form-textarea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type VideoContentProps = {
  title: string;
  description: string;
  preview: string;
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
  thumbnail: z.instanceof(File).optional(),
});

export const EditVideoContent = ({
  title,
  description,
  preview,
}: VideoContentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      thumbnail: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="title"
          label="Title"
          placeholder="Enter title"
        />
        <FormTextArea
          form={form}
          name="description"
          label="Description"
          placeholder="Write a description"
        />
        <FileInput
          form={form}
          name="thumbnail"
          label="Thumbnail"
          defaultValue={preview}
          placeholder="Upload a thumbnail"
        />
        <Button type="submit" className="flex items-center gap-2">
          Save <Save size={16} />
        </Button>
      </form>
    </Form>
  );
};
