import { ChangeEvent, useState } from "react";

import "./App.css";

function App() {
  const [startValue, setStartValue] = useState<number>(0);
  const [endValue, setEndValue] = useState<number>(0);
  const [result, setResult] = useState<Array<number | string>>([]);

  const url = "http://localhost:3000";

  function handleStartOnChange(event: ChangeEvent<HTMLInputElement>): void {
    setStartValue(+event.target.value);
  }

  function handleEndOnChange(event: ChangeEvent<HTMLInputElement>): void {
    setEndValue(+event.target.value);
  }

  async function handleOnClick(): Promise<void> {
    try {
      const response = await fetch(url, {
        body: JSON.stringify({ start: startValue, end: endValue }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error with Request");
      }
      const json = await response.json();
      setResult(json.response.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div>
        <input
          type="number"
          placeholder="Enter Start Number"
          value={startValue}
          onChange={handleStartOnChange}
        />
        <input
          type="number"
          placeholder="Enter End Number"
          value={endValue}
          onChange={handleEndOnChange}
        />
        <button onClick={handleOnClick}>Submit</button>
      </div>
      {result.length > 0 && <span>{result.join(" , ")}</span>}
    </div>
  );
}

export default App;
