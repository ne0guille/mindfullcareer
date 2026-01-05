interface NewspaperMastheadProps {
  title?: string;
  subtitle?: string;
}

const NewspaperMasthead = ({ 
  title = "THE CAREER CHRONICLE", 
  subtitle = "Your Daily Companion for Professional Success" 
}: NewspaperMastheadProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="w-full bg-background py-6 border-b-4 border-double border-rule-dark">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Top bar with date and edition */}
        <div className="flex justify-between items-center text-sm text-ink-faded mb-4 font-serif">
          <span>{formattedDate}</span>
          <span className="font-typewriter">VOL. MMXXV • NO. 1</span>
          <span>SPECIAL EDITION</span>
        </div>
        
        {/* Decorative rule */}
        <div className="newspaper-rule-ornate mb-4" />
        
        {/* Main title */}
        <div className="text-center">
          <h1 className="masthead text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            {title}
          </h1>
          <p className="mt-2 text-subheadline italic text-lg md:text-xl font-serif">
            "{subtitle}"
          </p>
        </div>
        
        {/* Bottom decorative rule */}
        <div className="newspaper-rule-ornate mt-4" />
        
        {/* Tagline bar */}
        <div className="flex justify-center gap-8 mt-4 text-xs uppercase tracking-widest text-ink-faded font-serif">
          <span>• CV Analysis •</span>
          <span>• Job Matching •</span>
          <span>• Company Intel •</span>
        </div>
      </div>
    </header>
  );
};

export default NewspaperMasthead;
