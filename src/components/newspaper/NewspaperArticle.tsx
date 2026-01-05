import { ReactNode } from "react";

interface NewspaperArticleProps {
  headline: string;
  subheadline?: string;
  byline?: string;
  dateline?: string;
  children: ReactNode;
  image?: string;
  imageCaption?: string;
  columns?: 1 | 2 | 3;
  featured?: boolean;
  className?: string;
}

const NewspaperArticle = ({
  headline,
  subheadline,
  byline = "Staff Reporter",
  dateline,
  children,
  image,
  imageCaption,
  columns = 1,
  featured = false,
  className = "",
}: NewspaperArticleProps) => {
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className={`relative ${className}`}>
      {/* Headline */}
      <header className={`mb-4 ${featured ? "text-center" : ""}`}>
        {featured && (
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-3xl">★</span>
            <span className="font-typewriter text-xs uppercase tracking-[0.3em] text-stamp-red">
              Special Feature
            </span>
            <span className="text-3xl">★</span>
          </div>
        )}
        
        <h2 className={`font-display font-black leading-none tracking-tight text-headline ${
          featured ? "text-4xl md:text-5xl mb-3" : "text-2xl md:text-3xl mb-2"
        }`}>
          {headline}
        </h2>
        
        {subheadline && (
          <p className={`font-serif italic text-subheadline ${featured ? "text-xl" : "text-lg"}`}>
            {subheadline}
          </p>
        )}
        
        <div className={`flex items-center gap-4 mt-3 text-xs font-typewriter text-ink-faded uppercase tracking-wider ${
          featured ? "justify-center" : ""
        }`}>
          <span className="flex items-center gap-1">
            By <span className="font-semibold text-headline">{byline}</span>
          </span>
          <span>•</span>
          <span>{dateline || today}</span>
        </div>
        
        <div className={`newspaper-rule-ornate mt-3 ${featured ? "" : "w-1/2"}`} />
      </header>
      
      {/* Image if provided */}
      {image && (
        <figure className="mb-4 border-4 border-double border-headline p-1 bg-card">
          <img src={image} alt={headline} className="w-full grayscale contrast-125" />
          {imageCaption && (
            <figcaption className="mt-2 text-xs text-center font-typewriter text-ink-faded italic border-t border-rule-light pt-2">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      )}
      
      {/* Content with optional columns */}
      <div className={`
        font-serif text-foreground leading-relaxed
        ${columns === 2 ? "md:columns-2 md:gap-6" : ""}
        ${columns === 3 ? "md:columns-3 md:gap-4" : ""}
      `}>
        {children}
      </div>
    </article>
  );
};

export default NewspaperArticle;
