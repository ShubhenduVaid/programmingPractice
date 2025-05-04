import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { TodoProvider } from "./context";

function App() {
  return (
    <TodoProvider>
      <div style={{ margin: "0 auto", width: "400px" }}>
        <AddTodo />
        <Todos />
      </div>
    </TodoProvider>
  );
}

export default App;
