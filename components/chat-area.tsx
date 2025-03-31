"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { Message } from "./message";
import type { Conversation } from "@/app/page";
import { Send, Plus } from "lucide-react";
import { Comment } from "react-loader-spinner";
import Image from "next/image";

interface ChatAreaProps {
  conversation: Conversation;
  handleFileClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export function ChatArea({
  conversation,
  handleFileClick,
  handleFileChange,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  selectedFile,
  setSelectedFile,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto h-full">
          {conversation?.messages?.length == 0 ? (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl">Hi, What's on your mind today?</h1>
            </div>
          ) : (
            conversation?.messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div>
              <Comment
                visible={true}
                height="50"
                width="50"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#0069d9"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-400 bg-white mt-4">
        <div className="max-w-3xl mx-auto">
          {selectedFile && (
            <div className="flex items-start mb-2">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="file"
                width={100}
                height={100}
                className="inline-block p-1 border border-gray-400 rounded-md"
              />
              <div>
                <span
                  className="w-4 cursor-pointer rounded-full px-1 hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
              {/* Selected file: {selectedFile.name} */}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
            />

            <label
              className="p-2 bg-[#007BFF] text-white rounded-md hover:bg-[#0069d9] transition-colors cursor-pointer d-flex items-center justify-center"
              onClick={handleFileClick}
              htmlFor="file_input"
            >
              <Plus className="h-5 w-5" />
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden"
              id="file_input"
              type="file"
              // ref={fileInputRef}
              onChange={handleFileChange}
            />

            <button
              type="submit"
              className="p-2 bg-[#007BFF] text-white rounded-md hover:bg-[#0069d9] transition-colors"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
