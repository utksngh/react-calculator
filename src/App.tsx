import "./App.css";
import Operators from "./components/Operators";
import Numbers from "./components/Numbers";
import Calculate from "./components/Calculate";
import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [displayValue, setDisplayValue] = useState([]); // State to hold the current display value
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [nondisplayResult, setNonDisplayResult] = useState(0);

  const operators = ["+", "-", "*", "/"];

  const handleButtonAction = (value: string) => {
    if (!(value === "C" || value === "CE" || value === "=")) {
      if (displayValue.length <= 15) {
        setDisplayValue((prevDisplayValue) => [...prevDisplayValue, value]);
      } else {

        const calculatedValue = calculation(displayValue);
        setDisplayValue([calculatedValue.toString()]); // Set result as a single-item array
        setResult(calculatedValue);
      }
    } else if (value === "CE") {
      setDisplayValue([]);
      setResult(0);
    } else if (value === "=") {
      const calculatedValue = calculation(displayValue);
      setDisplayValue([calculatedValue.toString()]); // Set result as a single-item array
      setResult(calculatedValue);
    } else {
      setDisplayValue((prevDisplayValue) => prevDisplayValue.slice(0, -1));
    }
  };

  const cleanArray = (array) => {
    let cleanedArray = [...array];
    while (cleanedArray.length > 0 && operators.includes(cleanedArray[0])) {
      cleanedArray.shift();
    }
    while (
      cleanedArray.length > 0 &&
      operators.includes(cleanedArray[cleanedArray.length - 1])
    ) {
      cleanedArray.pop();
    }
    return cleanedArray;
  };

  const calculation = (array) => {
    const stringArithmeticValue = cleanArray(array).reduce(
      (acc, current) => acc + current,
      ""
    );
    return eval(stringArithmeticValue);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
          {/* Placeholder for Display */}
          <div
            className="bg-gray-100 text-right border-b border-gray-300 p-4 flex flex-col justify-end"
            style={{ height: "100px" }} // Adjust height to fit both result and display value
          >
            {/* Result Display */}
            <div className="text-xl text-gray-700 mb-2">{displayValue.length === 1 && result ? result : ""}</div>

            {/* Display Value */}
            <div className="text-2xl">
              {displayValue.length ? displayValue.join("") : displayValue}
            </div>
          </div>

          <div className="py-2 px-4 mt-2 flex space-x-2">
            <Button value="*" onClick={handleButtonAction} />
            <Button value="/" onClick={handleButtonAction} />
            <Button value="C" onClick={handleButtonAction} />
            <Button value="CE" onClick={handleButtonAction} />
          </div>
          <div className="py-2 px-4 flex space-x-2">
            <Button value="7" onClick={handleButtonAction} />
            <Button value="8" onClick={handleButtonAction} />
            <Button value="9" onClick={handleButtonAction} />
            <Button value="-" onClick={handleButtonAction} />
          </div>
          <div className="py-2 px-4 flex space-x-2">
            <Button value="4" onClick={handleButtonAction} />
            <Button value="5" onClick={handleButtonAction} />
            <Button value="6" onClick={handleButtonAction} />
            <Button value="+" onClick={handleButtonAction} />
          </div>
          <div className="px-4 py-2 mb-2 flex space-x-2">
            <Button value="1" onClick={handleButtonAction} />
            <Button value="2" onClick={handleButtonAction} />
            <Button value="3" onClick={handleButtonAction} />
            <Button value="=" onClick={handleButtonAction} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
