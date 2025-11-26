import { useState, useEffect } from "react";
import type { Todo, TodoCategory } from "./types/todo";
import { TodoList } from "./components/TodoList";

const STORAGE_KEY = "react-todo-app-todos";

const App: React.FC = () => {
  // --------------------------
  // State (with initial load from localStorage)
  // --------------------------
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as Todo[];

      return parsed.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
      return [];
    }
  });

  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<TodoCategory>("personal");

  // --------------------------
  // Save todos to localStorage whenever they change
  // --------------------------
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // --------------------------
  // Urgent task detection
  // --------------------------
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.status !== "open") {
            return todo.isUrgent ? { ...todo, isUrgent: false } : todo;
          }

          const createdTime = new Date(todo.createdAt).getTime();
          const now = Date.now();
          const isNowUrgent = now - createdTime > 60_000;

          return todo.isUrgent === isNowUrgent
            ? todo
            : { ...todo, isUrgent: isNowUrgent };
        })
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // --------------------------
  // Add new todo
  // --------------------------
  const addTodo = () => {
    if (!description.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description: description.trim(),
      createdAt: new Date(),
      status: "open",
      isUrgent: false,
      category,
    };

    setTodos((prev) => [...prev, newTodo]);
    setDescription("");
  };

  // --------------------------
  // Toggle todo status
  // --------------------------
  const toggleTodoStatus = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "open" ? "done" : "open" }
          : todo
      )
    );
  };

  // --------------------------
  // Delete todo
  // --------------------------
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // --------------------------
  // Update description
  // --------------------------
  const updateTodoDescription = (id: string, newDescription: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription } : todo
      )
    );
  };

  // --------------------------
  // Counters
  // --------------------------
  const openCount = todos.filter((t) => t.status === "open").length;
  const doneCount = todos.filter((t) => t.status === "done").length;
  const totalCount = todos.length;

  return (
    <main className="app">
      <h1 className="app__title">React To-Do</h1>

      {/* Todo summary */}
      <section aria-label="Todo summary" className="app__summary">
        <p>
          Open: {openCount} · Done: {doneCount} · Total: {totalCount}
        </p>
      </section>

      {/* Form */}
      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          placeholder="New task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="todo-form__input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TodoCategory)}
          className="todo-form__select"
          aria-label="Todo category"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
        </select>

        <button type="submit" className="todo-form__button">
          Add
        </button>
      </form>

      {/* Todo groups by category */}
      <TodoList
        todos={todos}
        onToggleStatus={toggleTodoStatus}
        onDelete={deleteTodo}
        onUpdateDescription={updateTodoDescription}
      />
    </main>
  );
};

export default App;
