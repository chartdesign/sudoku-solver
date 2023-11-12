import SudokuInput from "./components/SudokuInput";

export default function App() {
  return (
    <main className='text-center'>
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className='app'>
        <h1 className='text-4xl font-bold m-8'>
          Welcome to <span className='orange_gradient'>SudokuCruncher</span>
        </h1>
        <h2 className='max-w-lg text-lg font-light'>
          Unleash the power of SudokuCruncher. Whether you're a Sudoku novice or
          a seasoned pro, SudokuCruncher offers a seamless, enjoyable experience
          that transforms you into a puzzle-solving champion. Get ready to
          crunch numbers like never before!
        </h2>
        <p className='m-4'>
          Input your puzzle and I will see if I can solve it for you...
        </p>

        <SudokuInput />
      </div>
    </main>
  );
}
