import { useState } from "react";

import "./AddTodo.css";

import { TYPES } from "../../reducers";
import { useTodoContext } from "../../context";

export default function AddTodo() {
  const { dispatch } = useTodoContext();
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
          dispatch({ type: TYPES.ADD, todo: { title, description, priority } });
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
