import { Upload, Leaf } from "lucide-react";
import ThemedCard from "@/components/ThemedCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CVUploadCard = () => {
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

  return (
    <ThemedCard variant="highlight" className="h-full">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-1">
          <Leaf className="w-5 h-5 text-primary" />
          Share Your Resume
        </h3>
        <p className="text-sm text-muted-foreground">
          Let us help you present your best self
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed p-8 text-center transition-all rounded-xl
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
        }`} />

        {fileName ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">
              {fileName}
            </p>
            <p className="text-sm text-muted-foreground">
              File ready for analysis
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-semibold">
              Drop your CV here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse • PDF, DOC, DOCX
            </p>
          </div>
        )}
      </div>

      <Button
        variant="default"
        className="w-full mt-4"
        size="lg"
      >
        Begin Analysis
      </Button>
    </ThemedCard>
  );
};

export default CVUploadCard;
