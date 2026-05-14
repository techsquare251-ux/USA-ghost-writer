export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: string;
};

export const publishingProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Editing",
    description:
      "Elevate your manuscript with our editing service that ensures every word tells your story the way you intended.",
    icon: "Pencil",
  },
  {
    step: 2,
    title: "Formatting",
    description:
      "From font choice to margins, our formatting service makes sure your book is dressed to impress.",
    icon: "AlignLeft",
  },
  {
    step: 3,
    title: "Proofreading",
    description:
      "Our proofreading team is your safety net, catching every slip-up to make your writing flawless.",
    icon: "SearchCheck",
  },
  {
    step: 4,
    title: "Typesetting & Layout",
    description:
      "Expert typesetting that makes your book as easy on the eyes as it is engaging for the mind.",
    icon: "LayoutTemplate",
  },
  {
    step: 5,
    title: "Cover Design",
    description:
      "We create covers that speak to readers, inviting them into the world you've created.",
    icon: "ImageIcon",
  },
  {
    step: 6,
    title: "Publishing",
    description:
      "Your literary journey culminates with our publishing service, placing your book in the spotlight it deserves.",
    icon: "Send",
  },
];
