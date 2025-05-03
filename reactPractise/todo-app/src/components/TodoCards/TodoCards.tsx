import TodoCard from "../TodoCard";

export default function TodoCardContainer({
  cards,
  handleTodoDelete,
  handleTodoEdit,
}) {
  return (
    <>
      {cards.length > 0 &&
        cards
          .filter((card) => card.isShown)
          .map((card) => (
            <TodoCard
              id={card.id}
              key={card.id}
              title={card.title}
              description={card.description}
              priority={card.priority}
              handleTodoDelete={handleTodoDelete}
              handleTodoEdit={handleTodoEdit}
            />
          ))}
    </>
  );
}
