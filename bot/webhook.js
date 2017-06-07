const express = require('express');
var app = express();
var reqC = require('./requestorContext');
var donC = require('./donorContext');
const bodyParser = require('body-parser');
let sender = "";
const apiaiApp = require('apiai')("a1bcb399de5e42de987a5d3fb6b947eb");
var tmp = "",
    ok = "ok";
var fb = require('./fbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
app.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'stupid') {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.status(403).end();
    }
});
/*---------------------------------------------- Handling all messenges and postbacks---------------------------------*/
app.post('/webhook', (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text || (event.postback && event.postback.payload)) {
                    console.log('in');
                    if(event.message && event.message.text)
                    sendMessage(event);
                    else
                        {
                            var a=event.postback.payload;
                            var idnum= event.sender.id;
                            console.log(a);
                            sendpostback(a,idnum);
                        }
                }  else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
        res.status(200).end();
    }
});

function sendMessage(event) {
    sender = event.sender.id;
    let text = event.message.text;
    var sr = JSON.stringify(text);
    var temp = sr.toLowerCase();
    console.log(temp);
    console.log(sender);
    let apiai = apiaiApp.textRequest(text, {
        sessionId: sender
    });

    apiai.on('response', (response) => {
        // Got a response from api.ai. Let's POST to Facebook Messenger
        let aiText = response.result.fulfillment.speech;

        if (response.result.action) {

            tmp = response.result.parameters;

        }

        donC.donor(aiText, sender, temp, tmp);

        reqC.requestor(aiText, sender, temp, ok, tmp);

        fb.send(sender, aiText);

    });

    apiai.on('error', (error) => {
        console.log(error);
    });

    apiai.end();
}

function sendpostback(a,idnum){
    var str = a.substring(a.length, a.length - 1);
    var nid=a.substring(0, a.length - 1);
    nid=nid.toString();
    if(str === '1')
        reqC.intim(idnum,nid);
    else if(str === '2')
        reqC.intim1(idnum,nid);
    else if(str === '3')
        reqC.intim2(idnum,nid);
    
}
