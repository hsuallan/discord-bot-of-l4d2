const Discord = require('discord.js')
const cfg = require('./cfg.json')
const client = new Discord.Client()
const post = require('./post')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', async msg => {
  //!hello 1 2 3 4 5 =>[1,2,3,4,5]
  const args = msg.content.slice(cfg.CmdPrefix.length).trim().split(/ +/g)
  //!hello 1 2 3 =>hello
  const cmd = args.shift().toLowerCase()
  //!hello 1 2 3 4 5 => 1 2 3 4 5
  const onlycmd = msg.content.slice(cfg.CmdPrefix.length+command.length).trim()
  //ignore bots message
  if(msg.author.bot) return;
  if (/gamemaps/.test(msg.content)) {
      const data = await post(msg.content)
      msg.channel.send(`${data.title} have been added successfully`)
  }
  if(cmd == 'finished'){
    msg.channel.send(`${onlycmd} is finished at ${msg.createdAt }`)
  }
  if(cmd == 'played'){
    
  }
});

client.login(cfg.token);


//