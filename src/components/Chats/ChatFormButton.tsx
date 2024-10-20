"use client";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";


const ChatFormButton = ({ value }: { value: string }) => {
  const { pending } = useFormStatus();


  return (
    <Button
      type="submit"
      disabled={value === "" || pending}
      className="bg-main hover:bg-main/80"
    >
      <Send size={16} />
    </Button>
  );
};

export default ChatFormButton;
