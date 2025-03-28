import { X } from "lucide-react"

interface SettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  return (
    <div
      className={`absolute inset-y-0 right-0 w-80 bg-[#F0F0F0] transform transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-medium">Settings</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Close settings"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Theme</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 bg-white border border-gray-300 rounded-md hover:border-[#007BFF] transition-colors"></button>
            <button className="w-8 h-8 bg-gray-800 border border-gray-300 rounded-md hover:border-[#007BFF] transition-colors"></button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Notifications</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Enable notifications</span>
          </label>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Message Sound</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Enable message sounds</span>
          </label>
        </div>
      </div>
    </div>
  )
}

