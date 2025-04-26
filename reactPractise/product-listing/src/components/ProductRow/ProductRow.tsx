interface ProductRowProps {
  readonly category?: string;
  readonly price: string;
  readonly stocked: boolean;
  readonly name: string;
}
export default function ProductRow({ price, stocked, name }: ProductRowProps) {
  return (
    <div className="text-center grid grid-cols-2 gap-2">
      {stocked ? (
        <span>{name}</span>
      ) : (
        <span className="text-red-700">{name}</span>
      )}
      <span>{price}</span>
    </div>
  );
}
