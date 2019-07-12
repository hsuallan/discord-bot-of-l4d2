const Discord = require('discord.js')
const cfg = require('./cfg.json')
const client = new Discord.Client()
const post = require('./post')
const fs = require('fs')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', async msg => {
  const args = msg.content.slice(cfg.CmdPrefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()
  if(msg.author.bot) return;
  if (/gamemaps|steam/.test(msg.content)) {
      const data = await post(msg.content)
      msg.channel.send(`${data.title} have been added successfully`)
  }
  if(cmd == 'finished'){
    msg.channel.send(`${args.join(' ').toString()} is finished at ${msg.createdAt }`)
  }
  if(cmd == 'played'){
    
  }
  if(cmd =='help'){
    msg.channel.send(
      `指令說明：
        發送含有工作坊 or gamemaps的連結會自動加入追蹤
        \`!finished mapname/url\` 將map標示為已完成
        \`!played (num)\` 發送遊玩過的列表，最近num筆
      `
    )
  }
});

client.login(cfg.token);


//