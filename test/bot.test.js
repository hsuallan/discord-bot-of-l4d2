const Discord = require('discord.js')
const cfg = require('../cfg.json')
const client = new Discord.Client()
describe('bot test',()=>{
    it('correct token' ,done =>{
        client.login(cfg.token)
        .then(()=>{
            client.destroy()
            done()
        })
        .catch((err)=>done(err))
    })
})