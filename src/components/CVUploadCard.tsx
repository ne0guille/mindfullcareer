import { Upload, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <Card variant="headline" className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-stamp-red" />
          Upload Your CV
        </CardTitle>
        <CardDescription>
          Submit your curriculum vitae for expert analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded p-8 text-center transition-all
            ${isDragOver 
              ? 'border-stamp-red bg-stamp-red/5' 
              : 'border-rule-light hover:border-rule-dark'
            }
          `}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-stamp-red' : 'text-ink-faded'}`} />
          
          {fileName ? (
            <div className="space-y-2">
              <p className="font-display text-lg text-headline">{fileName}</p>
              <p className="text-sm text-ink-faded">File ready for analysis</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-display text-lg text-headline">
                Drop your CV here
              </p>
              <p className="text-sm text-ink-faded">
                or click to browse • PDF, DOC, DOCX
              </p>
            </div>
          )}
        </div>
        
        <Button variant="newspaper" className="w-full mt-4" size="lg">
          Analyze Resume
        </Button>
      </CardContent>
    </Card>
  );
};

export default CVUploadCard;
