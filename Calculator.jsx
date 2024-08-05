import React, {useState} from "react";

function Calculator(){

    const[display,setDisplay]=useState("0");
    const[num1,setNum1]=useState(0);
    const[num2,setNum2]=useState(0);
    const[operator,setOperator]=useState("")

   
    function buttonClick(event){
        const value=event.target.value;
        if(value==="+"||value==="-"||value==="×"|| value==="÷"){
            setOperator(value);
            if(num1===0 && num2===0){
                setOperator(value);
                setNum1(display);
                setNum2(0);
            }
        }
        if(!isNaN(value)||operator===""){
            setDisplay(prev => prev === "0" ? value : prev + value);
        }
        else if (value === ".") {
            if (!display.includes(".")) {
              setDisplay((prev) => prev + value);
            }
        }
        if(num1!==0 && operator!=="" && num2===0){
            setNum2(extractNum2());
            
        }
    }
    function extractNum2() {
        const operatorIndex = display.indexOf(operator);
        if (operatorIndex !== -1) {
          const num2String = display.slice(operatorIndex + 1);
          if (num2String !== "") {
            return parseFloat(num2String.trim());
          }
        }
      }
    function clearDisplay(){
        setDisplay("0");
        setNum1(0);
        setNum2(0);
        setOperator("")
    }
    function deleteCharacter(){
        setDisplay(display.slice(0,-1));

    }
    
    
    //=
    function handleEqualTo() {
        if (num1 !== 0 && operator !== "") {
          const newNum2 = extractNum2();
          let result = calculate(parseFloat(num1), newNum2, operator);
          
          if(result.toString().length>=9){
            setDisplay(result.toFixed(9).toString());
          }
          else{
            setDisplay(result.toString());
          }
          setNum1(result);
          setNum2(0);
          setOperator("");
          console.log(num1,operator,num2);
        }
      }

    function calculate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "×":
                return num1 * num2;
            case "÷":
                if(num2===0){
                    return "Good try";
                }
                return num1 / num2;
            default:
                return num2;
        }
    }
    //
    return(
        <div className="calculator">
        <div className="container container1">
            <div className="top-left">
                <h1>Casio</h1>
                <p>fx-991ES PLUS</p>
                <p>NATURAL-V.P.A.M.</p>
            </div>
            <div className="top-right">
                <div className="solar">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="edition">2nd edition</div>
            </div>
        </div>
        <div className="container container2">
            <div className="main-display">
                {display}
            </div>
        </div>
        
        
        <div className="container container4">
            <div className="row3">
                <div className="seven">
                    
                    <button onClick={buttonClick} value={7}>7</button>
                </div>
                <div className="eight">
                    
                    <button onClick={buttonClick} value={8}>8</button>
                </div>
                <div className="nine">
                    
                    <button onClick={buttonClick} value={9}>9</button>
                </div>
                <div className="delete">
                    
                    <button onClick={deleteCharacter}>DEL</button>
                </div>
                <div className="clear">
                    
                    <button onClick={clearDisplay}>AC</button>
                </div>
            </div>
            <div className="row3">
                <div className="four">
                    
                    <button onClick={buttonClick} value={4}>4</button>
                </div>
                <div className="five">
                    
                    <button onClick={buttonClick} value={5}>5</button>
                </div>
                <div className="six">
                    
                    <button onClick={buttonClick} value={6}>6</button>
                </div>
                <div className="multiply">
                    
                    <button onClick={buttonClick} value={"×"}>&times;</button>
                </div>
                <div className="divide">
                    
                    <button onClick={buttonClick} value={"÷"}>&divide;</button>
                </div>
            </div>
            <div className="row4">
                <div className="one">
                    
                    <button onClick={buttonClick} value={1}>1</button>
                </div>
                <div className="two">
                    
                    <button onClick={buttonClick} value={2}>2</button>
                </div>
                <div className="three">
                    
                    <button onClick={buttonClick} value={3}>3</button>
                </div>
                <div className="addition">
                    
                    <button onClick={buttonClick} value={"+"}>+</button>
                </div>
                <div className="subtraction">
                    
                    <button onClick={buttonClick} value={"-"}>-</button>
                </div>
            </div>
            <div className="row5">
                <div className="zero">
                    
                    <button onClick={buttonClick} value={0}>0</button>
                </div>
                <div className="decimal">
                    
                    <button onClick={buttonClick} value={"."}>.</button>
                </div>
                <div className="ten-power">
                    
                    <button>&times;10</button>
                </div>
                <div className="answer">
                    
                    <button>Ans</button>
                </div>
                <div className="equalto">
                    
                    <button onClick={handleEqualTo}>=</button>
                </div>
    
            </div>
            
        </div>
        </div>
    );
} 
export default Calculator;