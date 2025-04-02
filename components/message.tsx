import Image from "next/image";
import Markdown from "react-markdown";

interface MessageProps {
  message: {
    id: string;
    content: string;
    file?: File | null;
    role: "user" | "assistant";
    timestamp: string;
  };
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";
  const isFile = message.file;
  const lines = message?.content?.split("\n");

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

  // Function to parse # headings within a line
  const parseHeading = (line: string) => {
    const parts = [];
    let lastIndex = 0;
    const headingRegex = /^(#{1,6})\s*(.*)$/gm;
    let match;
    while ((match = headingRegex.exec(line)) !== null) {
      const headingLevel = match[1].length;
      const headingText = match[2];
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      parts.push(
        <h1 key={match.index} className={`text-${headingLevel * 100}`}>
          {headingText}
        </h1>
      );
      lastIndex = headingRegex.lastIndex;
    }
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }
    return parts.length > 0 ? parts : line;
  };

  return (
    <div className="">
      {message.file && (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
          <Image
            src={URL.createObjectURL(message.file)}
            alt="file"
            width={350}
            height={350}
            className="inline-block mr-2"
          />
        </div>
      )}
      <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`rounded-lg p-3 text-black my-5 ${
            isUser ? "bg-[#e9e9e9] max-w-[70%] border border-gray-200" : ""
          }`}
        >
          <p className="mb-1">
            {lines ? (
              lines?.map((line, index) => (
                <span key={index}>
                  {parseBold(line)}
                  {index < lines.length - 1 && <br />}
                </span>
              ))
            ) : (
              <span>Some error occured while processing your request</span>
            )}
          </p>
          {/* <p className="mb-1">
            <Markdown>{message?.content}</Markdown>
          </p> */}
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
