import Image from "next/image";

interface MessageProps {
  message: {
    content: string;
    file?: any;
    role: "user" | "assistant";
    timestamp: string;
  };
  imagefile: string | undefined;
}

export function Message({ message, imagefile }: MessageProps) {
  const isUser = message.role === "user";
  const isFile = message.file;
  const lines = message.content.split("\n");

  // Function to parse bold text within a line
  const parseBold = (line: string) => {
    const parts = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  return (
    <div className="">
      <div>
        <Image src={imagefile ?? ""} alt="someimage" />
      </div>
      <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`rounded-lg p-3 text-black my-5 ${
            isUser ? "bg-[#e9e9e9] max-w-[70%] border border-gray-200" : ""
          }`}
        >
          <p className="mb-1">
            {lines.map((line, index) => (
              <span>
                {parseBold(line)}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p
            className={`text-xs text-gray-500 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
