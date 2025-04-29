import { ChangeEvent, useState } from "react";

interface SelectBarProps {
  readonly handleSubmit: (e: string) => void;
}

export default function SelectBar({ handleSubmit }: SelectBarProps) {
  const [value, setValue] = useState<string>("Orange");
  const options = ["Apple", "Banana", "Orange"];

  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    setValue(event.target.value);
  }

  return (
    <>
      <select value={value} onChange={handleChange}>
        {options?.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
      <button onClick={() => handleSubmit(value)}>Submit</button>
    </>
  );
}
