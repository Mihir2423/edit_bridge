"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Editor Name",
    about:
      "This is a brief description of the editor. It provides context about their skills and experience.",
    city: "New York",
    country: "USA",
    instagramUrl: "https://instagram.com/editor",
    twitterUrl: "https://twitter.com/editor",
    email: "editor@example.com",
    previousWorks: [
      {
        title: "Work 1",
        image: "/demos/thumbnail.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quam voluptates, et necessitatibus.",
        link: "https://example.com/work1",
      },
      {
        title: "Work 2",
        image: "/demos/thumbnail.jpg",
        description:
          "Qui harum, non mollitia ab commodi dolorum quis cupiditate dolores.",
        link: "https://example.com/work2",
      },
    ],
  });

  const [profilePicture, setProfilePicture] = useState(
    "/demos/profile-pic.png"
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setProfilePicture(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleWorkDescriptionChange = (index: number, value: string) => {
    const newWorks = [...profileData.previousWorks];
    newWorks[index].description = value;
    setProfileData((prev) => ({
      ...prev,
      previousWorks: newWorks,
    }));
  };

  const isCharacterLimitExceeded = () => {
    if (profileData.about.length > 300) return true;
    return profileData.previousWorks.some(
      (work) => work.description.length > 200
    );
  };

  const handleSave = () => {
    if (isCharacterLimitExceeded()) {
      console.log("I a, here");

      toast.error("Character limit exceeded");
      return;
    }
    // Here you would typically send the data to your backend
    console.log("Saving editor data:", profileData);
    console.log("Profile picture:", profilePicture);
  };

  return (
    <div className="mx-auto p-4 container">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Editor Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative border-[3px] border-black rounded-full w-32 h-32">
              <Image
                src={profilePicture}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              <Label
                htmlFor="picture"
                className="right-0 bottom-0 absolute bg-primary p-2 rounded-full text-primary-foreground cursor-pointer"
              >
                <Upload size={16} />
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
              />
              <div className="flex space-x-2">
                <Input
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
                <Input
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="about">About:</Label>
            <Textarea
              id="about"
              name="about"
              value={profileData.about}
              onChange={handleInputChange}
              className={`resize-none ${profileData.about.length > 300 ? "border-red-500" : ""}`}
              placeholder="Write a brief description about yourself"
              rows={4}
            />
            <div
              className={`text-sm mt-1 ${profileData.about.length > 300 ? "text-red-500" : "text-gray-500"}`}
            >
              {profileData.about.length}/300 characters
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Previous Works:</h2>
            {profileData.previousWorks.map((work, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 border-gray-400 p-4 border rounded-md w-full"
              >
                <Input
                  value={work.title}
                  onChange={(e) => {
                    const newWorks = [...profileData.previousWorks];
                    newWorks[index].title = e.target.value;
                    setProfileData((prev) => ({
                      ...prev,
                      previousWorks: newWorks,
                    }));
                  }}
                  className="font-semibold text-xl"
                  placeholder="Title of your work"
                />
                <div className="flex items-start gap-3 w-full">
                  <Image
                    alt="Work Thumbnail"
                    src={work.image}
                    width={150}
                    height={190}
                    className="rounded-md w-[148px] h-[155px]"
                  />
                  <div className="flex flex-col flex-1 gap-2">
                    <div>
                      <Textarea
                        value={work.description}
                        onChange={(e) =>
                          handleWorkDescriptionChange(index, e.target.value)
                        }
                        className={`resize-none ${work.description.length > 200 ? "border-red-500" : ""}`}
                        placeholder="Describe your work"
                        rows={3}
                      />
                      <div
                        className={`text-sm mt-1 ${work.description.length > 200 ? "text-red-500" : "text-gray-500"}`}
                      >
                        {work.description.length}/200 characters
                      </div>
                    </div>
                    <Input
                      value={work.link}
                      onChange={(e) => {
                        const newWorks = [...profileData.previousWorks];
                        newWorks[index].link = e.target.value;
                        setProfileData((prev) => ({
                          ...prev,
                          previousWorks: newWorks,
                        }));
                      }}
                      placeholder="Link to your work"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Input
              value={profileData.instagramUrl}
              onChange={handleInputChange}
              name="instagramUrl"
              placeholder="Instagram URL"
              className="w-40"
            />
            <Input
              value={profileData.twitterUrl}
              onChange={handleInputChange}
              name="twitterUrl"
              placeholder="Twitter URL"
              className="w-40"
            />
            <Input
              value={profileData.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Email"
              className="w-40"
            />
          </div>
          <Button onClick={handleSave} className="w-28">
            <CheckCircle className="mr-2 w-4 h-4" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
