import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Work {
  title: string;
  image: string;
  description: string;
  link: string;
}

interface PreviousWorksProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const PreviousWorks: React.FC<PreviousWorksProps> = ({
  profileData,
  setProfileData,
}) => {
  const handleWorkChange = (index: number, field: string, value: string) => {
    const newWorks = profileData.previousWorks ?? [];
    newWorks[index] = { ...newWorks[index], [field]: value };
    setProfileData((prev) => ({ ...prev, previousWorks: newWorks }));
  };

  const addNewWork = () => {
    if ((profileData.previousWorks ?? []).length < 2) {
      const newWork: Work = {
        title: "",
        image: "/demos/thumbnail.jpg", // You should replace this with an actual placeholder image
        description: "",
        link: "",
      };
      setProfileData((prev) => ({
        ...prev,
        previousWorks: [...(prev.previousWorks ?? []), newWork],
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-xl">Previous Works:</h2>
        <Button
          onClick={addNewWork}
          disabled={(profileData.previousWorks?.length ?? 0) >= 2}
          variant="ghost"
          size="icon"
        >
          <Plus />
        </Button>
      </div>
      {(profileData.previousWorks ?? [])?.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-4 pt-0 w-full">
          <p>Add previous works to showcase your profile</p>
          <Image src="/demos/work.jpeg" alt="work" width={200} height={200} />
        </div>
      ) : (
        (profileData.previousWorks ?? []).map((work, index) => (
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
              <Image
                alt="Work Thumbnail"
                src={work.image}
                width={150}
                height={190}
                className="rounded-md w-[148px] h-[155px] object-cover"
              />
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
                  value={work.link}
                  onChange={(e) =>
                    handleWorkChange(index, "link", e.target.value)
                  }
                  placeholder="Link to your work"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
