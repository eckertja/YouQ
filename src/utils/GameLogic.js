const generateGrid = (rows, cols, mineCount) => {
  const grid = [];
  const mines = getMines(rows, cols, mineCount);

  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      const isMine = mines.has(`${row}-${col}`);
      currentRow.push({
        value: isMine ? 'X' : 0,
        isMine,
        isRevealed: false,
        isChecked: false,
      });
    }
    grid.push(currentRow);
  }

  return grid;
};

const getMines = (rows, cols, mineCount) => {
  const mines = new Set();
  while (mines.size < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const position = `${row}-${col}`;
    if (!mines.has(position)) {
      mines.add(position);
    }
  }
  return mines;
};

const calculateAdjacentMines = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!grid[row][col].isMine) {
        grid[row][col].value = getAdjacentMineCount(grid, row, col);
      }
    }
  }

  return grid;
};

const getAdjacentMineCount = (grid, row, col) => {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, rows - 1); i++) {
    for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, cols - 1); j++) {
      if (i !== row || j !== col) {
        if (grid[i][j].isMine) {
          count++;
        }
      }
    }
  }

  return count;
};

const revealAdjacentBoxes = (grid, row, col) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const updatedGrid = [...grid];

  const revealBoxes = (r, c) => {
    if (r >= 0 && r < rows && c >= 0 && c < cols && !updatedGrid[r][c].isRevealed && !updatedGrid[r][c].isMine) {
      updatedGrid[r][c].isRevealed = true;
      if (updatedGrid[r][c].value === 0) {
        revealBoxes(r - 1, c - 1);
        revealBoxes(r - 1, c);
        revealBoxes(r - 1, c + 1);
        revealBoxes(r, c - 1);
        revealBoxes(r, c + 1);
        revealBoxes(r + 1, c - 1);
        revealBoxes(r + 1, c);
        revealBoxes(r + 1, c + 1);
      }
    }
  };

  revealBoxes(row, col);
  return updatedGrid;
};

export { generateGrid, calculateAdjacentMines, revealAdjacentBoxes };
