import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getImageData } from "@/lib/utils";
import { FormInputProps } from "@/types/form-types";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FieldValues, Path } from "react-hook-form";

export const FileInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  defaultValue,
}: FormInputProps<T>) => {
  const [preview, setPreview] = useState(defaultValue ? defaultValue : "");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const handleRemove = () => {
    setPreview("");
    setFileName("");
    setFileSize("");

    form.setValue(name, undefined as any);
    if (form.formState.errors[name as Path<T>]) {
      form.clearErrors(name as Path<T>);
    }
  };

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const { displayUrl, file, fileSize } =
                        getImageData(event);
                      setPreview(displayUrl);
                      setFileSize(fileSize);
                      if (file) setFileName(file.name);
                      onChange(file);
                    } else {
                      handleRemove();
                    }
                  }}
                  {...rest}
                  accept=".png,.jpg,.jpeg,.webp"
                />
              </FormControl>
              <FormDescription>{placeholder}</FormDescription>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
      {preview && (
        <div className="flex justify-between items-center mt-4 px-3 py-2 border rounded-md">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={preview} />
              <AvatarFallback>YT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h1 className="font-normal text-black text-sm">{fileName}</h1>
              <p className="text-gray-500 text-xs">{fileSize}</p>
            </div>
          </div>
          <div onClick={handleRemove}>
            <Cross1Icon className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};
