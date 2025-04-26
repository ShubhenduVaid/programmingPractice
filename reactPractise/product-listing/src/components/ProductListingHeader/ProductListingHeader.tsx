interface ProductListingHeaderProps {
  readonly children: React.ReactNode;
}

export default function ProductListingHeader({
  children,
}: ProductListingHeaderProps) {
  return <div className="text-center font-bold">{children}</div>;
}
