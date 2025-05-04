interface TextIsBoldProps {
  value: string;
  isBold: boolean;
}

export default function TextIsBold({ value, isBold }: TextIsBoldProps) {
  return <>{isBold ? <strong>{value}</strong> : <p>{value}</p>}</>;
}
