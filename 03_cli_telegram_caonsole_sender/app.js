const commander = require("commander");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const startBot = () => {
  const bot = new TelegramBot(process.env.API_KEY_BOT, {
    polling: {
      interval: 300,
      autoStart: true,
    },
  });

  bot.on("polling_error", (err) => console.log(err.data.error.message));

  commander.version("1.0.0").description("Telegram console sender.");
  commander
    .command("message <message>", "Send message to Telegram Bot")
    .alias("m,")
    .description("Send messages")
    .command(
      "photo <path>",
      "Send photo to Telegram Bot. Just drag and drop it console after p-flag"
    )
    .alias("p,")
    .description("Send photo")
    .command("help [command]", "display help for command")
    .action(() => {
      const comandName = commander.args[0];
      if (comandName == "m") {
        bot.sendMessage(process.env.CHAT_ID, commander.args[1]);
      } else if (comandName == "p") {
        bot.sendPhoto(process.env.CHAT_ID, commander.args[1]);
      } else {
        console.log("unknown command");
      }
    });

  commander.parse(process.argv);
};

startBot();
