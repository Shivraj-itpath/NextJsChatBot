"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Header } from "@/components/header";
import { ChatArea } from "@/components/chat-area";
import { ChatHistoryDrawer } from "@/components/chat-history-drawer";
import { SettingsDrawer } from "@/components/settings-drawer";
import { generateId } from "ai";
import { getChatResponse } from "./helper/apiHelper";

export type Conversation = {
  id: string;
  title: string;
  messages: {
    id: string;
    content: string;
    file?: any;
    role: "user" | "assistant";
    timestamp: string;
  }[];
};

export type ImageFile = {
  imagePreview: string | undefined;
  file: any;
};

export default function ChatApp() {
  // State for UI elements
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [inputText, setInputText] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<ImageFile | null>(null);

  // Chat conversations state
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Getting started with AI",
      messages: [],
    },
    {
      id: "2",
      title: "Project planning",
      messages: [
        {
          id: "msg2",
          content: "I need help planning my project",
          role: "user",
          timestamp: "Yesterday",
        },
      ],
    },
  ]);

  const [currentConversationId, setCurrentConversationId] = useState("1");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files?.[0];
      const reader = new FileReader();
      let a;
      reader.onload = (ev) => {
        a = ev?.target?.result;
      };
      reader.readAsDataURL(e.target.files[0]);

      setSelectedFile({
        imagePreview: a,
        file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (inputText.trim() === "") return;

    setInputText("");

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: generateId(),
                content: inputText,
                file: selectedFile?.file ?? null,
                role: "user",
                timestamp: currentTime,
              },
            ],
          };
        }
        return conv;
      });
    });

    var a = await getChatResponse(inputText, selectedFile?.file);
    setIsLoading(false);

    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: generateId(),
                content: a,
                file: null,
                role: "assistant",
                timestamp: currentTime,
              },
            ],
          };
        }
        return conv;
      });
    });
  };

  // Get current conversation
  const currentConversation =
    conversations.find((conv) => conv.id === currentConversationId) ||
    conversations[0];

  // Toggle functions
  const toggleChatHistory = () => setIsChatHistoryOpen(!isChatHistoryOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  // Select a conversation
  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
    setIsChatHistoryOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
      <Header
        toggleChatHistory={toggleChatHistory}
        toggleUserMenu={toggleUserMenu}
        isUserMenuOpen={isUserMenuOpen}
        setIsSettingsOpen={setIsSettingsOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* <ChatHistoryDrawer
          isOpen={isChatHistoryOpen}
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={selectConversation}
        /> */}

        <ChatArea
          conversation={currentConversation}
          fileRef={fileInputRef}
          selectedFile={selectedFile}
          handleFileClick={handleFileClick}
          handleFileChange={handleFileChange}
          input={inputText}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </div>
  );
}
