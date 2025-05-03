import { useState } from "react";

import "./TodoCard.css";

export interface TodoCardProps {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  id: number;
  handleTodoDelete: (id: number) => void;
  handleTodoEdit: ({ id, title, description, priority }) => void;
  isShown: boolean;
}

const PriorityColor = {
  Low: "blue",
  Medium: "green",
  High: "red",
};

export default function TodoCard({
  title,
  description,
  priority,
  id,
  handleTodoDelete,
  handleTodoEdit,
}: TodoCardProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>(title);
  const [todoDescription, setTodoDescription] = useState<string>(description);
  const [todoPrioroty, setTodoPrioroty] = useState<string>(priority);
  const getPriorityColor = (priority: TodoCardProps["priority"]) => {
    return PriorityColor[priority];
  };

  return (
    <div className="todoCardContainer">
      {isEdit ? (
        <>
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <input
            type="text"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <strong>{todoTitle}</strong>
          <p>{todoDescription}</p>
        </>
      )}
      {isEdit ? (
        <div className="todoCardFooterContainer">
          <select
            value={todoPrioroty}
            onChange={(e) => setTodoPrioroty(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button
            onClick={() => {
              setIsEdit(false);
              handleTodoEdit({
                id,
                title: todoTitle,
                description: todoDescription,
                priority: todoPrioroty,
              });
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="todoCardFooterContainer">
          <strong style={{ color: getPriorityColor(todoPrioroty) }}>
            {todoPrioroty}
          </strong>
          <div>
            <button
              style={{ "margin-right": "10px" }}
              onClick={() => handleTodoDelete(id)}
            >
              Delete
            </button>
            <button onClick={() => setIsEdit(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}
