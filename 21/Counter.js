import { useState } from "react";
function Counter(){
    const[count,setCount]=useState(0);
    const handleClick=()=>{
        setCount(prev => prev + 1);
    }
    return(
        <div>
            <h3>Count :{count}</h3>
            <p>You Clicked Button {count} Times</p>
           <button onClick={handleClick}>Click Me</button>

        </div>
    )
}
export default Counter