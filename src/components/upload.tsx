import { Button } from "@/components/ui/button";
import { AlertCircle, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface alertInterface {
  alert: string;
  type: "success" | "error";
}

const Upload = () => {
  const [alertList, setAlertList] = useState<alertInterface[]>([]);
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
        setAlertList([
          ...alertList,
          { alert: "File uploaded successfully", type: "success" },
        ]);
      } else {
        setAlertList([...alertList, { alert: data.error, type: "error" }]);
      }
    } catch (error) {
      setAlertList([
        ...alertList,
        { alert: "An error occurred while uploading the file", type: "error" },
      ]);
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

  useEffect(() => {
    if (alertList.length > 0) {
      const interval = setInterval(() => {
        setAlertList((prev) => prev.slice(1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [alertList]);

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
      <h2 className="text-sm text-red-700">PDF only</h2>
      <input
        onChange={handleChange}
        multiple={false}
        ref={fileInputRef}
        type="file"
        hidden
      />
      <div className="fixed bottom-0 right-0 p-4 ">
        {alertList.length > 0 &&
          alertList.map((alert, index) => (
            <Alert
              variant={alert.type === "success" ? "success" : "destructive"}
              key={index}
              className="mb-2 hover:scale-105 transition-all duration-300"
            >
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{alert.alert}</AlertDescription>
            </Alert>
          ))}
      </div>
    </div>
  );
};

export default Upload;
