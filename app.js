'use strict'

const request = require('request');
const giphyCls = require('./Giphy.js');
const PAGE_ACCESS_TOKEN = process.env.TOKEN_PAGE;

const knownPersonnes = [];
const Giphy = new giphyCls();

function handleFirstMessage(sender_psid) {
    let response;

    if (knownPersonnes.indexOf(sender_psid) === -1) {
        Giphy.random()
            .then(url => {
                response = {
                    "text": "Bonjour ! Je suis Botnoit le bot de toute botté ! Comme tu t'en doute de lance des gifs plus vite que mon oncle !!",
                    "attachment": {
                        "type": "image",
                        "payload": {
                            "url": url 
                        }
                    }
                }
                knownPersonnes.push(sender_psid);
                callSendAPI(sender_psid, response);
            });
    }
}

function handleMessage(sender_psid, received_message) {
    let response;

    handleFirstMessage(sender_psid);

    if (received_message.text) {    
        response = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://media.giphy.com/media/3ornk7TgUdhjhTYgta/giphy.gif"
                }
            }
        }
        callSendAPI(sender_psid, response);
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
