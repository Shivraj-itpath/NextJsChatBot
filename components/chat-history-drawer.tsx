import type { Conversation } from "@/app/page"
import { X } from "lucide-react"

interface ChatHistoryDrawerProps {
  isOpen: boolean
  conversations: Conversation[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
}

export function ChatHistoryDrawer({
  isOpen,
  conversations,
  currentConversationId,
  onSelectConversation,
}: ChatHistoryDrawerProps) {
  return (
    <div
      className={`absolute inset-y-0 left-0 w-64 bg-[#F0F0F0] transform transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-medium">Chat History</h2>
        <button className="p-1 rounded-md hover:bg-gray-200 transition-colors" aria-label="Close chat history">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="p-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full text-left p-3 rounded-md mb-1 hover:bg-gray-200 transition-colors ${
              conversation.id === currentConversationId ? "bg-gray-200" : ""
            }`}
          >
            <p className="font-medium truncate">{conversation.title}</p>
            <p className="text-sm text-gray-500 truncate">
              {conversation.messages[conversation.messages.length - 1]?.content.substring(0, 30)}...
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

