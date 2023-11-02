const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require("dotenv").config();

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
            keyboard: [["USD"], ["EUR"]],
            resize_keyboard: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  bot.on("text", async (msg) => {
    try {
      if (msg.text == "USD") {
        try {
          axios.defaults.baseURL =
            "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";

          const response = await axios.get();

          const obj1 = {
            my: "приват USD покупка",
            variable: response.data[1].buy,
          };
          const obj2 = {
            my: "приват USD продажа",
            variable: response.data[1].sale,
          };
          const success = myCache.mset([
            { key: "privatUSDbuy", val: obj1 },
            { key: "privatUSDsale", val: obj2 },
          ]);

          await bot.sendMessage(
            msg.chat.id,
            `PrivatBank
buy: ${response.data[1].buy}
sale: ${response.data[1].sale}
            `
          );
        } catch (e) {
          valueBuy = myCache.get("privatUSDbuy");
          valueSale = myCache.get("privatUSDsale");
          if (valueBuy == undefined && valueSale == undefined) {
            console.log("кеш приват USD пустой");
          } else {
            await bot.sendMessage(
              msg.chat.id,
              `PrivatBank
  buy: ${valueBuy.variable}
  sale: ${valueSale.variable}  
  `
            );
          }
        }
        try {
          axios.defaults.baseURL = "https://api.monobank.ua/bank/currency";
          const responseMono = await axios.get();

          const obj3 = {
            my: "моно USD покупка",
            variable: responseMono.data[0].rateBuy,
          };
          const obj4 = {
            my: "моно USD продажа",
            variable: responseMono.data[0].rateSell,
          };
          const success = myCache.mset([
            { key: "monoUSDbuy", val: obj3 },
            { key: "monoUSDsale", val: obj4 },
          ]);

          await bot.sendMessage(
            msg.chat.id,
            `MonoBank
buy: ${responseMono.data[0].rateBuy}
sale: ${responseMono.data[0].rateSell}
            `
          );
        } catch (e) {
          valueBuyMono = myCache.get("monoUSDbuy");
          valueSaleMono = myCache.get("monoUSDsale");
          if (valueBuyMono == undefined && valueSaleMono == undefined) {
            console.log("кеш моно USD пустой");
            await bot.sendMessage(
              msg.chat.id,
              `MonoBank
buy: 0
sale: 0  
`
            );
          } else {
            await bot.sendMessage(
              msg.chat.id,
              `MonoBank
buy: ${valueBuyMono.variable}
sale: ${valueSaleMono.variable}  
`
            );
          }
        }
      } else if (msg.text == "EUR") {
        try {
          axios.defaults.baseURL =
            "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";

          const response = await axios.get();

          const obj5 = {
            my: "приват EUR покупка",
            variable: response.data[1].buy,
          };
          const obj6 = {
            my: "приват EUR продажа",
            variable: response.data[1].sale,
          };
          const success = myCache.mset([
            { key: "privatEURbuy", val: obj5 },
            { key: "privatEURsale", val: obj6 },
          ]);

          await bot.sendMessage(
            msg.chat.id,
            `PrivatBank
buy: ${response.data[0].buy}
sale: ${response.data[0].sale}
            `
          );
        } catch (e) {
          valueBuy = myCache.get("privatEURbuy");
          valueSale = myCache.get("privatEURsale");
          if (valueBuy == undefined && valueSale == undefined) {
            console.log("кеш приват EUR пустой");
            await bot.sendMessage(
              msg.chat.id,
              `PrivatBank
buy: 0
sale: 0  
`
            );
          } else {
            await bot.sendMessage(
              msg.chat.id,
              `PrivatBank
    buy: ${valueBuy.variable}
    sale: ${valueSale.variable}  
    `
            );
          }
        }
        axios.defaults.baseURL = "https://api.monobank.ua/bank/currency";

        try {
          const responseMonoEur = await axios.get();

          const obj7 = {
            my: "mono EUR покупка",
            variable: responseMonoEur.data[1].rateBuy,
          };
          const obj8 = {
            my: "mono EUR продажа",
            variable: responseMonoEur.data[1].rateSell,
          };
          myCache.mset([
            { key: "monoEURbuy", val: obj7 },
            { key: "monoEURsale", val: obj8 },
          ]);
          await bot.sendMessage(
            msg.chat.id,
            `MonoBank
buy: ${responseMonoEur.data[1].rateBuy}
sale: ${responseMonoEur.data[1].rateSell}
            `
          );
        } catch (e) {
          valueBuy = myCache.get("monoEURbuy");
          valueSale = myCache.get("monoEURsale");
          if (valueBuy == undefined && valueSale == undefined) {
            console.log("кеш моно EUR пустой");
            await bot.sendMessage(
              msg.chat.id,
              `MonoBank
buy: 0
sale: 0  
`
            );
          } else {
            console.log(valueBuy);
            await bot.sendMessage(
              msg.chat.id,
              `MonoBank
buy: ${valueBuy.variable}
sale: ${valueSale.variable}  
`
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

startBot();
