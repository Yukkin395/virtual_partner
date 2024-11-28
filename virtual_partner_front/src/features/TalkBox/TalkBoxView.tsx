import { Avatar } from "@mui/material";
import { useState } from "react";

type Message = {
  sender: "user" | "ai";
  text: string;
};
export const TalkBoxView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "user",
      text: "今日は疲れたね〜",
    },
    {
      sender: "ai",
      text: "そうだね。ゆっくり休もう！",
    },
    {
      sender: "user",
      text: "もうすぐ夏休みだし、どこか行きたいな〜",
    },
    {
      sender: "ai",
      text: "海に行くのはどうかな？",
    },
  ]);

  console.log(setMessages);

  return (
    <div className="p-4 bg-pink-50 rounded-2xl max-w-md mx-auto shadow-lg">
      <div className=" bg- flex justify-center items-center">
        <h2 className="text-lg font-bold mb-4">思い出</h2>
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex items-center ${
            message.sender === "user" ? "justify-start" : "justify-end"
          }`}
        >
          {message.sender === "user" && (
            <Avatar
              sx={{ width: 32, height: 32 }}
              className="mr-2"
            />
          )}
          <div
            className={`p-3 rounded-2xl max-w-[75%] ${
              message.sender === "user"
                ? "bg-blue-100 text-gray-700 rounded-bl-none"
                : "bg-yellow-100 text-gray-700 rounded-br-none"
            } shadow-sm`}
          >
            {message.text}
          </div>
          {message.sender === "ai" && (
            <Avatar
              src="/icon/hiyori.jpg"
              sx={{ width: 32, height: 32 }}
              className="ml-2"
            />
          )}
        </div>
      ))}
    </div>
  );
};
