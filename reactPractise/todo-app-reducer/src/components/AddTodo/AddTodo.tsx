import { useState } from "react";

import "./AddTodo.css";

interface AddTodoProps {
  handleAdd: ({
    title,
    description,
    priority,
  }: {
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
  }) => void;
}

export default function AddTodo({ handleAdd }: AddTodoProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Low");

  return (
    <div className="addTodoContainer">
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        onChange={(e) =>
          setPriority(e.target.value as "High" | "Medium" | "Low")
        }
        value={priority}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button
        onClick={() => {
          handleAdd({ title, description, priority });
          setTitle("");
          setDescription("");
          setPriority("Low");
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
