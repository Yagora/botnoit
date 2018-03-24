'use strict';

require('dotenv').config();

const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); 

app.post('/webhook', (req, res) => {

  let body = req.body;

  if (body.object === 'page') {

    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }

});

app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = process.env.TOKEN_WEBHOOK;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
