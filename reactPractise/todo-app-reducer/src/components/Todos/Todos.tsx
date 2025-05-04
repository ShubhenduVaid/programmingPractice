import { TodoType, TYPES } from "../../reducers";
import Todo from "../Todo";

interface TodosProps {
  todos: TodoType[];
  dispatch: React.ActionDispatch<
    [
      action: {
        type: TYPES.ADD | TYPES.DELETE | TYPES.EDIT;
        todo: TodoType;
      }
    ]
  >;
}
export default function Todos({ todos, dispatch }: TodosProps) {
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
            dispatch={dispatch}
          />
        ))}
    </>
  );
}
