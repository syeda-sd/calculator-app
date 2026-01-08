import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark"); // default dark

  // Button click handler
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear input
  const handleClear = () => setInput("");

  // Delete last character
  const handleDelete = () => setInput(input.slice(0, -1));

  // Calculate result
  const handleEqual = () => {
    try {
      // Advanced functions: sin, cos, tan, sqrt, power, %
      let expression = input
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/√/g, "Math.sqrt")
        .replace(/\^/g, "**")
        .replace(/%/g, "*0.01");

      setInput(eval(expression).toString());
    } catch {
      setInput("Error");
    }
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Buttons layout
  const buttons = [
    "C", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=", "^",
    "sin", "cos", "tan", "√"
  ];

  // Button click dispatcher
  const handleButtonClick = (btn) => {
    if (btn === "C") handleClear();
    else if (btn === "DEL") handleDelete();
    else if (btn === "=") handleEqual();
    else handleClick(btn);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="calculator">
        {/* Heading & description */}
        <h1>Calculator-App</h1>
        <p>
          Perform basic and scientific calculations with ease. Responsive design for desktop and mobile.Build by: Sidra Gillani🦋
        </p>

        {/* Display */}
        <div className="display">{input || "0"}</div>

        {/* Theme toggle */}
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Buttons grid */}
        <div className="buttons">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={
                btn === "="
                  ? "equal"
                  : btn.match(/[+\-*/^%]/)
                  ? "operator"
                  : btn.match(/sin|cos|tan|√/)
                  ? "function"
                  : ""
              }
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
