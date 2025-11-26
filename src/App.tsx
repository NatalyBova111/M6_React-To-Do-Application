import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  // React state for todos and for the new task input
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState<string>("");

  // Automatically mark todos as urgent if they are open for more than 1 minute.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          // only consider open tasks
          if (todo.status !== "open") {
            // reset urgency for non-open tasks
            return todo.isUrgent ? { ...todo, isUrgent: false } : todo;
          }

          const createdTime = new Date(todo.createdAt).getTime();
          const now = Date.now();
          const isNowUrgent = now - createdTime > 60_000; // 60 seconds

          if (todo.isUrgent === isNowUrgent) {
            return todo;
          }

          return { ...todo, isUrgent: isNowUrgent };
        })
      );
    }, 5000); // check every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Handler to add a new todo
  const addTodo = () => {
    if (!description.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description: description.trim(),
      createdAt: new Date(),
      status: "open",
      isUrgent: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setDescription("");
  };

  // Handlers to toggle todo status and delete a todo by id
  const toggleTodoStatus = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "open" ? "done" : "open" }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Handler to update todo description.
  const updateTodoDescription = (id: string, newDescription: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription } : todo
      )
    );
  };

  // Compute open/done counts for summary.
  const openCount = todos.filter((todo) => todo.status === "open").length;
  const doneCount = todos.filter((todo) => todo.status === "done").length;
  const totalCount = todos.length;



  
  return (
    <main className="app">
      <h1 className="app__title">React To-Do</h1>

      {/* Todo summary. */}
      <section aria-label="Todo summary" className="app__summary">
        <p>
          Open: {openCount} · Done: {doneCount} · Total: {totalCount}
        </p>
      </section>

      {/* Simple form to add a new todo */}
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
        <button type="submit" className="todo-form__button">
          Add
        </button>
      </form>

      {/* List of todos rendered via TodoList component */}
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
