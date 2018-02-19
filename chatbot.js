const discord = require('discord.js');
const aux = require('./aux_funcs');

const discordClient = new discord.Client({
    autoReconnect: true
});

function responseHelper(responses) {
    const index = Math.floor(Math.random() * responses.length);
    return {
        index: index,
        text: responses[index]
    };
}

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
        'are you excited about the future of puppies?',
        'do you like moss?',
        'how do you feel about point set registration?',
        'confidential!!!!!!!',
        'panic!!!!!!!!',
        'are you excited about',
        'no!!!!!!!!',
        'not sure'
    ];
    return responseHelper(responses);
}

const EXC_INSUFFICIENT_DATA = 'There is as of yet insufficient data for a meaningful answer.',  
        
function questionResponse() {
    const responses = [
        'woof',
        'sometimes',
        'zxcv',
        'not sure',
        'confidential'
    ];
    return responseHelper(responses);
}

function whyResponse() {
    const responses = [
        'life is full of mysteries',
        EXC_INSUFFICIENT_DATA,
        'not sure',
        'such is life',
        'that\u2019s confidential',
        'woof'
    ];
    return responseHelper(responses);
}

function yesNoQuestionResponse() {
    const responses = [
        'yes',
        'no',
        'confidential',
        'zxcv',
        'woof',
        'not sure',
        'dunno'
    ];
    const responseObj = responseHelper(responses);
    let response = responseObj.text;
    if (responseObj.index < 4) {
        response += aux.getRandomSuffix();
    }
    return response;
}

//order matters
const responseHandlers = [
    { regExp:  /is|are\s.+\?$/, handler: yesNoQuestionResponse },
    { regExp: /is ugly$/, handler: function() { return 'ur face is ugly'; } },
    { regExp:  /^why/, handler: whyQuestionResponse },
    { regExp:  /\?$/, handler: questionResponse },
];

function getResponseForString(canonicalMessage) {
    for (let x in responseHandlers) {
        const responseHandler = responseHandlers[x];
        if (canonicalMessage.match(responseHandler.regExp)) {
            return responseHandler.handler();
        }
    }

    return dlluResponse();
}

discordClient.on('message', (message) => {
    if (message.author.id !== discordClient.user.id) {
        const canonicalMessage = message.content.strip().toLowerCase();
        message.reply(getResponseForString(canonicalMessage));
    }
});

function init() {
    const BOT_USER_TOKEN = process.env.DISCORD_BOT_USER_TOKEN;
    discordClient.login(BOT_USER_TOKEN);
}

init();

module.exports = discordClient;