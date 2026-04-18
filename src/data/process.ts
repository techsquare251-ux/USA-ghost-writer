export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

// TODO: Replace with the exact 6-step process content.
export const publishingProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    description: "Understand manuscript goals, audience, and publishing path.",
  },
  {
    step: 2,
    title: "Editorial",
    description: "Refine structure and language to improve readability and impact.",
  },
  {
    step: 3,
    title: "Design",
    description: "Prepare a polished cover and interior layout for release.",
  },
  {
    step: 4,
    title: "Production",
    description: "Generate distribution-ready files for print and digital formats.",
  },
  {
    step: 5,
    title: "Distribution",
    description: "Publish to selected marketplaces with optimized metadata.",
  },
  {
    step: 6,
    title: "Launch",
    description: "Execute rollout and monitor post-launch performance.",
  },
];