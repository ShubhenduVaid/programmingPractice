import { useTodoContext } from "../../context";
import Todo from "../Todo";

export default function Todos() {
  const { todos } = useTodoContext();
  return (
    <>
      {todos.length > 0 &&
        todos.map(({ id, title, description, priority }) => (
          <Todo
            key={id!}
            id={id!}
            title={title!}
            description={description!}
            priority={priority!}
          />
        ))}
    </>
  );
}
