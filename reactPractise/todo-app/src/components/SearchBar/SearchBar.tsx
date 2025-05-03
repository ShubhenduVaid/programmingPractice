import { ChangeEvent, useState } from "react";

import "./SearchBar.css";

interface SearchBarProps {
  handleSearch: (event: string) => void;
}

export default function SearchBar({ handleSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const searchString = event.target.value;
    setSearchValue(searchString);
    handleSearch(searchString);
  }

  return (
    <div className="searchBarContainer">
      <strong>Task Tracker</strong>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
