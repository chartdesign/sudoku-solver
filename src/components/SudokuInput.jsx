import React, { useState } from "react";

const SudokuSolver = () => {
  const emptyGrid = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  const [grid, setGrid] = useState(emptyGrid);

  const copyGrid = (grid) => {
    return grid.map((row) => [...row]);
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newGrid = copyGrid(grid);
    newGrid[rowIndex][colIndex] = value ? parseInt(value, 10) : 0;
    setGrid(newGrid);
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
    const isValidPuzzle = (currentGrid) => {
      // Check rows and columns for duplicates
      for (let i = 0; i < 9; i++) {
        let rows = new Set();
        let columns = new Set();
        for (let j = 0; j < 9; j++) {
          if (currentGrid[i][j] > 0) {
            if (rows.has(currentGrid[i][j])) return false; // duplicate in row
            rows.add(currentGrid[i][j]);
          }
          if (currentGrid[j][i] > 0) {
            if (columns.has(currentGrid[j][i])) return false; // duplicate in column
            columns.add(currentGrid[j][i]);
          }
        }
      }

      // Check 3x3 grids for duplicates
      for (let x = 0; x < 9; x += 3) {
        for (let y = 0; y < 9; y += 3) {
          let grid = new Set();
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              let value = currentGrid[x + i][y + j];
              if (value > 0) {
                if (grid.has(value)) return false; // duplicate in 3x3 grid
                grid.add(value);
              }
            }
          }
        }
      }

      return true; // No duplicates found, puzzle is valid
    };

    const newGrid = copyGrid(grid);
    if (isValidPuzzle(newGrid)) {
      if (solveSudoku(newGrid)) {
        setGrid(newGrid); // Update the grid with the solution
      } else {
        alert("No solution exists for the provided grid.");
      }
    } else {
      alert("Invalid puzzle: duplicates found in a row, column, or 3x3 grid.");
    }
  };

  const handleClearClick = () => {
    setGrid(emptyGrid); // Reset the grid to the initial empty state
  };

  return (
    <div className='max-w-lg'>
      <div className='m-auto'>
        <button
          className='ml-4 border rounded-lg m-2 p-2 bg-slate-400 text-white '
          onClick={handleSolveClick}
        >
          Solve Sudoku
        </button>
        <button
          className='ml-4 border rounded-lg m-2 p-2 bg-slate-400 text-white '
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: "5px",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type='number'
              min='0'
              max='9'
              value={value || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              className='border p-2 text-center rounded-xl '
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuSolver;
