import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeVariant = "newspaper" | "zen" | "cyber";

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  themeName: string;
  themeTagline: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeInfo: Record<ThemeVariant, { name: string; tagline: string }> = {
  newspaper: {
    name: "The Career Chronicle",
    tagline: "Your Daily Companion for Professional Success",
  },
  zen: {
    name: "Mindful Career",
    tagline: "Find Your Path with Peace and Clarity",
  },
  cyber: {
    name: "CyberHunt AI",
    tagline: "Neural Networks. Perfect Matches. Zero Stress.",
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeVariant>(() => {
    const saved = localStorage.getItem("career-theme");
    return (saved as ThemeVariant) || "newspaper";
  });

  useEffect(() => {
    localStorage.setItem("career-theme", theme);

    // Remove all theme classes
    document.documentElement.classList.remove("theme-newspaper", "theme-zen", "theme-cyber");
    // Add current theme class
    document.documentElement.classList.add(`theme-zen`);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themeName: themeInfo[theme].name,
        themeTagline: themeInfo[theme].tagline,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
