import { useState } from "react";

interface TodoButtonProps {
  handleTodoEdit: (e: boolean) => void;
  handleDelete: () => void;
  handleEdit: () => void;
}
export default function TodoButton({
  handleTodoEdit,
  handleDelete,
  handleEdit,
}: TodoButtonProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div>
      {isEdit ? (
        <button
          onClick={() => {
            setIsEdit(false);
            handleTodoEdit(false);
            handleEdit();
          }}
        >
          Save
        </button>
      ) : (
        <>
          <button
            style={{ marginRight: "5px" }}
            onClick={() => {
              setIsEdit(true);
              handleTodoEdit(true);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete()}>Delete</button>
        </>
      )}
    </div>
  );
}
