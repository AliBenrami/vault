"use client";
import ThemeButton from "@/components/theme-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MessageCircle, UploadCloud } from "lucide-react";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center gap-2 w-full p-4 justify-end">
      <Button
        variant="outline"
        className="rounded-p-2 hover:scale-105 active:scale-95 transition-all duration-300"
        onClick={() => router.push("/")}
      >
        <MessageCircle className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="rounded-p-2 hover:scale-105 active:scale-95 transition-all duration-300"
        onClick={() => router.push("/upload")}
      >
        <UploadCloud className="w-4 h-4" />
      </Button>
      <ThemeButton />
    </div>
  );
};

export default Nav;
