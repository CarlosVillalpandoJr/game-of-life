import React, {useState} from 'react';
import produce from 'immer';

const numberRows = 40
const numberCols = 40

function App() {
  // useState will only run once with function
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numberRows; i++) {
      // pushing column to rows array; all values in array init to 0(dead)
      rows.push(Array.from(Array(numberCols), () => 0))
    }
    return rows
  });
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numberCols}, 20px)`
    }}
    >
      {/* have to map twice because rows is an array */}
      {grid.map((rows, i) => rows.map((col, k) => (
        <div 
        key={`${i}-${k}`}
        style={{
          backgroundColor: grid[i][k] ? "blue" : undefined,
          border: "1px solid black",
          width: 20,
          height: 20
        }}
        onClick={() => {
          // Creates an immutable change and generates a new grid
          const newGrid = produce(grid, gridCopy => {
            gridCopy[i][k] = 1
          });
          setGrid(newGrid)
        }}
        >
        </div>
      )))}
    </div>
  );
}

export default App;
