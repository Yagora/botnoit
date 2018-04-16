'use strict';
const request = require('request');

class Giphy {
    constructor() {
        this._giphyApiKey = process.env.TOKEN_GIPHY_API;
    }

    _handleGiphy(uri, keyWords) {
        return new Promise((resolve,reject) => {
            request({
                "uri": uri,
                "method": "GET"
            }, (err, res, bodyString) => {
                const body = JSON.parse(bodyString);
                console.log(body.data);
                if (!err) {
                    if (body.data instanceof Array) {
                        resolve(body.data[0].images.original.url);
                    } else {
                        resolve(body.data.images.original.url);
                    }
                } else {
                    console.error('Unable to reach Giphy: ' + err);
                    reject();
                }
            });
        });
    }

    random() {
        const giphyApiKey = this._giphyApiKey;

        return this._handleGiphy(`http://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`);
    }

    search(keyWords) {
        const keyWordsFormatted = keyWords.split(" ").join("+");
        const giphyApiKey = this._giphyApiKey;

        return this._handleGiphy(`http://api.giphy.com/v1/gifs/search?q=${keyWordsFormatted}&api_key=${giphyApiKey}&limit=1`);
    }
}

module.exports = Giphy;
