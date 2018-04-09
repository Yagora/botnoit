'use strict';
const request = require('request');

class Giphy {
    constructor() {
        this._giphyApiKey = process.env.TOKEN_GIPHY_API;
    }

    _handleGiphy(uri, keyWords) {
        const json = {
            "api_key": this._giphyApiKey
        }

        if (keyWords) {
            json.q = keyWords;
            json.limit = 1;
        }

        return new Promise((resolve,reject) => {
            request({
                "uri": uri,
                "qs": { "access_token": this._giphyApiKey },
                "method": "GET",
                "json": json
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
        return this._handleGiphy('http://api.giphy.com/v1/gifs/search', keyWords);
    }
}

module.exports = Giphy;
