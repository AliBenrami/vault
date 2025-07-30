import { Button } from "@/components/ui/button";
import { AlertCircle, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Upload = () => {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const frames = ["uploading...", "uploading..", "uploading.", "uploading.."];

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isUploading) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while uploading the file");
    }
    setIsUploading(false);
  };

  const uploadAnimation = useCallback(() => {
    if (!isUploading) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 500);
    return () => clearInterval(interval);
  }, [isUploading]);

  useEffect(() => {
    uploadAnimation();
  }, [uploadAnimation]);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 justify-center items-center">
      <Button
        variant="outline"
        className="w-56 h-24 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
        onClick={handleUpload}
      >
        <UploadCloud />
        {isUploading ? frames[currentFrame] : "Upload"}
      </Button>
      <input
        onChange={handleChange}
        multiple={false}
        ref={fileInputRef}
        type="file"
        hidden
      />
      <div className="fixed bottom-0 right-0 p-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Upload;
