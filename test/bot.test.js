const Discord = require('discord.js')
const cfg = require('../cfg.json')
const client = new Discord.Client()
describe('bot test',()=>{
    it('work correctly' ,done =>{
        client.on('ready',()=>{
            client.destroy()
            done()
        })
        client.login(cfg.token).catch(err=>{throw err})
    })
})