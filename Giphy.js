'use strict';
const request = require('request');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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
                        const randomInt = getRandomInt(body.data.length);

                        resolve(body.data[randomInt].images.original.url);
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

        return this._handleGiphy(`http://api.giphy.com/v1/gifs/search?q=${keyWordsFormatted}&api_key=${giphyApiKey}`);
    }
}

module.exports = Giphy;
