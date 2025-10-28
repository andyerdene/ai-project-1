"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";

export const ChatInterface = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const onSendChat = async () => {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat: input }),
    });
    const data = await response.json();
    if (data) {
      setResponse(data.message);
    }
  };

  return (
    <div className="absolute right-9 bottom-9">
      <Drawer direction="right">
        <DrawerTrigger>
          <img src="/chat-icon.svg" alt="" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            {response && <p>{response}</p>}
            <Input onChange={(e) => setInput(e.target.value)} value={input} />
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onSendChat}>Send</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
