import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface ProfileHeaderProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  profilePicture: string | undefined;
  setProfilePicture: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  setProfileData,
  profilePicture,
  setProfilePicture,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="flex items-center space-x-4">
      <div className="relative border-[3px] border-black rounded-full w-32 h-32">
        <Image
          src={profilePicture || "/demos/profile-pic.png"}
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
  );
};
