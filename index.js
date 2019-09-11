const Discord = require('discord.js')
const cfg = require('./cfg.json')
const post = require('./post')
const crud  = require("./db/index")
const db = new crud()
db.connect(cfg.db)
const client = new Discord.Client()
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('!help',{type:"PLAYING"})
});
client.on('message', async msg => {
  const args = msg.content.slice(cfg.CmdPrefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()
  const admin = msg.member.roles.has('424244648085815296');//true or false
  if(msg.author.bot) return;
  if (/gamemaps|steamcommunity/.test(msg.content)&&args.length == 0) {
    if(admin){
      const {r,ans} = await db.is_reapeat(msg.content)
      if(r){
        msg.channel.send(`${ans.title} have been played`)
      }
      else{
        try {
          const data = await post(msg.content)
          db.addMap(data).then(ans=>{
            msg.channel.send(`${ans.title} have been saved`)
          })
        } catch (error) {
          msg.channel.send(`${error}`)
        }
      }
    }
    else{
      msg.channel.send(`Sorry you don't have Permission`)
    }
  }
  if(cmd == 'finished'){
    if(admin){
      if(args.length == 0){
        msg.channel.send(`This command have to at least one argument to work fine`) 
      }
      db.change_to_finish(args.join(' ').toString(),msg.createdAt).then((n)=>{
        if(n ==0){
          msg.channel.send(`Sorry Didn't find the map`) 
        }else{
          msg.channel.send(`${args.join(' ').toString()} is finished at ${msg.createdAt }`) 
        }
      })
    }
    else{
      msg.channel.send(`Sorry you don't have Permission`)
    }
  }
  if(cmd == 'played'){
    let num = args.length  == 0 ? 0 : parseInt(args[0])
    const data = await db.finished(num)
    let res = new String()
    data.forEach(({title,time,url},i) => {
      res=res.concat(`${i+1}. ${title} is finished at ${new Date(time).toDateString()},url is ${url}`,'\n')
    });
    msg.channel.send(res)
  }
  if(cmd == 'now'){
    const data = await db.now()
    if(data === null){
      msg.channel.send(`Playing queue is empty,maybe you can find some`)
    }
    else{
      msg.channel.send(`now playing ${data.url}`)
    }
  }
  if(cmd =='help'){
    msg.channel.send(
      `指令說明：
        發送含有工作坊 or gamemaps的連結會自動加入追蹤(需admin權限)
        \`!finished mapname/url\` 將map標示為已完成(需admin權限)
        \`!played (num)\` 發送遊玩過的列表，最近num筆
        \`!now \` 遊玩中的map
      `
    )
  }
});

client.login(cfg.token);


//