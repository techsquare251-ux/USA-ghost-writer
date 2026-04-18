export type PackageFeatureGroup = {
  title: string;
  features: string[];
};

export type PublishingPackage = {
  name: string;
  price: string;
  featured?: boolean;
  featureGroups: PackageFeatureGroup[];
};

// TODO: Replace with real package matrix from source website.
export const publishingPackages: PublishingPackage[] = [
  {
    name: "Basic",
    price: "$700",
    featureGroups: [
      { title: "Manuscript Prep", features: ["Light formatting", "Basic review"] },
      { title: "Distribution", features: ["Core marketplace setup"] },
    ],
  },
  {
    name: "Start Up",
    price: "$2,000",
    featureGroups: [
      { title: "Manuscript Prep", features: ["Editing pass", "Professional formatting"] },
      { title: "Distribution", features: ["Extended marketplace setup"] },
    ],
  },
  {
    name: "Standard",
    price: "$3,000",
    featured: true,
    featureGroups: [
      { title: "Manuscript Prep", features: ["Comprehensive editing", "Formatting and QA"] },
      { title: "Marketing", features: ["Launch guidance", "Basic promo support"] },
    ],
  },
  {
    name: "Expert",
    price: "$7,000",
    featureGroups: [
      { title: "Cover Design", features: ["Custom design", "Multiple concepts"] },
      { title: "Marketing", features: ["Campaign planning", "Audience segmentation"] },
    ],
  },
  {
    name: "Premium",
    price: "$15,000",
    featureGroups: [
      { title: "Distribution", features: ["Expanded channels", "Metadata optimization"] },
      { title: "Marketing", features: ["Full launch support", "Performance reporting"] },
    ],
  },
  {
    name: "Enterprise",
    price: "$25,000",
    featureGroups: [
      { title: "End-to-End", features: ["Dedicated project team", "Advanced growth strategy"] },
      { title: "Guarantees", features: ["Priority delivery", "Extended support"] },
    ],
  },
];