import { useState } from "react";
function Calculator(){
    const[num1,setNum1]=useState('');
    const[num2,setNum2]= useState('');
    const[result,setResult]=useState(null);
    const add=()=>setResult(Number(num1)+Number(num2));
    return(
        <div>
            <h3>Simple Calculator </h3>
            <input
            type="number"
            placeholder="First Number"
            value={num1}
            onChange={(e)=>setNum1(e.target.value)}
           data-testid="num1"
            />

             <input
            type="number"
            placeholder="Second Number"
            value={num2}
            onChange={(e)=>setNum2(e.target.value)}
           data-testid="num2"
            />

            <button onClick={add}>Add</button>

           {result !== null && (
        <h3 data-testid="result">Result: {result}</h3>
      )}

        </div>
    )
}
export default Calculator