import type { Todo, TodoCategory } from "../types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateDescription: (id: string, newDescription: string) => void;
}

// Category keys and display labels.
const CATEGORY_CONFIG: { key: TodoCategory; label: string }[] = [
  { key: "work", label: "Work" },
  { key: "personal", label: "Personal" },
  { key: "shopping", label: "Shopping" },
];


export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleStatus,
  onDelete,
  onUpdateDescription,
}) => {
  if (todos.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div className="todo-groups" aria-label="Todos by category" aria-live="polite">
      {CATEGORY_CONFIG.map(({ key, label }) => {
        const todosInCategory = todos.filter((todo) => todo.category === key);

        return (
          <section key={key} className="todo-group">
            <h2 className="todo-group__title">{label}</h2>

            {todosInCategory.length === 0 ? (
              <p className="todo-group__empty">No tasks in this category.</p>
            ) : (
              <ul aria-label={`${label} tasks`}>
                {todosInCategory.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                    onUpdateDescription={onUpdateDescription}
                  />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
};
