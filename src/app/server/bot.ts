import { Bot } from "grammy";
import { apiThrottler } from "@grammyjs/transformer-throttler";

import { botHandlers } from "../handlers";
import { getFullName } from "../helpers/name";
import { getDateKeyboard } from "../helpers/keyboard";
import env from "./env";

const bot = new Bot(env.BOT_TOKEN);

bot.command("start", async (ctx) => {
  ctx.reply(
    `Hi ${getFullName(
      ctx.from!
    )}, you can use /date to get today's date in Ethiopian Calender or use Get Date button below.`,
    {
      reply_markup: {
        inline_keyboard: getDateKeyboard(),
      },
    }
  );
});

bot.api
  .setMyCommands([
    { command: "start", description: "Start bot" },
    { command: "date", description: "Get current date" },
    { command: "help", description: "Get help" },
    { command: "status", description: "Check bot status" },
  ])
  .then(() => {
    console.log("commands have been uploaded to BotFather");
  })
  .catch((e) => console.error("Failed to upload commands to bot", e));

bot.catch((err) => {
  console.error(`Error while handling update ${err.ctx.update.update_id}:`);
  console.error(err.error);
});

bot.api.config.use(apiThrottler());

bot.use(botHandlers);

export default bot;
