import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface PreviousWorksProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const platformOptions = [
  "Default",
  "YouTube",
  "Google",
  "Figma",
  "Behance",
  "Dribbble",
  "GitHub",
  "CodePen",
  "Vimeo",
  "Medium",
  "DeviantArt",
];

export const PreviousWorks: React.FC<PreviousWorksProps> = ({
  profileData,
  setProfileData,
}) => {
  const handleWorkChange = (index: number, field: string, value: string) => {
    const newWorks = profileData.previousWork ?? [];
    newWorks[index] = { ...newWorks[index], [field]: value };
    setProfileData((prev) => ({ ...prev, previousWork: newWorks }));
  };

  const addNewWork = () => {
    if ((profileData.previousWork ?? []).length < 2) {
      const newWork: WorkWithoutIds = {
        title: "",
        description: "",
        url: "",
        platform: "",
      };
      setProfileData((prev) => ({
        ...prev,
        previousWork: [...(prev.previousWork ?? []), newWork],
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-xl">Previous Works:</h2>
        <Button
          onClick={addNewWork}
          disabled={(profileData.previousWork?.length ?? 0) >= 2}
          variant="ghost"
          size="icon"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {(profileData.previousWork ?? [])?.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-4 pt-0 w-full">
          <p className="text-gray-500">
            Add previous works to showcase your profile
          </p>
          <Image src="/demos/work.jpeg" alt="work" width={200} height={150} />
        </div>
      ) : (
        (profileData.previousWork ?? []).map((work, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-3 border-gray-400 p-4 border rounded-md w-full"
          >
            <Input
              value={work.title}
              onChange={(e) => handleWorkChange(index, "title", e.target.value)}
              className="font-semibold text-xl"
              placeholder="Title of your work"
            />
            <div className="flex items-start gap-3 w-full">
              <Select
                value={work.platform}
                onValueChange={(value) =>
                  handleWorkChange(index, "platform", value)
                }
              >
                <SelectTrigger className="w-[148px]">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((platform) => (
                    <SelectItem key={platform} value={platform.toLowerCase()}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-col flex-1 gap-2">
                <div>
                  <Textarea
                    value={work.description}
                    onChange={(e) =>
                      handleWorkChange(index, "description", e.target.value)
                    }
                    className={`resize-none ${
                      work.description.length > 200 ? "border-red-500" : ""
                    }`}
                    placeholder="Describe your work"
                    rows={3}
                  />
                  <div
                    className={`text-sm mt-1 ${
                      work.description.length > 200
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {work.description.length}/200 characters
                  </div>
                </div>
                <Input
                  value={work.url}
                  onChange={(e) =>
                    handleWorkChange(index, "url", e.target.value)
                  }
                  placeholder="Url to your work"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
