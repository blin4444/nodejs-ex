const discord = require('discord.js');

const discordClient = new discord.Client({
    autoReconnect: true
});


function dlluResponse() {
    const responses = [
        'hi',
        'how are you?',
        'terrible!',
        'oh no',
        'zxcv',
        'me too thanks',
        'oh ok',
        'ezpz',
        'life is hard',
        'such is life',
        'amazing!',
        'hooray!',
        'oh',
        'There is as of yet insufficient data for a meaningful answer.',
        'are you exicted about the future of puppies?',
        'do you like moss?',
        'how do you feel about point set registration?',
        'confidential!!!!!!!',
        'woof',
        'sometimes',
        'ur face is ugly',
        'life is full of mysteries'
    ];
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
}

discordClient.on('message', (message) => {
    if (message.author.id === discordClient.user.id) {
        return;
    }
    message.reply(dlluResponse());
});

const BOT_USER_TOKEN = process.env.DISCORD_BOT_USER_TOKEN;
discordClient.login(BOT_USER_TOKEN);
console.log(discordClient);

module.exports = discordClient;