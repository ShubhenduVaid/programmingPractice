import { ChangeEvent } from "react";

import "./TextEditSelect.css";

interface TextEditSelectProps {
  value: "Low" | "Medium" | "High";
  isEdit: boolean;
  handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
export default function TextEditSelect({
  value,
  isEdit,
  handleOnChange,
}: TextEditSelectProps) {
  const priorityColor = {
    Low: "blue",
    Medium: "green",
    High: "red",
  };
  return (
    <div className="textEditSelectContainer">
      {isEdit ? (
        <select value={value} onChange={handleOnChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      ) : (
        <strong style={{ color: priorityColor[value] }}>{value}</strong>
      )}
    </div>
  );
}
