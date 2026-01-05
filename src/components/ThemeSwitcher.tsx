import { useTheme, ThemeVariant } from "@/contexts/ThemeContext";
import { Newspaper, Leaf, Cpu } from "lucide-react";

const themes: { id: ThemeVariant; name: string; icon: typeof Newspaper; description: string }[] = [
  { id: "newspaper", name: "Chronicle", icon: Newspaper, description: "Vintage newspaper" },
  { id: "zen", name: "Zen", icon: Leaf, description: "Calm & relaxing" },
  { id: "cyber", name: "Cyber", icon: Cpu, description: "Futuristic AI" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {themes.map((t) => {
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
              ${isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-background"
              }
            `}
            title={t.description}
          >
            <t.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
