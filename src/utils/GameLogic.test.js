describe('GameLogic', () => {
  describe('generateGrid', () => {
    it('should generate a grid with the correct dimensions and mine count', () => {
      const grid = generateGrid(3, 3, 2);
      expect(grid.length).toBe(3);
      expect(grid[0].length).toBe(3);
      const mineCount = grid.flat().filter((box) => box.isMine).length;
      expect(mineCount).toBe(2);
    });
  describe('calculateAdjacentMines', () => {
    it('should calculate the correct number of adjacent mines', () => {
      const grid = [
        [{ value: 'X', isMine: true }, { value: 0, isMine: false }, { value: 0, isMine: false }],
        [{ value: 0, isMine: false }, { value: 'X', isMine: true }, { value: 0, isMine: false }],
        [{ value: 0, isMine: false }, { value: 0, isMine: false }, { value: 0, isMine: false }],
      ];
      const updatedGrid = calculateAdjacentMines(grid);
      expect(updatedGrid[0][1].value).toBe(2);
      expect(updatedGrid[1][0].value).toBe(2);
      expect(updatedGrid[1][2].value).toBe(1);
      expect(updatedGrid[2][0].value).toBe(1);
      expect(updatedGrid[2][1].value).toBe(2);
      expect(updatedGrid[2][2].value).toBe(1);
    });
  });
  });
  describe('getAdjacentMineCount', () => {
    it('should return the correct count of adjacent mines', () => {
      const grid = [
        [{ value: 'X', isMine: true }, { value: 0, isMine: false }, { value: 0, isMine: false }],
        [{ value: 0, isMine: false }, { value: 'X', isMine: true }, { value: 0, isMine: false }],
        [{ value: 0, isMine: false }, { value: 0, isMine: false }, { value: 0, isMine: false }],
      ];
      expect(getAdjacentMineCount(grid, 0, 0)).toBe(1);
      expect(getAdjacentMineCount(grid, 0, 1)).toBe(2);
      expect(getAdjacentMineCount(grid, 0, 2)).toBe(1);
      expect(getAdjacentMineCount(grid, 1, 0)).toBe(2);
      expect(getAdjacentMineCount(grid, 1, 1)).toBe(2);
      expect(getAdjacentMineCount(grid, 1, 2)).toBe(1);
      expect(getAdjacentMineCount(grid, 2, 0)).toBe(1);
      expect(getAdjacentMineCount(grid, 2, 1)).toBe(2);
      expect(getAdjacentMineCount(grid, 2, 2)).toBe(1);
    });
  });
import { generateGrid, calculateAdjacentMines, revealAdjacentBoxes } from './GameLogic';
  describe('revealAdjacentBoxes', () => {
    it('should reveal adjacent boxes when a box with no adjacent mines is clicked', () => {
      const grid = [
        [{ value: 0, isMine: false, isRevealed: false }, { value: 1, isMine: false, isRevealed: false }, { value: 0, isMine: false, isRevealed: false }],
        [{ value: 1, isMine: false, isRevealed: false }, { value: 'X', isMine: true, isRevealed: false }, { value: 1, isMine: false, isRevealed: false }],
        [{ value: 0, isMine: false, isRevealed: false }, { value: 1, isMine: false, isRevealed: false }, { value: 0, isMine: false, isRevealed: false }],
      ];
      const updatedGrid = revealAdjacentBoxes(grid, 0, 0);
      expect(updatedGrid[0][0].isRevealed).toBe(true);
      expect(updatedGrid[0][1].isRevealed).toBe(true);
      expect(updatedGrid[0][2].isRevealed).toBe(true);
      expect(updatedGrid[1][0].isRevealed).toBe(true);
      expect(updatedGrid[1][2].isRevealed).toBe(true);
      expect(updatedGrid[2][0].isRevealed).toBe(true);
      expect(updatedGrid[2][1].isRevealed).toBe(false);
      expect(updatedGrid[2][2].isRevealed).toBe(true);
    });
  });
});
