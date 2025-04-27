import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  readonly handleSubmit: (e: string) => void;
}

export default function SearchBar({ handleSubmit }: SearchBarProps) {
  const [value, setValue] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search.."
        value={value}
        onChange={handleChange}
      />
      <button onClick={() => handleSubmit(value)}>Submit</button>
    </>
  );
}
