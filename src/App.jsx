import SudokuSolver from "./components/SudokuSolver";
import SudokuInput from "./components/SudokuInput";

export default function App() {
  return (
    <>
      <h1 className='text-3xl font-bold '>Welcome to your Sudoku Solver.</h1>
      <p>Input your puzzle and I will see if I can solve it for you</p>
      {/* <SudokuSolver /> */}
      <SudokuInput />
    </>
  );
}
