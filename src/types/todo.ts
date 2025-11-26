export interface Todo {
    id: string;
    description: string;
    createdAt: Date;
    status: "open" | "done";
    isUrgent: boolean;
}