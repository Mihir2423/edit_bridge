import { Input } from "@/components/ui/input";

interface SocialLinksProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  profileData,
  setProfileData,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
  );
};
