interface CellProps {
  readonly children: React.ReactNode;
  readonly onClick: () => void;
}

export default function Cell({ children, onClick }: CellProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-25 h-25 text-gray-900 border border-gray-800 font-large text-xl px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
    >
      {children}
    </button>
  );
}
