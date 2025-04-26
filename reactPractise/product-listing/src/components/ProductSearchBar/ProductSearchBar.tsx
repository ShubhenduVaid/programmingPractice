interface ProductSearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  handleTextChange: (e: string) => void;
  handleCheckBoxChange: (e: boolean) => void;
}
export default function ProductSearchBar({
  filterText,
  inStockOnly,
  handleTextChange,
  handleCheckBoxChange,
}: ProductSearchBarProps) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => handleCheckBoxChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}
