'use strict';

// main contents of the SenryuIntent.
// got from SNS uploads.
const sentences = [
    'ゆとりでしょ そういうあなたは バブルでしょ',
    '久しぶり 聞くに聞けない 君の名は',
    'ありのまま すっぴんみせたら 君の名は',
    '同窓会 みんなニコニコ 名前出ず',
    'パパお風呂 入れじゃなくて 掃除しろ',
    '君の名は ゆとり世代の 名が読めず',
    '病院で サミットしてる セブン',
    'ばあちゃんが オシャレにキメる 通院日',
    '暖かく 迎えてくれるは 便座のみ'
];

const Alexa = require('alexa-sdk'); // read Alexa SDK.

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

// handlers.
const handlers = {
    // launch - just call help intent.
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    // speech out help message.
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', '面白い話を教えてと聞いてください。');
    },
    // cancel handler.
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', '中断します');
    },
    // stop handler.
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'さようなら');
    },
    // main handler to tell one of senryu contents.
    'SenryuIntent': function () {
        var counter = 0;
        if (this.attributes['counter']) {
            counter = this.attributes['counter'];
        }
        this.attributes['counter'] = counter + 1;
        // Create speech output
        const speechOutput = sentences[counter % sentences.length];
        this.emit(':tell', speechOutput);
    },
    // to save session attribute to the back-end system.
    'SessionEndedRequest': function () {
        this.emit(':saveState', true);
    }
};

// initialize alexa.
exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
