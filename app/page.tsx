"use client";

import type React from "react";

import { use, useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { ChatArea } from "@/components/chat-area";
import { SettingsDrawer } from "@/components/settings-drawer";
import { generateId } from "ai";
import { getChatResponse } from "./helper/apiHelper";
import NewChat from "@/components/new-chat";

export type Conversation = {
  id: string;
  title: string;
  messages: {
    id: string;
    content: string;
    file?: File | null;
    role: "user" | "assistant";
    timestamp: string;
  }[];
};

export default function ChatApp() {
  // State for UI elements
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [inputText, setInputText] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");

  useEffect(() => {
    const savedConversationId = localStorage.getItem("conversationId");
    if (savedConversationId) {
      setCurrentConversationId(JSON.parse(savedConversationId));
    } else {
      const initialConversationId = generateId();
      setCurrentConversationId(initialConversationId);
      localStorage.setItem(
        "conversationId",
        JSON.stringify(initialConversationId)
      );
    }
  }, []);

  useEffect(() => {
    if (!currentConversationId) return;
    setConversations([
      ...conversations,
      {
        id: currentConversationId,
        title: "Getting started with AI",
        messages: [],
      },
    ]);
  }, [currentConversationId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (inputText.trim() === "") return;

    setInputText("");
    setSelectedFile(null);

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
                role: "user",
                file: selectedFile,
                timestamp: currentTime,
              },
            ],
          };
        }
        return conv;
      });
    });

    var a = await getChatResponse(
      currentConversationId,
      inputText,
      selectedFile
    );
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

  const handleNewChat = () => {
    let newChatId: string = generateId();
    setSelectedFile(null);
    setInputText("");
    setIsLoading(false);
    setConversations((prev) => [
      ...prev,
      {
        id: newChatId,
        title: `Chat ${prev.length + 1}`,
        messages: [],
      },
    ]);
    setCurrentConversationId(newChatId);
    localStorage.setItem("conversationId", JSON.stringify(newChatId));
  };

  // Get current conversation
  const currentConversation =
    conversations?.find((conv) => conv.id === currentConversationId) ||
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
        <div
          className="absolute top-5 right-10 bg-[#F5F5F5] z-10"
          onClick={handleNewChat}
        >
          <NewChat />
        </div>
        {/* <ChatHistoryDrawer
          isOpen={isChatHistoryOpen}
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={selectConversation}
        /> */}

        <ChatArea
          conversation={currentConversation}
          handleFileClick={handleFileClick}
          handleFileChange={handleFileChange}
          input={inputText}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </div>
  );
}
