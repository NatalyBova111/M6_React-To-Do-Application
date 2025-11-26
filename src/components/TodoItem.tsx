// Renders a single todo item with status, urgency and edit support.

import React, { useState } from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateDescription: (id: string, newDescription: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleStatus,
  onDelete,
  onUpdateDescription,
}) => {
  const isDone = todo.status === "done";
  const createdAtLabel = new Date(todo.createdAt).toLocaleString();

  // Local edit mode state.
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(todo.description);

  // Styles for urgent todo.
  const itemClassName = `todo-item${
    todo.isUrgent ? " todo-item--urgent" : ""
  }`;

  const handleSave = () => {
    const trimmed = tempDescription.trim();
    if (!trimmed) return;
    onUpdateDescription(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <li className={itemClassName}>
      <div>



 <span>
  {/* Category badge */}
  <span
    className={
      "todo-category-badge " +
      (todo.category === "work"
        ? "todo-category-work"
        : todo.category === "personal"
        ? "todo-category-personal"
        : "todo-category-shopping")
    }
  >
    {todo.category}
  </span>

  {isEditing ? (
    <input
      type="text"
      value={tempDescription}
      onChange={(e) => setTempDescription(e.target.value)}
    />
  ) : (
    todo.description
  )}{" "}
  <span aria-label="Created at">— {createdAtLabel}</span>{" "}

  {/* Status badge */}
  {todo.isUrgent ? (
    <span className="status-badge status-urgent">🔥 Urgent</span>
  ) : isDone ? (
    <span className="status-badge status-done">✔️ Done</span>
  ) : (
    <span className="status-badge status-open">🟢 Open</span>
  )}
</span>





      </div>

      <div>
        <button onClick={() => onToggleStatus(todo.id)}>
          {isDone ? "Reopen" : "Mark as done"}
        </button>

        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} disabled={isDone}>
            Edit
          </button>
        )}

        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
};
