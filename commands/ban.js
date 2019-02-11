
module.exports.run = (bot, message, args) => {
  const member = message.mentions.members.first()
  const reason = args.slice(1).join(" ") || "no reason provided."
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid permissions.");
  if (!member) return message.channel.send("You must mention someone.");
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`I can't ban people. Make sure that I have the Ban Members permission.`);
  
  member.ban(reason)
  .then(member => {
    const em = new embed()
    .setTitle("Modbot Banning Utility")
    .setDescription(`👢 I put my digital foot in ${member.displayName}'s digital ass.`)
    .setFooter(`${member.displayName} got a foot to the ass.`)
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({embed: em})
  })
  .catch(err => {
    message.channel.send(`I couldn't ban ${member.displayName}...`)
  })
}
module.exports.help = {
  perm: "owner",
  name: "ban"
}
