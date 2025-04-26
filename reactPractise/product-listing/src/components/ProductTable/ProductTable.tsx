import ProductListingHeader from "../ProductListingHeader";
import ProductRow from "../ProductRow";

interface Product {
  category?: string;
  price: string;
  stocked: boolean;
  name: string;
}
interface ProductTableProps {
  readonly type: string;
  readonly list: Array<Product>;
}

export default function ProductTable({ type, list }: ProductTableProps) {
  return (
    <>
      <ProductListingHeader>{type}</ProductListingHeader>
      {list &&
        list.map(({ price, stocked, name }, index) => {
          return (
            <ProductRow
              key={index}
              price={price}
              stocked={stocked}
              name={name}
            />
          );
        })}
    </>
  );
}
