interface ButtonProps {
  readonly children: React.ReactNode;
}

export function MyButton({ children }: ButtonProps) {
  return <button>{children}</button>;
}
