import { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
  const url = "http://localhost:3000/";

  const [input, setInput] = useState<number>(0);
  const [isPrime, setIsPrime] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);

  function handleTextChange(event: ChangeEvent<HTMLInputElement>): void {
    setIsShown(false);
    setInput(event.target.value as unknown as number);
  }

  async function handleButtonClick(): Promise<void> {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ number: input }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setIsPrime(json.response.prime);
      setIsShown(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="container">
      <div>
        <input
          type="number"
          onChange={handleTextChange}
          value={input}
          placeholder="Enter your Number.."
        />
        <button onClick={handleButtonClick}>Submit</button>
      </div>
      {isShown &&
        (isPrime
          ? `${input} is a prime number`
          : `${input} is not a prime number`)}
    </div>
  );
}

export default App;
