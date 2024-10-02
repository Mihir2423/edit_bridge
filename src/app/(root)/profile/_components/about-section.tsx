import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AboutSectionProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profileData,
  setProfileData,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
        className={`text-sm mt-1 ${
          profileData.about.length > 300 ? "text-red-500" : "text-gray-500"
        }`}
      >
        {profileData.about.length}/300 characters
      </div>
    </div>
  );
};
