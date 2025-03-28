import { Menu } from "lucide-react";
import { UserMenu } from "./user-menu";

interface HeaderProps {
  toggleChatHistory: () => void;
  toggleUserMenu: () => void;
  isUserMenuOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

export function Header({
  toggleChatHistory,
  toggleUserMenu,
  isUserMenuOpen,
  setIsSettingsOpen,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <button
        onClick={toggleChatHistory}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle chat history"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      <h1 className="text-2xl">GenieX</h1>

      <div className="relative">
        <button
          onClick={toggleUserMenu}
          className="w-8 h-8 rounded-full bg-[#007BFF] text-white flex items-center justify-center hover:bg-[#0069d9] transition-colors"
          aria-label="User menu"
        >
          U
        </button>

        {isUserMenuOpen && (
          <UserMenu
            setIsSettingsOpen={setIsSettingsOpen}
            onClose={toggleUserMenu}
          />
        )}
      </div>
    </header>
  );
}
