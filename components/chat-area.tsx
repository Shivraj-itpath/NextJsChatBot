"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Message } from "./message";
import type { Conversation, ImageFile } from "@/app/page";
import { Send, Plus } from "lucide-react";
import { Comment } from "react-loader-spinner";
import CustomLoader from "./ui/customLoader";

interface ChatAreaProps {
  conversation: Conversation;
  fileRef: React.RefObject<HTMLInputElement>;
  handleFileClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: ImageFile | null;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatArea({
  conversation,
  fileRef,
  handleFileClick,
  handleFileChange,
  selectedFile,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
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
              <Message
                key={message.id}
                message={message}
                imagefile={selectedFile?.imagePreview}
              />
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
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          {selectedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Selected file: {selectedFile.file.name}
            </div>
          )}
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
  );
}
