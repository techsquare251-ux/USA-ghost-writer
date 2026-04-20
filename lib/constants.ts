export const SITE_NAME = "Liblit Books Publishing";

export const CONTACT = {
  salesPhone: "(888) 786-7135",
  supportPhone: "(866) 841-7469",
  email: "support@liblitbookspublishing.com",
  canadaAddress: "R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2",
  usaAddress: "211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017",
};

export type DistributionPartner = {
  name: string;
  logo: string;
};

export const DISTRIBUTION_PARTNERS: DistributionPartner[] = [
  { name: "Smashwords", logo: "/partner-logos/smashwords.png" },
  { name: "Barnes & Noble", logo: "/partner-logos/barnes-and-noble.png" },
  { name: "Google Books", logo: "/partner-logos/google-books.png" },
  { name: "Draft2Digital", logo: "/partner-logos/draft2digital.png" },
  { name: "Amazon", logo: "/partner-logos/amazon.png" },
  { name: "Kindle", logo: "/partner-logos/kindle.png" },
];

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/liblitbookwriting0",
  x: "https://x.com/liblitbookwriting",
  instagram: "https://instagram.com/liblitbookwriting/",
  youtube: "https://youtube.com/@liblitbookwriting",
  linkedin: "https://linkedin.com/company/liblitbookwriting",
};

export type SocialMediaLogo = {
  key: keyof typeof SOCIAL_LINKS;
  name: string;
  href: string;
  logo: string;
};

export const SOCIAL_MEDIA_LOGOS: SocialMediaLogo[] = [
  {
    key: "facebook",
    name: "Facebook",
    href: SOCIAL_LINKS.facebook,
    logo: "/social-logos/facebook.png",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    logo: "/social-logos/linkedin.png",
  },
  {
    key: "x",
    name: "X",
    href: SOCIAL_LINKS.x,
    logo: "/social-logos/x.png",
  },
  {
    key: "instagram",
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    logo: "/social-logos/instagram.png",
  },
  {
    key: "youtube",
    name: "YouTube",
    href: SOCIAL_LINKS.youtube,
    logo: "/social-logos/youtube.png",
  },
];