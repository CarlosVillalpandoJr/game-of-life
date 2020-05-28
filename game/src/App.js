import React, { useState, useRef, useCallback } from 'react';
import produce from 'immer';

const numberRows = 40
const numberCols = 40

const ops = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 0],
  [-1, 0],
  [1, 1],
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
    if(!activeRef.current) {
      return;
    }

    setGrid(g => {
      // produce 'produces' and new grid and updates the grid
      return produce(g, gridCopy => {
        // double for loop going through every cell of grid
        for(let i = 0; i < numberRows; i++) {
          for(let k = 0; k < numberCols; k++) {
            // checking the number of neighbors each cell has
            let neighbors = 0;
            ops.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y
                if (newI >= 0 && newI < numberRows && newK >= 0 && newK < numberCols) {
                  neighbors += g[newI][newK]
                }
            })
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })
    setTimeout(activeSim, 1000)
  }, [])
  
  return (
    <>
      <button onClick={() => {
        setActive(!active)
        if(!active) {
          activeRef.current = true
          activeSim()
        }
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
