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
 socials?: string[]
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
 userType: string | null
 salt: string | null;
 socials: string[];
 createdAt: Date;
 updatedAt: Date;
 city: string | null;
 country: string | null;
 slug: string
};


declare type WorkWithoutIds = Omit<Work, 'id' | 'userId'>;

declare interface UserWithoutWorkIds extends Omit<User, 'previousWork'> {
  previousWork?: WorkWithoutIds[];
}
