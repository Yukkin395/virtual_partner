interface DividerProps {
  children?: React.ReactNode;
}

export const Divider = ({ children }: DividerProps) => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    {children && (
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500">{children}</span>
      </div>
    )}
  </div>
);
