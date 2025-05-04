import { ChangeEvent } from "react";

import "./TextEditInput.css";
import TextIsBold from "../TextIsBold";

interface TextEditInputProps {
  value: string;
  isEdit: boolean;
  isBold: boolean;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextEditInput({
  value,
  isEdit,
  handleOnChange,
  isBold,
}: TextEditInputProps) {
  return (
    <div className="textEditInputContainer">
      {isEdit ? (
        <input type="text" value={value} onChange={handleOnChange} />
      ) : (
        <TextIsBold isBold={isBold} value={value} />
      )}
    </div>
  );
}
