const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

axios.defaults.baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=51.5156177&lon=-0.0919983&cnt=3&appid=${process.env.API_KEY_WEATHER}`;

const startBot = () => {
  const bot = new TelegramBot(process.env.API_KEY_BOT, {
    polling: {
      interval: 300,
      autoStart: true,
    },
  });

  bot.on("polling_error", (err) => console.log(err.data.error.message));

  bot.on("text", async (msg) => {
    try {
      if (msg.text.startsWith("/start")) {
        await bot.sendMessage(msg.chat.id, `Меню бота`, {
          reply_markup: {
            keyboard: [["🌤️ Forecast in London"], ["❌ Close menu"]],
            resize_keyboard: true,
          },
        });
      } else if (msg.text == "🌤️ Forecast in London") {
        await bot.sendMessage(msg.chat.id, "choose an interval", {
          reply_markup: {
            keyboard: [
              ["at intervals of 3 hours"],
              ["at intervals of 6 hours"],
            ],
            resize_keyboard: true,
          },
        });
      } else if (msg.text == "❌ Close menu") {
        await bot.sendMessage(msg.chat.id, "Menu is closed", {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  bot.on("text", async (msg) => {
    try {
      if (msg.text == "at intervals of 3 hours") {
        try {
          const response = await axios.get();
          await bot.sendMessage(
            msg.chat.id,
            response.data.list[1].weather[0].main
          );
        } catch (e) {
          console.log(e);
        }
      } else if (msg.text == "at intervals of 6 hours") {
        try {
          const response = await axios.get();
          await bot.sendMessage(
            msg.chat.id,
            response.data.list[2].weather[0].main
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

startBot();
