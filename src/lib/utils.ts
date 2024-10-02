import { clsx, type ClassValue } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  console.log("file", file);
  const displayUrl = file ? URL.createObjectURL(file) : "";
  const fileSize = file ? convertBytes(file.size) : "";
  return { displayUrl, file, fileSize };
}

export function convertBytes(bytes: number): string {
  const MB = 1048576;
  const GB = 1073741824;

  if (bytes >= GB) {
    return `${(bytes / GB).toFixed(2)} GB`;
  } else {
    return `${(bytes / MB).toFixed(2)} MB`;
  }
}

export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to view this content";

export const AuthenticationError = class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const isCharacterLimitExceeded = (profileData: ProfileData): boolean => {
  if (profileData.about.length > 300) return true;
  return profileData.previousWorks.some(
    (work) => work.description.length > 200
  );
};
