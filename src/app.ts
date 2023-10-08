import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import format from "date-format";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const port = Number(process.env.PORT) || 8080;

const BULLETIN_LINK =
  "https://www.bukitarang.church/wp-content/uploads/2021/01/BA-Weekly-Bulletin-.pdf";

const OUTLINE_PDF_LINK =
  "https://www.bukitarang.church/wp-content/uploads/2021/01/BA-Weekly-Sermon-Outline-.pdf";

const OUTLINE_WORD_LINL =
  "https://www.bukitarang.church/wp-content/uploads/2021/01/BA-Weekly-Sermon-Outline.doc";

function buildDate() {
  return format("dd-MM-yy", new Date());
}

// BA-Bulletin-02-25-22.pdf
function buildBulletinFilename() {
  return `BA-Bulletin-${buildDate()}.pdf`;
}

function buildOutlinePdfFilename() {
  return `BA-Outline-${buildDate()}.pdf`;
}

function buildOutlineDocFilename() {
  return `BA-Outline-${buildDate()}.doc`;
}

bot.launch({
  webhook: {
    port: port,
    domain: process.env.APP_URL,
  },
});

bot.command("start", (ctx) => {
  ctx.reply(`Hellos ${ctx.message.from.first_name}! 🌟`);
});

bot.command("bulletin", (ctx) => {
  ctx.replyWithDocument(
    {
      url: BULLETIN_LINK,
      filename: buildBulletinFilename(),
    },
    { caption: "here you go!! 🌻" }
  );
});

bot.command("outline", (ctx) => {
  ctx.replyWithDocument(
    {
      url: OUTLINE_PDF_LINK,
      filename: buildOutlinePdfFilename(),
    },
    { caption: "here you go!! 🌻" }
  );
});

bot.command("outlinedoc", (ctx) => {
  ctx.replyWithDocument(
    {
      url: OUTLINE_WORD_LINL,
      filename: buildOutlineDocFilename(),
    },
    { caption: "here you go!! 🌻" }
  );
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
