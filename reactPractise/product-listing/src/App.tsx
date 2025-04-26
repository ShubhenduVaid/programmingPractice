import { useEffect, useState } from "react";

import ProductSearchBar from "./components/ProductSearchBar";
import ProductTable from "./components/ProductTable";

function App() {
  const originalVGList = [
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];
  const originalFRList = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  ];

  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [vegetableProductList, setVegetableProductList] =
    useState(originalVGList);
  const [fruitProductList, setFruitProductList] = useState(originalFRList);

  useEffect(() => {
    if (!inStockOnly && filterText.length < 1) {
      setFruitProductList(originalFRList);
      setVegetableProductList(originalVGList);
    }

    if (filterText.length > 0) {
      setFruitProductList(
        fruitProductList.filter(
          (item) =>
            item.name.toLowerCase().indexOf(filterText.toLowerCase()) != -1
        )
      );
      setVegetableProductList(
        vegetableProductList.filter(
          (item) =>
            item.name.toLowerCase().indexOf(filterText.toLowerCase()) != -1
        )
      );
    }

    if (inStockOnly) {
      setFruitProductList(fruitProductList.filter((item) => item.stocked));
      setVegetableProductList(
        vegetableProductList.filter((item) => item.stocked)
      );
    }
  }, [inStockOnly, filterText]);

  return (
    <div className="w-md">
      <ProductSearchBar
        handleTextChange={(e: string) => setFilterText(e)}
        handleCheckBoxChange={(e: boolean) => setInStockOnly(e)}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
      <div className="text-center grid grid-cols-2 gap-2">
        <span className="font-bold">Name</span>
        <span className="font-bold">Price</span>
      </div>
      <ProductTable list={vegetableProductList} type="Vegetables" />
      <ProductTable list={fruitProductList} type="Fruits" />
    </div>
  );
}

export default App;
