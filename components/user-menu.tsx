import { User, Settings } from "lucide-react"

interface UserMenuProps {
  setIsSettingsOpen: (isOpen: boolean) => void
  onClose: () => void
}

export function UserMenu({ setIsSettingsOpen, onClose }: UserMenuProps) {
  const handleSettingsClick = () => {
    onClose()
    setIsSettingsOpen(true)
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
      <div className="py-1">
        <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition-colors">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>
        <button
          onClick={handleSettingsClick}
          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}

