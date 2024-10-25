import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  defaultValue?: string;
};
