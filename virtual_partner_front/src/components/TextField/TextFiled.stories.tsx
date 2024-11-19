import type { Meta, StoryObj } from '@storybook/react';
import { TextFieldView } from './TextFiledView';

const meta = {
  title: 'components/TextField',
  component: TextFieldView,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextFieldView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'メールアドレス',
    placeholder: "sample@sample.com",
  },
};