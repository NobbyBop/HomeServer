import "./index.css";
import { useState, useEffect, useRef } from "react";

const GRID_WIDTH = 5
export function App() {

  let [counter, setCounter] = useState(0);
  let [target, setTarget] = useState(Math.floor((Math.random()*100)/4));
  let [displayMessage, setDisplayMessage] = useState("");
  let [milliseconds, setMilliseconds] = useState(0);
  let [showResetButton, setShowResetButton] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(
    ()=>{
      if(counter == 0){
        setDisplayMessage("Click the square to start.")
      } else if (counter < 10){
        setDisplayMessage("Click the square.")
        intervalRef.current = setInterval(() => {
          setMilliseconds(milliseconds+1);
        }, 1)
      } else if (counter >= 10){
        setDisplayMessage("Alright you're done.")
        setShowResetButton(true);
        setTarget(26);
      }
       return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    },
    [counter, milliseconds]
  )

  function createGridItem(i: number) {
    return (
      <button 
        key={`button${i}`}
        onClick={() => handleClick(i)}
        style={{
          width: '7.5rem',
          height: '7.5rem',
          border: i === target ? '2px solid' : undefined
          }}
        />
      );
    }

  function doReset(){
    setShowResetButton(false);
    setMilliseconds(0);
    setCounter(0);
    setTarget(Math.floor((Math.random()*100)/4))
  }

  let gridItems = []
  for(let i=0; i<GRID_WIDTH*GRID_WIDTH; i+=1){
    gridItems.push(createGridItem(i));
  }

  function handleClick(i:number){
    if(target == i){
      setCounter(counter+1);
      setTarget(Math.floor((Math.random()*100)/4));
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">COUNTER: {counter}</h1>
      <h1 className="text-2xl">TIMER: {milliseconds} ms</h1>

      {showResetButton && (<button className="w-30 h-30 border-2" onClick={()=>doReset()}>RESET</button>)}
      {/* <h1 className="text-2xl">TARGET: {target}</h1> */}
      <h1 className="text-2xl">{displayMessage}</h1>
      <div className={`grid grid-cols-5 gap-5`}>
        {gridItems.map((item) => {return item})}
      </div>
      <p></p>
    </div>
  );
}

export default App;
