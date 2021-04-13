import React from "react";
import HomePage from "./components/pages/HomePage";
import TodoListStorage from "./context/TodoListStorage";

export const TodoContext = React.createContext();

export default function App() {
  return (
    <TodoContext.Provider value={TodoListStorage()}>
      <HomePage />
    </TodoContext.Provider>
  );
}
