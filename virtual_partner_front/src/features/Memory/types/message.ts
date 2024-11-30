export type Message = {
  sender: "user" | "ai";
  text: string;
  createdAt: Date;
};