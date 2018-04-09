'use strict';
const request = require('request');

class Giphy {
    constructor() {
        this._giphyApiKey = process.env.TOKEN_GIPHY_API;
    }

    _handleGiphy(uri) {
        return new Promise((resolve,reject) => {
            request({
                "uri": uri,
                "qs": { "access_token": this._giphyApiKey },
                "method": "GET",
                "json": {
                    "api_key": this._giphyApiKey
                }
            }, (err, res, body) => {
                if (!err) {
                    resolve(body.data.images.original.url);
                } else {
                    console.error('Unable to reach Giphy: ' + err);
                    reject();
                }
            });
        });
    }

    random() {
        return this._handleGiphy('http://api.giphy.com/v1/gifs/random');
    }

    search(keyWords) {

    }
}

module.exports = Giphy;
