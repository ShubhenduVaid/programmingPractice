export enum TYPES {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}

export type TodoType = {
  id?: number;
  title?: string;
  description?: string;
  priority?: "High" | "Medium" | "Low";
};

type TaskReducerType = {
  todos: TodoType[];
  action: {
    type: TYPES.ADD | TYPES.DELETE | TYPES.EDIT;
    todo: TodoType;
  };
};

export const initialTodos = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
    priority: "Low",
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Title 3",
    description: "Description 3",
    priority: "High",
  },
] as unknown as TodoType[];

let nextID = initialTodos.length + 1;

export function taskReducer(
  todos: TodoType[],
  action: TaskReducerType["action"]
) {
  const { type, todo } = action;
  const { id, title, description, priority } = todo;
  switch (type) {
    case TYPES.ADD: {
      console.log("ADD : ", [
        ...todos,
        { title, description, priority, id: nextID++ },
      ]);
      return [...todos, { title, description, priority, id: nextID++ }];
    }
    case TYPES.DELETE: {
      console.log(
        "Delete : ",
        todos.filter((todo) => todo.id !== id)
      );
      return todos.filter((todo) => todo.id !== id);
    }
    case TYPES.EDIT: {
      console.log(
        "EDIT",
        todos.map((_todo) => {
          if (todo.id === _todo.id) {
            return todo;
          } else {
            return _todo;
          }
        })
      );
      return todos.map((_todo) => {
        if (todo.id === _todo.id) {
          return todo;
        } else {
          return _todo;
        }
      });
    }
    default: {
      throw Error("Unknown action: " + type);
    }
  }
}
