import React, {useState} from 'react';
import produce from 'immer';

const numberRows = 40
const numberCols = 40

const ops = [
  [0, 1],
  [0, -1],
  [1, -1]
  [-1, 1]
  [1, 0]
  [-1, 0]
  [1, 1]
  [-1, -1]
]

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

  const [active, setActive] = useState(false)

  // using useRef to be able to use the current value of active in function
  const activeRef = useRef(active)
  activeRef.current = active

  const activeSim = useCallback(() => {
    if(!active.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for(let i = 0; i < numberRows; i++) {
          for(let k = 0; k < numberCols; k++) {
            let neighbors = 0;

          }
        }
      })
    })

  })
  
  return (
    <>
      <button onClick={() => {
        setActive(!active)
      }}>{active ? 'stop' : 'start'}</button>
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
              gridCopy[i][k] = grid[i][k] ? 0 : 1
            });
            setGrid(newGrid)
          }}
          >
          </div>
        )))}
      </div>
    </>
  );
}

export default App;
