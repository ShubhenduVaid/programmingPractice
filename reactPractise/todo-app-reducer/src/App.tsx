import { useState } from "react";

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

type TodoType = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

function App() {
  const initialTodos = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      priority: "Low",
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 3",
      priority: "High",
    },
  ] as unknown as TodoType[];

  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  function handleDelete(id: number): void {
    const updatedTodos = todos.filter((todo) => todo.id !== id) as TodoType[];
    setTodos(updatedTodos);
  }

  function handleEdit({ id, title, description, priority }: TodoType): void {
    todos.map((todo) => {
      if (todo.id === id) {
        return { id, title, description, priority };
      }
    });
    setTodos(todos);
  }

  function handleAdd({
    title,
    description,
    priority,
  }: {
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
  }): void {
    const updatedTodos = [
      ...todos,
      { title, description, priority, id: todos.length + 1 },
    ];
    setTodos(updatedTodos);
  }

  return (
    <div style={{ margin: "0 auto", width: "400px" }}>
      <AddTodo handleAdd={handleAdd} />
      <Todos
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
