interface PullQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

const PullQuote = ({ quote, attribution, className = "" }: PullQuoteProps) => {
  return (
    <blockquote className={`relative my-6 mx-4 px-6 py-4 ${className}`}>
      {/* Decorative borders */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-headline to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-headline to-transparent" />
      
      {/* Large quotation marks */}
      <span className="absolute -top-4 left-2 text-6xl font-display text-stamp-red/30 leading-none">
        "
      </span>
      
      <p className="font-display text-xl md:text-2xl font-bold text-headline leading-tight text-center italic">
        {quote}
      </p>
      
      {attribution && (
        <cite className="block text-center mt-3 font-typewriter text-xs uppercase tracking-wider text-ink-faded not-italic">
          — {attribution}
        </cite>
      )}
      
      <span className="absolute -bottom-4 right-2 text-6xl font-display text-stamp-red/30 leading-none rotate-180">
        "
      </span>
    </blockquote>
  );
};

export default PullQuote;
