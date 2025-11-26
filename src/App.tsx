import { useState } from "react";
import type { Todo } from "./types/todo";

const App: React.FC = () => {
  // React state for todos and for the new task input
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState<string>("");

  const addTodo = () => {
    if (!description.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description: description.trim(),
      createdAt: new Date(),
      status: "open",
      isUrgent: false,
    };

    setTodos([...todos, newTodo]);
    setDescription("");
  };

  return (
    <main style={{ padding: "1rem" }}>
      <h1>React To-Do</h1>

      {/* Simple form to add a new todo */}
      <div>
        <input
          type="text"
          placeholder="New task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* List of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </main>
  );
};

export default App;
