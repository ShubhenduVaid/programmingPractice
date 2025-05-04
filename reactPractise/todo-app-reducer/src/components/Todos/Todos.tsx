import Todo from "../Todo";

interface Priority {
  priority: "High" | "Medium" | "Low";
}

type TodoType = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

interface TodosProps {
  todos: TodoType[];
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
export default function Todos({ todos, handleDelete, handleEdit }: TodosProps) {
  return (
    <>
      {todos.length > 0 &&
        todos.map(({ id, title, description, priority }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            priority={priority}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
    </>
  );
}
