import { Upload, FileText, Brain, Leaf } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemedCard from "@/components/ThemedCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CVUploadCard = () => {
  const { theme } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const icons = {
    newspaper: FileText,
    zen: Leaf,
    cyber: Brain,
  };

  const Icon = icons[theme];

  return (
    <ThemedCard variant="highlight" className="h-full">
      <div className="mb-4">
        <h3 className={`flex items-center gap-2 text-lg font-semibold mb-1 ${
          theme === "cyber" ? "text-primary cyber-mono uppercase" : ""
        }`}>
          <Icon className={`w-5 h-5 ${theme === "cyber" ? "text-primary" : "text-primary"}`} />
          {theme === "cyber" ? "UPLOAD_CV" : theme === "zen" ? "Share Your Resume" : "Upload Your CV"}
        </h3>
        <p className={`text-sm ${theme === "cyber" ? "cyber-mono text-muted-foreground" : "text-muted-foreground"}`}>
          {theme === "cyber" 
            ? "> Submit resume for neural analysis"
            : theme === "zen"
              ? "Let us help you present your best self"
              : "Submit your curriculum vitae for expert analysis"
          }
        </p>
      </div>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed p-8 text-center transition-all
          ${theme === "zen" ? "rounded-xl" : ""}
          ${isDragOver 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
          }
        `}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className={`w-12 h-12 mx-auto mb-4 ${
          isDragOver ? "text-primary" : "text-muted-foreground"
        } ${theme === "cyber" && isDragOver ? "cyber-pulse" : ""}`} />
        
        {fileName ? (
          <div className="space-y-2">
            <p className={`text-lg font-semibold ${theme === "cyber" ? "text-primary cyber-mono" : "text-foreground"}`}>
              {fileName}
            </p>
            <p className={`text-sm ${theme === "cyber" ? "cyber-mono" : ""} text-muted-foreground`}>
              {theme === "cyber" ? "FILE_READY" : "File ready for analysis"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className={`text-lg font-semibold ${theme === "cyber" ? "cyber-mono uppercase text-primary" : ""}`}>
              {theme === "cyber" ? "DROP_FILE_HERE" : "Drop your CV here"}
            </p>
            <p className={`text-sm text-muted-foreground ${theme === "cyber" ? "cyber-mono" : ""}`}>
              {theme === "cyber" ? "or click to browse • .PDF .DOC .DOCX" : "or click to browse • PDF, DOC, DOCX"}
            </p>
          </div>
        )}
      </div>
      
      <Button 
        variant={theme === "cyber" ? "default" : "default"} 
        className={`w-full mt-4 ${theme === "cyber" ? "cyber-mono uppercase" : ""}`}
        size="lg"
      >
        {theme === "cyber" ? "ANALYZE_RESUME" : theme === "zen" ? "Begin Analysis" : "Analyze Resume"}
      </Button>
    </ThemedCard>
  );
};

export default CVUploadCard;
