"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { isCharacterLimitExceeded } from "@/lib/utils";
import { ProfileHeader } from "./profile-header";
import { AboutSection } from "./about-section";
import { PreviousWorks } from "./previous-work";
import { SocialLinks } from "./social-links";

export const Profile = ({ data }: { data: User }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: data.name || "",
    about: data.bio || "",
    city: data.city || "",
    country: data.country || "",
    instagramUrl: "https://instagram.com/editor",
    twitterUrl: "https://twitter.com/editor",
    email: "editor@example.com",
    previousWorks: data.previousWorks || [],
  });

  const [profilePicture, setProfilePicture] = useState(
    data.image || "/demos/profile-pic.png"
  );

  const handleSave = () => {
    if (isCharacterLimitExceeded(profileData)) {
      toast.error("Character limit exceeded");
      return;
    }
    // Here you would typically send the data to your backend
    console.log("Saving editor data:", profileData);
    console.log("Profile picture:", profilePicture);
  };

  useEffect(() => {
    setProfileData({
      name: data.name || "",
      about: data.bio || "",
      city: data.city || "",
      country: data.country || "",
      instagramUrl: "https://instagram.com/editor",
      twitterUrl: "https://twitter.com/editor",
      email: "editor@example.com",
      previousWorks: data.previousWorks || [],
    });
    setProfilePicture(data.image || "/demos/profile-pic.png");
  }, [data]);

  return (
    <div className="mx-auto p-4 container">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Editor Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfileHeader
            profileData={profileData}
            setProfileData={setProfileData}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
          <AboutSection
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <PreviousWorks
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <SocialLinks
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <Button onClick={handleSave} className="w-28">
            <CheckCircle className="mr-2 w-4 h-4" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
