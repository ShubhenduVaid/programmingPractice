import { useReducer } from "react";

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { initialTodos, taskReducer, TodoType } from "./reducers";

function App() {
  const [todos, dispatch] = useReducer(taskReducer, initialTodos);

  return (
    <div style={{ margin: "0 auto", width: "400px" }}>
      <AddTodo dispatch={dispatch} />
      <Todos todos={todos as TodoType[]} dispatch={dispatch} />
    </div>
  );
}

export default App;
