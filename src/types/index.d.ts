declare interface Work {
 title: string;
 image: string;
 description: string;
 link: string;
}

declare interface ProfileData {
 name?: string;
 about: string;
 city?: string;
 country?: string;
 instagramUrl: string;
 twitterUrl: string;
 email: string;
 previousWorks?: Work[];
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
 previousWorks?: Work[];
}
