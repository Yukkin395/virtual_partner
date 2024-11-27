import { Link } from "react-router-dom";

export const FooterLinkItem = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link
    to={to}
    className="flex flex-col items-center text-center justify-center hover:scale-110 w-1/5 h-16 border-r border-gray-300 transition-transform duration-300 ease-in-out"
  >
    <Icon className="w-10 h-10 mb-1" />
    <span className="text-xs text-gray-800">{label}</span>
  </Link>
);
