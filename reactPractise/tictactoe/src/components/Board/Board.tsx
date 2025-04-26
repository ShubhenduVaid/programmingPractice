import { useEffect, useState } from "react";

import Cell from "../Cell";

const CellValues = {
  X: "X",
  O: "0",
};

export default function Board() {
  const [boardValues, setBoardValues] = useState<Array<string>>([]);
  const [isX, setIsX] = useState<boolean>(true);
  const [winner, setWinner] = useState<null | string>(null);

  useEffect(() => {
    handleWinner();
  }, [boardValues]);

  const cellList = Array(9).fill(null);

  function handleWinner() {
    const combinationList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < combinationList.length; index++) {
      const [a, b, c] = combinationList[index];
      if (
        boardValues[a] &&
        boardValues[a] === boardValues[b] &&
        boardValues[a] === boardValues[c]
      ) {
        setWinner(boardValues[a]);
        return boardValues[a];
      }
    }
    return null;
  }

  function handleCellClick(id: number): void {
    if (boardValues[id] || winner) {
      return;
    }
    const _boardValues = boardValues.slice();
    _boardValues[id] = isX ? CellValues.X : CellValues.O;
    setBoardValues(_boardValues);
    setIsX(!isX);
  }

  return (
    <>
      <div className="grid">
        {!winner && (
          <span>Next Turn : {isX ? CellValues.X : CellValues.O}</span>
        )}
        {winner && <span>Winner is : {winner}</span>}
        <div className="grid grid-cols-3">
          {cellList &&
            cellList.map((_val, id) => {
              return (
                <Cell onClick={() => handleCellClick(id)} key={id}>
                  {boardValues[id]}
                </Cell>
              );
            })}
        </div>
      </div>
    </>
  );
}
