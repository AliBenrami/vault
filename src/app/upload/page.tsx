"use client";
import Nav from "@/components/nav";
import Upload from "@/components/upload";

const UploadPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-4 justify-center items-center">
      <Nav />
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
        <Upload />
      </div>
    </div>
  );
};

export default UploadPage;
