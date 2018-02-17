const discord = require('discord');

const discordClient = new Discord.Client({
    autoReconnect: true
});


const dlluResponse = function() {
    const responses = ['hi', 'how are you?', 'terrible!', 'oh no', 'zxcv', 'me too thanks', 'oh ok', 'ezpz', 'life is hard', 'such is life'];
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
}

discordClient.on('message', function(message) {
    message.reply(dlluResponse());
});

const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
discordClient.login(CLIENT_SECRET);
console.log(discordClient);