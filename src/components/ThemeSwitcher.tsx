 import { useState, useEffect } from "react";
 import { motion } from "framer-motion";
 import { Leaf, Newspaper, Zap } from "lucide-react";
 
 type Theme = "zen" | "chronicle" | "cyber";
 
 interface ThemeOption {
   id: Theme;
   name: string;
   icon: typeof Leaf;
   color: string;
 }
 
 const themes: ThemeOption[] = [
   { id: "zen", name: "Zen Garden", icon: Leaf, color: "text-accent-emerald" },
   { id: "chronicle", name: "Chronicle", icon: Newspaper, color: "text-accent-amber" },
   { id: "cyber", name: "CyberHunt", icon: Zap, color: "text-accent-blue" },
 ];
 
 const ThemeSwitcher = () => {
   const [currentTheme, setCurrentTheme] = useState<Theme>("zen");
 
   useEffect(() => {
     // Check for saved theme
     const saved = localStorage.getItem("app-theme") as Theme | null;
     if (saved && themes.find((t) => t.id === saved)) {
       setCurrentTheme(saved);
       applyTheme(saved);
     }
   }, []);
 
   const applyTheme = (theme: Theme) => {
     const root = document.documentElement;
     // Remove all theme classes
     root.classList.remove("theme-zen", "theme-chronicle", "theme-cyber");
     // Add new theme class
     root.classList.add(`theme-${theme}`);
   };
 
   const handleThemeChange = (theme: Theme) => {
     setCurrentTheme(theme);
     applyTheme(theme);
     localStorage.setItem("app-theme", theme);
   };
 
   return (
     <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
       {themes.map((theme) => {
         const isActive = currentTheme === theme.id;
         const Icon = theme.icon;
         return (
           <motion.button
             key={theme.id}
             onClick={() => handleThemeChange(theme.id)}
             className={`relative p-2 rounded-full transition-colors ${
               isActive ? "text-primary-foreground" : `${theme.color} hover:bg-muted`
             }`}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             title={theme.name}
           >
             {isActive && (
               <motion.div
                 layoutId="theme-indicator"
                 className="absolute inset-0 rounded-full bg-primary"
                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
               />
             )}
             <Icon className="w-4 h-4 relative z-10" />
           </motion.button>
         );
       })}
     </div>
   );
 };
 
 export default ThemeSwitcher;