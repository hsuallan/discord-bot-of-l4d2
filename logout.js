const Discord = require('discord.js')
const cfg = require('./cfg.json')
const client = new Discord.Client()
client.login(cfg.token);
setTimeout(()=>{client.destroy().then(console.log('bye'));},2000)