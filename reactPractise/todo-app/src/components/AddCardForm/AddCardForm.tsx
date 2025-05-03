import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import "./AddCardForm.css";

import { TodoCardProps } from "../TodoCard";

interface AddCardFormProps {
  handleTodoAdd: ({
    title,
    description,
    priority,
  }: {
    title: string;
    description: string;
    priority: TodoCardProps["priority"];
  }) => void;
}

export default function AddCardForm({ handleTodoAdd }: AddCardFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TodoCardProps["priority"]>("Low");
  const [isAddDisable, setIsAddDisable] = useState<boolean>(true);

  useEffect(() => {
    if (title.length && description.length) {
      setIsAddDisable(false);
    } else {
      setIsAddDisable(true);
    }
  }, [title, description]);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  }

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPriority(event.target.value as TodoCardProps["priority"]);
  }

  function handleAddButton(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if (title && description && priority) {
      handleTodoAdd({ title, description, priority });
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  }

  return (
    <div className="addCardFormContainer">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <select value={priority} onChange={handlePriorityChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button disabled={isAddDisable} onClick={handleAddButton}>
        Add Task
      </button>
    </div>
  );
}
