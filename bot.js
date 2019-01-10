const discord = require('discord.js')
const bot = new discord.Client()
const hookclient = require('./dhc.js')
const hook = new hookclient.WebhookClient(process.env.id, process.env.token)

bot.login(process.env.btoken)
