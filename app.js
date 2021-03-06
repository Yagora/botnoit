'use strict'

const request = require('request');
const giphyCls = require('./Giphy.js');
const PAGE_ACCESS_TOKEN = process.env.TOKEN_PAGE;

const knownPersonnes = [];
const Giphy = new giphyCls();

function handleFirstMessage(sender_psid) {
    let response;

    if (knownPersonnes.indexOf(sender_psid) === -1) {
        response = {
            "text": "Bonjour ! Je suis Botnoit le bot de toute botté ! Comme tu t'en doute je lance des gifs plus vite que mon oncle !!"
        }
        knownPersonnes.push(sender_psid);
        callSendAPI(sender_psid, response);
        Giphy.random()
            .then(url => {
                console.log(url);
                response = {
                    "attachment": {
                        "type": "image",
                        "payload": {
                            "url": url 
                        }
                    }
                }
                callSendAPI(sender_psid, response);
            });

        return true;
    }

    return false;
}

function handleMessage(sender_psid, received_message) {
    let response;

    const firstMessage = handleFirstMessage(sender_psid);

    if (!firstMessage && received_message.text) {    
        Giphy.search(received_message.text)
            .then(url => {
                response = {
                    "attachment": {
                        "type": "image",
                        "payload": {
                            "url": url 
                        }
                    }
                }
                callSendAPI(sender_psid, response);
            });
    }
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
