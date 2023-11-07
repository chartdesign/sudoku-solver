import React, { useState } from "react";

const SudokuSolver = () => {
  const [grid, setGrid] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const copyGrid = (grid) => {
    return grid.map((row) => [...row]);
  };

  const isPossible = (row, column, number, grid) => {
    // Check if the number is in the given row or column
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === number || grid[i][column] === number) {
        return false;
      }
    }

    // Check if the number is in the given 3x3 box
    const x0 = Math.floor(column / 3) * 3;
    const y0 = Math.floor(row / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[y0 + i][x0 + j] === number) {
          return false;
        }
      }
    }

    return true;
  };

  const solveSudoku = (currentGrid) => {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (currentGrid[row][column] === 0) {
          for (let number = 1; number <= 9; number++) {
            if (isPossible(row, column, number, currentGrid)) {
              currentGrid[row][column] = number;
              if (solveSudoku(currentGrid)) {
                setGrid(copyGrid(currentGrid)); // update state only when a solution is found
                return true;
              }
              currentGrid[row][column] = 0; // backtrack
            }
          }
          return false; // trigger backtrack if no number fits
        }
      }
    }
    return true; // if the whole grid is filled correctly
  };

  const handleSolveClick = () => {
    const newGrid = copyGrid(grid); // copy the grid before solving
    solveSudoku(newGrid);
  };

  return (
    <div>
      <button onClick={handleSolveClick}>Solve Sudoku</button>
      <div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <span key={`${rowIndex}-${colIndex}`}>{value} </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SudokuSolver;
