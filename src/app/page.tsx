import Chat from "@/components/chat";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 p-4 overflow-hidden">
      <Nav />
      <Chat />
    </div>
  );
}
