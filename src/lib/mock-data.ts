export interface Student {
  id: string;
  name: string;
  email: string;
  cgpa: number;
  skills: string[];
  backlogs: number;
  department: string;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  minCgpa: number;
  maxBacklogs: number;
  requiredSkills: string[];
  deadline: string;
  role: string;
  package: string;
  location: string;
  type: string;
}

export type ApplicationStatus = "applied" | "shortlisted" | "interview" | "selected" | "rejected";

export interface Application {
  id: string;
  studentId: string;
  companyId: string;
  status: ApplicationStatus;
  appliedAt: string;
  company: Company;
}

export interface Notification {
  id: string;
  studentId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: "drive" | "deadline" | "status" | "info";
}

export const currentStudent: Student = {
  id: "s1",
  name: "Aarav Sharma",
  email: "aarav@university.edu",
  cgpa: 8.2,
  skills: ["React", "Node.js", "Python", "SQL", "TypeScript"],
  backlogs: 0,
  department: "Computer Science",
};

export const companies: Company[] = [
  {
    id: "c1", name: "Google", logo: "G", minCgpa: 8.0, maxBacklogs: 0,
    requiredSkills: ["Python", "SQL"], deadline: "2026-04-15",
    role: "Software Engineer", package: "₹25 LPA", location: "Bangalore", type: "Full-time",
  },
  {
    id: "c2", name: "Microsoft", logo: "M", minCgpa: 7.5, maxBacklogs: 0,
    requiredSkills: ["TypeScript", "React"], deadline: "2026-04-20",
    role: "Frontend Developer", package: "₹22 LPA", location: "Hyderabad", type: "Full-time",
  },
  {
    id: "c3", name: "Amazon", logo: "A", minCgpa: 8.5, maxBacklogs: 0,
    requiredSkills: ["Java", "AWS"], deadline: "2026-04-10",
    role: "SDE-1", package: "₹28 LPA", location: "Bangalore", type: "Full-time",
  },
  {
    id: "c4", name: "Infosys", logo: "I", minCgpa: 6.5, maxBacklogs: 2,
    requiredSkills: ["SQL"], deadline: "2026-05-01",
    role: "Systems Engineer", package: "₹6.5 LPA", location: "Pune", type: "Full-time",
  },
  {
    id: "c5", name: "TCS", logo: "T", minCgpa: 6.0, maxBacklogs: 1,
    requiredSkills: ["Python"], deadline: "2026-05-10",
    role: "Developer", package: "₹7 LPA", location: "Chennai", type: "Full-time",
  },
  {
    id: "c6", name: "Flipkart", logo: "F", minCgpa: 7.0, maxBacklogs: 0,
    requiredSkills: ["React", "Node.js"], deadline: "2026-04-25",
    role: "Full Stack Developer", package: "₹18 LPA", location: "Bangalore", type: "Full-time",
  },
];

export const applications: Application[] = [
  { id: "a1", studentId: "s1", companyId: "c1", status: "shortlisted", appliedAt: "2026-03-10", company: companies[0] },
  { id: "a2", studentId: "s1", companyId: "c2", status: "interview", appliedAt: "2026-03-12", company: companies[1] },
  { id: "a3", studentId: "s1", companyId: "c4", status: "applied", appliedAt: "2026-03-20", company: companies[3] },
];

export const notifications: Notification[] = [
  { id: "n1", studentId: "s1", message: "Google has shortlisted you for the next round!", isRead: false, createdAt: "2026-03-24T10:00:00", type: "status" },
  { id: "n2", studentId: "s1", message: "Microsoft interview scheduled for April 5th", isRead: false, createdAt: "2026-03-23T15:30:00", type: "status" },
  { id: "n3", studentId: "s1", message: "New placement drive: Flipkart is hiring!", isRead: true, createdAt: "2026-03-22T09:00:00", type: "drive" },
  { id: "n4", studentId: "s1", message: "Amazon application deadline is in 2 days", isRead: true, createdAt: "2026-03-21T08:00:00", type: "deadline" },
  { id: "n5", studentId: "s1", message: "TCS drive registration is now open", isRead: true, createdAt: "2026-03-20T12:00:00", type: "drive" },
];

export function checkEligibility(student: Student, company: Company) {
  const reasons: string[] = [];
  const cgpaOk = student.cgpa >= company.minCgpa;
  const backlogsOk = student.backlogs <= company.maxBacklogs;
  const matchedSkills = company.requiredSkills.filter(s => student.skills.includes(s));
  const skillsOk = matchedSkills.length === company.requiredSkills.length;

  if (!cgpaOk) reasons.push(`CGPA ${student.cgpa} < required ${company.minCgpa}`);
  if (!backlogsOk) reasons.push(`${student.backlogs} backlogs > max ${company.maxBacklogs}`);
  if (!skillsOk) {
    const missing = company.requiredSkills.filter(s => !student.skills.includes(s));
    reasons.push(`Missing skills: ${missing.join(", ")}`);
  }

  return { eligible: cgpaOk && backlogsOk && skillsOk, reasons, matchedSkills };
}
