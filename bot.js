const discord = require('discord.js')
const bot = new discord.Client()
const hookclient = require('./dhc.js')
const hook = new hookclient.WebhookClient(process.env.id, process.env.token)
const prefix = "m)"
const adminPerms = ["owner", "server_admin", "moderator"]
const admins = [process.env.owner]

bot.commands = new Map()

require('fs').readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  
  files.filter(f => f.split(".").pop() === "js").forEach((f,i) => {
    var name = require(`./commands/${f}`).help.name
    var file = require(`./commands/${f}`)
    
    bot.commands.set(name, file)
  })
})

bot.on('ready', () => {
  console.log(bot.user.username+" is ready!")
  bot.user.setActivity(`over Discord HookClient Official | m)help`, {type: "WATCHING"})
})

bot.on('message', message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  
  const mArray = message.content.split(" ");
  const args = mArray.slice(1)
  const c = mArray[0].slice(prefix.length)
  const cmd = bot.commands.get(c)
  const perm = cmd.help.permission
  
  if (cmd) {
    if (adminPerms.includes(perm)) {
      if (admins.includes(message.author.id)) {
        cmd.run(bot, message, args)
      } else {
        message.channel.send("Invalid permissions!");
      }
    } else {
      cmd.run(bot, message, args)
    }
  }
})

bot.login(process.env.btoken)
