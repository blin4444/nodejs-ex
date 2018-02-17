const discord = require('discord.js');

const discordClient = new discord.Client({
    autoReconnect: true
});


function dlluResponse() {
    const responses = ['hi', 'how are you?', 'terrible!', 'oh no', 'zxcv', 'me too thanks', 'oh ok', 'ezpz', 'life is hard', 'such is life'];
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
}

discordClient.on('message', (message) => {
    message.reply(dlluResponse());
});

const BOT_USER_TOKEN = process.env.DISCORD_BOT_USER_TOKEN;
discordClient.login(BOT_USER_TOKEN);
console.log(discordClient);

module.exports = discordClient;