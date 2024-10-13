import { ChatsSidebar } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats | Faceb",
  description: "Feceb | Social Network",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-white p-2 rounded-lg max-w-[1317px] px-4 mx-auto h-[calc(100vh-90px)] md:h-[650px]">
      <ChatsSidebar />
      {children}
    </div>
  );
};

export default Layout;
