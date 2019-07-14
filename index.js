const Discord = require('discord.js')
const cfg = require('./cfg.json')
const post = require('./post')
const crud  = require("./db/index")
const db = new crud()
db.connect(cfg.db)
const client = new Discord.Client()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', async msg => {
  const args = msg.content.slice(cfg.CmdPrefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()
  if(msg.author.bot) return;
  if (/gamemaps|workshop/.test(msg.content)&&args.length == 0) {
    if(await db.is_reapeat(data)){
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
  if(cmd == 'finished'){
    db.change_to_finish(args.join(' ').toString(),msg.createdAt).then((n)=>{
      msg.channel.send(`${args.join(' ').toString()} is finished at ${msg.createdAt }`) 
    })
  }
  if(cmd == 'played'){
    let num = args.length  == 0 ? 0 : parseInt(args[0])
    const data = await db.finished(num)
    let res = new String()
    data.forEach((e,i) => {
      res=res.concat(`${i+1}. ${e.title} is finished at ${new Date(e.time).toDateString()},url is ${e.url}`,'\n')
    });
    msg.channel.send(res)
  }
  if(cmd == 'now'){
    const data = await db.now()
    msg.channel.send(`now playing ${data.url}`)
  }
  if(cmd =='help'){
    msg.channel.send(
      `指令說明：
        發送含有工作坊 or gamemaps的連結會自動加入追蹤
        \`!finished mapname/url\` 將map標示為已完成
        \`!played (num)\` 發送遊玩過的列表，最近num筆
        \`!now \` 遊玩中的map
      `
    )
  }
});

client.login(cfg.token);


//