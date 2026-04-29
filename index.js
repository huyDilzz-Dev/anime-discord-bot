require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const API_URL = "https://anime-streamer--whoareyou172r.replit.app";
const API_KEY = "MTQ5ODg1ODMyNDUyNjEwNDYzNg.GJNWjK.PMimaXxlxafnjWLcmYnxT-oy634BnWhWOnTjfU";

client.on("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if(msg.author.bot) return;

  // COMMAND TAMBAH ANIME
  if(msg.content.startsWith("!addanime")){
    try{
      const data = msg.content.replace("!addanime ","").split("|");

      const body = {
        title: data[0],
        cover: data[1],
        synopsis: data[2],
        genre: data[3],
        year: data[4]
      };

      await axios.post(`${API_URL}/api/bot/add-anime`, body,{
        headers:{ "x-api-key": API_KEY }
      });

      msg.reply("✅ Anime berhasil ditambahkan!");
    }catch(err){
      msg.reply("❌ Gagal upload anime");
    }
  }

  // COMMAND TAMBAH EPISODE
  if(msg.content.startsWith("!addepisode")){
    try{
      const data = msg.content.replace("!addepisode ","").split("|");

      const body = {
        anime_id: data[0],
        episode_number: data[1],
        title: data[2],
        video_url: data[3],
        thumbnail: data[4]
      };

      await axios.post(`${API_URL}/api/bot/add-episode`, body,{
        headers:{ "x-api-key": API_KEY }
      });

      msg.reply("🎬 Episode berhasil ditambahkan!");
    }catch(err){
      msg.reply("❌ Gagal upload episode");
    }
  }
});

client.login(process.env.TOKEN);
