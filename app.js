'use strict'

const PAGE_ACCESS_TOKEN = process.env.TOKEN_PAGE;

function handleMessage(sender_psid, received_message) {
    let response;

    if (received_message.text) {    
        response = {
            "text": `Quoi ? Tu me dis : "${received_message.text}". Tu veux que je te casse ta sale tete?`
        }
    }  
    callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {

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
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI
}
