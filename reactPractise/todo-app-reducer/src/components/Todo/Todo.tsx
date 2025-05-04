import { useState } from "react";

import TextEditInput from "../TextEditInput";
import TextEditSelect from "../TextEditSelect";
import TodoButton from "../TodoButton";
import "./Todo.css";

interface Priority {
  priority: "High" | "Medium" | "Low";
}
interface TodoProps {
  id: number;
  title: string;
  description: string;
  priority: Priority["priority"];
  handleDelete: (id: number) => void;
  handleEdit: ({
    id,
    title,
    description,
    priority,
  }: {
    id: number;
    title: string;
    description: string;
    priority: Priority["priority"];
  }) => void;
}
export default function Todo({
  id,
  title,
  description,
  priority,
  handleDelete,
  handleEdit,
}: TodoProps) {
  const [isTodoEdit, setIsTodoEdit] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>(title);
  const [todoDescription, setTodoDescription] = useState<string>(description);
  const [todoPriority, setTodoPriority] =
    useState<Priority["priority"]>(priority);

  return (
    <div className="todoContainer">
      <TextEditInput
        value={todoTitle}
        isEdit={isTodoEdit}
        handleOnChange={(e) => setTodoTitle(e.target.value)}
        isBold={true}
      />
      <TextEditInput
        value={todoDescription}
        isEdit={isTodoEdit}
        handleOnChange={(e) => setTodoDescription(e.target.value)}
        isBold={false}
      />
      <div className="todoFooterContainer">
        <TextEditSelect
          value={todoPriority}
          isEdit={isTodoEdit}
          handleOnChange={(e) =>
            setTodoPriority(e.target.value as Priority["priority"])
          }
        />
        <TodoButton
          handleTodoEdit={setIsTodoEdit}
          handleDelete={() => handleDelete(id)}
          handleEdit={() =>
            handleEdit({
              id: id,
              title: todoTitle,
              description: todoDescription,
              priority: todoPriority,
            })
          }
        />
      </div>
    </div>
  );
}
