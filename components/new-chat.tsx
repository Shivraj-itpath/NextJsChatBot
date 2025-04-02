import { Edit } from "lucide-react";
import React from "react";

const NewChat = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-white border border-dashed border-gray-400 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 transition-colors duration-200 ease-in-out hover:text-gray-800">
      <Edit className="h-5 w-5 me-2" />
      <p className="">New Chat</p>
    </div>
  );
};

export default NewChat;
