import { ChatsSidebar } from "@/components/Chats";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats | Faceb",
  description: "Feceb | Social Network",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className=" flex flex-col justify-between  sm:justify-normal sm:flex-row  p-2 rounded-lg max-w-[1317px] px-4  h-[calc(100svh-90px)] md:h-[750px]  sm:mx-10  xl:mx-auto">
      <ChatsSidebar isSmall={false} />
      {children}
      <ChatsSidebar isSmall={true} />
    </Card>
  );
};

export default Layout;
