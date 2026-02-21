import { ISkillListItem, SkillLevel } from "@/types";

const skills: ISkillListItem[] = [
  {
    title: "Programming Languages",
    items: [
      {
        title: "Dart",
        level: SkillLevel.Expert,
        icon: "/skills/dart.svg",
      },
      {
        title: "Java",
        level: SkillLevel.Intermediate,
        icon: "/skills/java.svg",
      },
      {
        title: "C",
        level: SkillLevel.Intermediate,
        icon: "/skills/c.svg",
      },
    ],
  },
  {
    title: "Frontend Development",
    items: [
      {
        title: "Flutter",
        level: SkillLevel.Expert,
        icon: "/skills/flutter.svg",
      },
      
    ],
  },
  {
    title: "Mobile App Development",
    items: [
      {
        title: "Flutter",
        level: SkillLevel.Expert,
        icon: "/skills/flutter.svg",
      },
      {
        title: "GetX",
        level: SkillLevel.Expert,
        icon: "/skills/getx.png",
      },
    ],
  },
  {
    title: "Database Management",
    items: [
      {
        title: "Firebase Firestore",
        level: SkillLevel.Intermediate,
        icon: "/skills/firebase.svg",
      },
    ],
  },
  {
    title: "Miscellaneous",
    items: [
      {
        title: "Firebase",
        level: SkillLevel.Intermediate,
        icon: "/skills/firebase.svg",
      },
      {
        title: "Ubuntu",
        level: SkillLevel.Intermediate,
        icon: "/skills/ubuntu.png",
      },
      {
        title: "Postman",
        level: SkillLevel.Intermediate,
        icon: "/skills/postman.png",
      },
    ],
  },
  {
    title: "Nontechnical Skills",
    items: [
      {
        title: "Problem Solving",
        level: SkillLevel.Expert,
        icon: "/images/logical-thinking.png",
      },
      {
        title: "Collaboration",
        level: SkillLevel.Expert,
        icon: "/images/collaboration.png",
      },
      {
        title: "Analytical Skills",
        level: SkillLevel.Expert,
        icon: "/images/analytical-skills.png",
      },
    ],
  },
];

export default skills;
