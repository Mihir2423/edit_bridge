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

declare type WorkWithoutIds = Omit<Work, 'id' | 'userId'>;

declare interface UserWithoutWorkIds extends Omit<User, 'previousWork'> {
  previousWork?: WorkWithoutIds[];
}
