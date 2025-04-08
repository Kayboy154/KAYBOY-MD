const axios = require('axios');
const config = require('../config')
const {cmd , commands} = require('../command')
const googleTTS = require('google-tts-api')


cmd({
    pattern: "trt2",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, q, reply }) => {
    try {
        const args = q.split(' ');
        if (!args) return reply("❗ Please provide a language code and text. Usage: .translate [language ]\nEg: trt fr");
         if (!m.quoted) return reply("❗ Please reply to the message you want to translate . Usage: .translate [language ]\nEg: trt fr");

        const targetLang = args[0];
        const textToTranslate = m.quoted.text

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *KAYBOY MD TRANSLATION* 🌍

🔤 *Original*: ${textToTranslate}

🔠 *Translated*: ${translation}

🌐 *Language*: ${targetLang.toUpperCase()}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀʏʙᴏʏ-ᴍᴅ `;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
});
