import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleStatus, onDelete }) => {
  const isDone = todo.status === "done";

  const createdAtLabel = new Date(todo.createdAt).toLocaleString();

  return (
    <li>
      <div>
        <span>
          {todo.description}{" "}
          <span aria-label="Created at">
            — {createdAtLabel}
          </span>{" "}
          <span>
            {isDone ? "(done)" : "(open)"}
          </span>
        </span>
      </div>
      <button onClick={() => onToggleStatus(todo.id)}>
        {isDone ? "Reopen" : "Mark as done"}
      </button>
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};
