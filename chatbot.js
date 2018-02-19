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

const EXC_INSUFFICIENT_DATA = 'There is as of yet insufficient data for a meaningful answer.';

function statementResponse() {
    const responses = [
        'amazing!',
        'hooray',
        'oh ok',
        'oh',
        'oh hmm',
        ':@',
        'terrible!!!!',
        'triggered',
        'such is life',
        'life is hard',
        'me too thanks',
        'hi'
    ];
    return responseHelper(responses).text;
}
        
function questionResponse() {
    const responses = [
        'woof',
        'sometimes',
        'zxcv',
        'not sure',
        'confidential',
        'dunno',
        'oh not sure'
    ];
    return responseHelper(responses).text;
}

function whyQuestionResponse() {
    const responses = [
        'life is full of mysteries',
        EXC_INSUFFICIENT_DATA,
        'not sure',
        'such is life',
        'that\u2019s confidential',
        'woof',
        'dunno'
    ];
    return responseHelper(responses).text;
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

function timeoutReply(message, text, delay) {
    setTimeout(function() {
        message.channel.send(text);
    }, delay);
}

function hiResponse(message) {
    if (Math.random() < 0.5) {
        timeoutReply(message, 'how are you?', 1000);
    }
    return 'hi';
}

function hmmResponse(message) {
    return message.content;
}

//order matters
const responseHandlers = [
    { regExp: /(is|are)\s.+\?$/, handler: yesNoQuestionResponse },
    { regExp: /is ugly$/, handler: function() { return 'ur face is ugly'; } },
    { regExp: /^why\s.+\?$/, handler: whyQuestionResponse },
    { regExp: /^hi$/, handler: hiResponse },
    { regExp: /\?$/, handler: questionResponse },
    { regExp: /^hm+/, handler: hmmResponse },
    { regExp: /^\w+\s+(is|are)/, handler: statementResponse },
    { regExp: /^\w+'(s|re)\s/, handler: statementResponse },
    { regExp: /^(yes|yeah|y(a|e|u)(p|h)?|si|no|maybe|sometimes|zxcv|xgv')/, handler: statementResponse }
];

function getResponseForString(canonicalMessage, message) {
    for (let x in responseHandlers) {
        const responseHandler = responseHandlers[x];
        if (canonicalMessage.match(responseHandler.regExp)) {
            return responseHandler.handler(message);
        }
    }

    return null;
}

function questionStarter() {
    const responses = [
        'are you excited about',
        'what do you think of',
        'how do you feel about'
    ];
    return responseHelper(responses).text;
}

const TOPICS = process.env.DISCORD_TOPICS ? process.env.DISCORD_TOPICS.split('|') : [];
function areYouExcitedAbout(message) {
    const topic = responseHelper(TOPICS).text;
    if (Math.random() < 1/3) {
        timeoutReply(message, 'http://en.wikipedia.org/wiki/' + escape(topic), 3000);
    }
    return questionStarter() + ' ' + topic + '?';
}

discordClient.on('message', (message) => {
    if (message.author.id !== discordClient.user.id) {
        const canonicalMessage = message.content.trim().toLowerCase();
        const response = getResponseForString(canonicalMessage, message);

        if (response !== null) {
            message.channel.send(response);
        } else if (Math.random() < 0.4 && TOPICS.length > 0) {
            message.channel.send(areYouExcitedAbout(message));
        } else if (Math.random() < 0.2) {
            message.channel.send(process.env.DISCORD_PUPPY_URL);
        }
    }
});

function init() {
    const BOT_USER_TOKEN = process.env.DISCORD_BOT_USER_TOKEN;
    discordClient.login(BOT_USER_TOKEN);
}

init();

module.exports = discordClient;