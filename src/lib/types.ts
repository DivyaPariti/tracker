export type TaskStatus = "completed" | "ongoing" | "expected";

export interface Task {
  id: string;
  deliverable: string;
  status: TaskStatus;
  text: string;
  note: string;
  createdAt: string;
}

export type Deliverable =
  | "Search performance"
  | "Website performance"
  | "Data management"
  | "Lead ops & revenue mapping";

export const DELIVERABLES: Deliverable[] = [
  "Search performance",
  "Website performance",
  "Data management",
  "Lead ops & revenue mapping",
];

export const STATUSES: TaskStatus[] = ["completed", "ongoing", "expected"];
