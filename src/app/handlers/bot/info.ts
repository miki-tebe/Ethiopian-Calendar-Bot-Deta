import { Composer } from "grammy";

import { getDate } from "../../helpers/date";
import { getDateKeyboard } from "../../helpers/keyboard";
import { getFullName } from "../../helpers/name";

const composer = new Composer();

const filterCommands = composer.filter((ctx) =>
  ctx.chat ? ctx.chat.type === "private" : false
);

filterCommands.command("status", async (ctx) => {
  ctx.reply("The bot is up 👍.", {
    reply_markup: {
      inline_keyboard: getDateKeyboard(),
    },
  });
});

// about user
filterCommands.command("me", async (ctx) => {
  const msg = `Hi ${getFullName(ctx.from!)}.
  
  Here's a little info about yourself on telegram:
  
  Your name: ${getFullName(ctx.from!)}
  Your Telegram user ID: ${ctx.from!.id}
  Your Telegram username: ${ctx.from!.username ? ctx.from!.username : "N/A"}
  

  ------------------------------------

  Bye Bye 👋
  
  `;

  await ctx.reply(msg, {
    reply_markup: {
      inline_keyboard: getDateKeyboard(),
    },
  });
});

// help command
filterCommands.command("help", (ctx) =>
  ctx.reply(
    "You can use /date to get today's date in Ethiopian Calender or use Get Date button below.",
    {
      reply_markup: {
        inline_keyboard: getDateKeyboard(),
      },
    }
  )
);

// date command
filterCommands.command("date", async (ctx) => {
  await ctx.reply(getDate(), {
    reply_markup: {
      inline_keyboard: getDateKeyboard(),
    },
    parse_mode: "HTML",
  });
});

// Callbacks 
filterCommands.on(
  "callback_query",
  composer.filter((ctx) => ctx.callbackQuery?.data === "date"),
  async (ctx) => {
    await ctx.reply(getDate(), {
      reply_markup: {
        inline_keyboard: getDateKeyboard(),
      },
      parse_mode: "HTML",
    });
    await ctx.answerCallbackQuery();
  }
);

export default composer;
