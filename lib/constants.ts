export const SITE_NAME = "USA Ghost Writer";

export const CONTACT = {
  salesPhone: "+1 (406) 849-8235",
  supportPhone: "+1 (406) 849-8235",
  email: "support@usaghostwriter.com",
  canadaAddress: "",
  usaAddress: "811 W 7th St,90017,Los angeles,United states",
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
  facebook: "https://www.facebook.com/share/18KkX2FqVw/?mibextid=wwXIfr",
  x: "",
  instagram: "https://www.instagram.com/usa.ghostwriter?igsh=MWU4dWducjYwemo2eA==",
  youtube: "",
  linkedin: "",
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