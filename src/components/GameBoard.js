import React, { useState, useEffect } from 'react';
import Box from './Box';
import { generateGrid, calculateAdjacentMines, revealAdjacentBoxes } from '../utils/GameLogic';

const GameBoard = () => {
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const newGrid = generateGrid(20, 20, 20);
    setGrid(calculateAdjacentMines(newGrid));
  }, []);

  const handleBoxClick = (row, col, isMine) => {
    if (isMine) {
      setIsGameOver(true);
    } else {
      const updatedGrid = revealAdjacentBoxes(grid, row, col);
      setGrid(updatedGrid);
    }
  };

  const handleRightClick = (row, col, e) => {
    e.preventDefault();
    const updatedGrid = grid.map((rowData, rowIndex) =>
      rowData.map((box, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...box, isChecked: !box.isChecked };
        }
        return box;
      })
    );
    setGrid(updatedGrid);
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) =>
      row.map((box, colIndex) => (
        <Box
          key={`${rowIndex}-${colIndex}`}
          value={box.value}
          isMine={box.isMine}
          isRevealed={box.isRevealed}
          isChecked={box.isChecked}
          onLeftClick={() => handleBoxClick(rowIndex, colIndex, box.isMine)}
          onRightClick={(e) => handleRightClick(rowIndex, colIndex, e)}
        />
      ))
    );
  };

  return (
    <div className="game-board">
      {isGameOver ? <div>Game Over</div> : renderGrid()}
    </div>
  );
};

export default GameBoard;
