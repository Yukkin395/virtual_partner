import type { Meta, StoryObj } from "@storybook/react";
import { TalkBoxView } from "./TalkBoxView";

const meta = {
  title: "features/TalkBoxView",
  component: TalkBoxView,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#039393" }],
    },
  },
} satisfies Meta<typeof TalkBoxView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message:
      "知ってる?1番早く登校して、誰より早く始める朝トレって、とってもいい気分なのよ!",
  },
};
