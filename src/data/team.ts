import { photos } from "./photos";

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Nadia Okafor",
    role: "Operations Strategy",
    photo: photos.workshop,
    linkedin: "#linkedin",
  },
  {
    name: "Liam Chen",
    role: "Systems & Automation",
    photo: photos.meeting,
    linkedin: "#linkedin",
  },
  {
    name: "Maya Lewis",
    role: "Customer Experience",
    photo: photos.strategy,
    linkedin: "#linkedin",
  },
];