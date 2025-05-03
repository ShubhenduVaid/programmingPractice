import { useState } from "react";

import "./App.css";
import SearchBar from "./components/SearchBar";
import TodoCards from "./components/TodoCards";
import AddCardForm from "./components/AddCardForm";

function App() {
  const [cards, setCards] = useState([]);

  function handleSearch(searchableString: string): void {
    const searchedCards = cards.map((card) => {
      if (
        card.title.toLowerCase().indexOf(searchableString.toLowerCase()) !==
          -1 ||
        card.description
          .toLowerCase()
          .indexOf(searchableString.toLowerCase()) !== -1 ||
        card.priority.toLowerCase().indexOf(searchableString.toLowerCase()) !==
          -1
      ) {
        card.isShown = true;
      } else {
        card.isShown = false;
      }
      return card;
    });
    setCards(searchedCards);
  }

  function handleTodoAdd({
    title,
    description,
    priority,
  }: {
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
  }): void {
    const updatedCards = [
      ...cards,
      { title, description, priority, id: Math.random(), isShown: true },
    ];

    setCards(updatedCards);
  }

  function handleTodoDelete(id: number) {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  }

  function handleTodoEdit({ id, title, description, priority }) {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        card.title = title;
        card.description = description;
        card.priority = priority;
      }
      return card;
    });
    setCards(updatedCards);
  }

  return (
    <div className="appContainer">
      <SearchBar handleSearch={handleSearch} />
      <AddCardForm handleTodoAdd={handleTodoAdd} />
      <TodoCards
        cards={cards}
        handleTodoDelete={handleTodoDelete}
        handleTodoEdit={handleTodoEdit}
      />
    </div>
  );
}

export default App;
