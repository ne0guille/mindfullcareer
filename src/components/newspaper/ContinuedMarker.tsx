import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ContinuedMarkerProps {
  to: string;
  page?: string;
  className?: string;
}

const ContinuedMarker = ({ to, page = "next page", className = "" }: ContinuedMarkerProps) => {
  return (
    <Link 
      to={to} 
      className={`inline-flex items-center gap-1 text-xs font-typewriter uppercase tracking-wider text-stamp-red hover:underline ${className}`}
    >
      <span className="italic">(Continued on {page})</span>
      <ChevronRight className="w-3 h-3" />
    </Link>
  );
};

export default ContinuedMarker;
