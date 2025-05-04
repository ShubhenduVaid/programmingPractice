import {
  ReactNode,
  useContext,
  useReducer,
  createContext,
  Dispatch,
} from "react";

import { initialTodos, taskReducer, TodoType, TYPES } from "../reducers";

type TodoProviderProps = {
  children: ReactNode;
};

type TodoContextType = {
  todos: TodoType[];
  dispatch: Dispatch<{
    type: TYPES.ADD | TYPES.DELETE | TYPES.EDIT;
    todo: TodoType;
  }>;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(taskReducer, initialTodos);
  const value = { todos, dispatch };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
