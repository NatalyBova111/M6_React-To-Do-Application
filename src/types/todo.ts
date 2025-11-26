export interface Todo {
    id: string;
    description: string;
    createdAt: Date;
    status: "open" | "done";
    isUrgent: boolean;
}
// Type for todo category.
export type TodoCategory = "work" | "personal" | "shopping";

export interface Todo {
  id: string;
  description: string;
  createdAt: Date;
  status: "open" | "done";
  isUrgent: boolean;
  category: TodoCategory;
}
