'use strict'

const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.TOKEN_PAGE;

const knownPersonnes = [];

function handleFirstMessage(sender_psid) {
    let response;

    if (knownPersonnes.indexOf(sender_psid) === -1) {
        response = {
            "text": "Bonjour ! Je suis Botnoit le bot de toute botté ! Comme tu t'en doute de lance des gifs plus vite que mon oncle !!"
        }
        knownPersonnes.push(sender_psid);
        callSendAPI(sender_psid, response);
    }
}

function handleMessage(sender_psid, received_message) {
    let response;

    handlerFirstMessage(sender_psid);

    if (received_message.text) {    
        response = {
            "text": `Quoi ? Tu me dis : "${received_message.text}". Tu veux que je te casse ta sale tete?`
        }
    }  
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error('Unable to send message:' + err);
        }
    });
}

module.exports = {
    handleMessage,
    callSendAPI
}
