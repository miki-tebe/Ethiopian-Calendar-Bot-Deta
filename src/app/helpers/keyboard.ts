import { type InlineKeyboardButton } from "grammy/types";

export const getDateKeyboard = (): InlineKeyboardButton[][] => [
  [
    {
      text: "Get Date",
      callback_data: "date",
    },
  ],
];
