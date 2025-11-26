// Renders a single todo item with status and urgency.

import type { Todo } from "../types/todo";
import type { CSSProperties } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleStatus,
  onDelete,
}) => {
  const isDone = todo.status === "done";
  const createdAtLabel = new Date(todo.createdAt).toLocaleString();

  // Styles for urgent todo.
  const itemStyle: CSSProperties | undefined = todo.isUrgent
    ? { borderLeft: "4px solid red", paddingLeft: "0.5rem" }
    : undefined;

  return (
    <li style={itemStyle}>
      <div>
        <span>
          {todo.description}{" "}
          <span aria-label="Created at">— {createdAtLabel}</span>{" "}
          <span>{isDone ? "(done)" : "(open)"}</span>
          {todo.isUrgent && (
            <span
              aria-label="Urgent task"
              style={{ marginLeft: "0.5rem", fontWeight: "bold" }}
            >
              🔥 Urgent
            </span>
          )}
        </span>
      </div>

      <div>
        <button onClick={() => onToggleStatus(todo.id)}>
          {isDone ? "Reopen" : "Mark as done"}
        </button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

