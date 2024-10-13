"use client";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const ChatForm = () => {
  const [value, setValue] = useState("");

  const handleSend = () => {
      console.log(value);
      
      setValue("")
  };

  return (
    <form className="p-3 flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message..."
      />
      <Button
        onClick={handleSend}
        type="button"
        disabled={value === ""}
        className="bg-main hover:bg-main/80"
      >
        <Send size={16} />
      </Button>
    </form>
  );
};

export default ChatForm;
