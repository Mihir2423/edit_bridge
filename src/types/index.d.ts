declare interface Work {
  id: number;
  userId: string;
  title: string;
  description: string;
  url: string;
  platform?: string;
}

declare interface ProfileData {
  name?: string;
  about: string;
  city?: string;
  country?: string;
  instagramUrl: string;
  twitterUrl: string;
  email: string;
  request_received?: { senderId: string }[];
  request_send?: { receiverId: string }[];
  previousWork?: WorkWithoutIds[];
}

declare interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  city?: string;
  country?: string;
  bio?: string;
  slug?: string | null;
  socials?: string[];
  request_received?: { senderId: string }[];
  request_send?: { receiverId: string }[];
  previousWork?: Work[];
}

declare type Profile = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: string | null;
  bio: string | null;
  userType: string | null;
  salt: string | null;
  socials: string[];
  createdAt: Date;
  updatedAt: Date;
  request_received: { senderId: string }[];
  request_send: { receiverId: string }[];
  city: string | null;
  country: string | null;
  slug: string;
};

declare type WorkWithoutIds = Omit<Work, "id" | "userId">;

declare interface UserWithoutWorkIds extends Omit<User, "previousWork"> {
  previousWork?: WorkWithoutIds[];
}

declare type Requests = {
  id: string;
  createdAt: Date;
  status: string;
  user: { slug: string | null; name: string | null; email: string; id: string };
  type: string;
};

declare type ModalProps = {
  title: string;
  content: React.ReactNode;
  children: React.ReactNode;
};
