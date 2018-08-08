const Discord = require("discord.js");
const client = new Discord.Client;
const Heroku = require('heroku-client');
var appName = 'yourAppName here';
var dynoName = 'yourDynoHere';
const fs = require("fs")
const ModerationChannelID = "456808712976203777";
const StaffChannelID = "310841081468026880";
let warns = JSON.parse(fs.readFileSync("warnings.json", "utf8"));
//var anti_spam = require("discord-anti-spam");

//anti_spam(client, {
//    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
//    maxBuffer: 8, // Maximum amount of messages allowed to send in the interval time before getting banned.
//    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
 //   warningMessage: "stop spamming or I'll whack your head off.", // Warning message send to the user indicating they are going to fast.
 //   banMessage: "has been put in offenders for spamming, anyone else?", // Ban message, always tags the banned user in front of it.
 //   maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
 //   maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
 //   deleteMessagesAfterBanForPastDays: 7 // Delete the spammed messages after banning for the past x days.
//});

const prefix = ">"
let Initiated = false;
let PartOfPrank = 0;
let UserID = 0;
const Council = "High Council";
const Trium = "Triumvirate";
const Moderator = "Moderator";
const Admin = "Administrator";

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

client.on("ready", () => {
    console.log("AGENT APEX IS HERE FOR THE RESCUE");
    client.user.setActivity(`Operation Protect Apex Zone`);
});


client.on("message", async message => {

    if (Initiated == true && message.author.id == UserID) {
      // Part 1
      if (PartOfPrank == 0) {
        if (message.author.id === "229563674375749633") {
         if (message.content === "rootuserthomas101") {
           PartOfPrank = 1;
           message.channel.sendMessage("Welcome back Thomas.");
           message.channel.sendMessage("What would you like to do?");
           message.channel.sendMessage("1. Reboot");
           message.channel.sendMessage("2. Run protocol SD1");
           message.channel.sendMessage("3. Lockdown");
           message.channel.sendMessage("4. Run the secret command");
         }
        }else {
          message.channel.sendMessage("Invallid password");
          PartOfPrank = 0;
          Initiated = false;
          UserID = 0;
        }
      }
        // Part 2
        if (PartOfPrank === 1) {
          if (message.content === "1") {
            
			const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
			heroku .delete('/apps/' + appName + '/dynos/' + dynoName)
           .then( x => console.log(x) );
            PartOfPrank = 0;
            Initiated = false;
            UserID = 0;
          }
          if (message.content === "2") {
            message.channel.sendMessage("Not done yet!");
            PartOfPrank = 0;
            Initiated = false;
            UserID = 0;
          }
          if (message.content === "3") {
            message.channel.sendMessage("Not done yet!");
            PartOfPrank = 0;
            Initiated = false;
            UserID = 0;
          }
          if (message.content === "4") {
            message.channel.sendMessage("Not done yet!");
            PartOfPrank = 0;
            Initiated = false;
            UserID = 0;
          }
          if (message.content === "5") {
            message.channel.sendMessage("Not done yet!");
            PartOfPrank = 0;
            Initiated = false;
            UserID = 0;
          }
        }
      }


    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "purge") {
        if (message.member.roles.find("name", Admin) || message.member.roles.find("name", Council) || message.member.roles.find("name", Trium) || message.member.roles.find("name", Moderator)) {
            const deleteCount = parseInt(args[0], 10);

            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

            const fetched = await message.channel.fetchMessages({ limit: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        }
    }
    if (command === "eval") {
        if (message.author.id !== "229563674375749633") return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            let evalembed = new Discord.RichEmbed()
                .setTitle("**Eval Succes**")
                .setColor("#fc6400")
                .addField(":inbox_tray: INPUT", `\`\`\`js\n${code}\`\`\``)
                .addField(":outbox_tray: OUTPUT", `\`\`\`js\n${clean(evaled)}\`\`\``);

            message.channel.send(evalembed);

        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    if (command === "help") {
        message.channel.send("**>purge {amount}** | *this removes the amount of messages you entered in {amount}*\n**>warn {mention user} -r {reason}** | *this warns the {mention user} for the reason {reason}*\n**>resolve {user id} {warn id}** | *this resolved the warning of {user id} with the warn id of {warn id}*\n**>kick {mention user} {reason}** | *if you piece of crap don't know what this does you dumb xD*\n**>ban {mention user} {reason}** | *same as with the kick if you don't know you suck lol*")
    }
    if (command === "warn") {
        if (message.member.roles.find("name", Admin) || message.member.roles.find("name", Council) || message.member.roles.find("name", Trium) || message.member.roles.find("name", Moderator)) {

            if (!message.mentions.users.first()) {
                message.reply("Agent Apex cant warn without a Victim and Reason...");
            } else if (args.includes("-r") === false) {
                message.reply("Agent Apex just noticed you are trying to warn without a reason... example: " + prefix + "warn @user -r spamming shit");
            } else {
                message.reply("Agent Apex has stored your warning in its database.");

                let wUser = message.guild.member(message.mentions.users.first());
                let reason = args.join(" ").slice(22).replace("-r", "");
                let Letters = "qwertyuiopasdfghjklmnbvcxz1234567890";
                let WarnID = "";

                for (var i = 0; i < 6; i++) {
                    WarnID += Letters[Math.floor(Math.random() * Letters.length)];
                }

                if (!warns[wUser.id]) warns[wUser.id] = {
                    warns: 0,
                    WarnIDS: []
                };

                warns[wUser.id].warns++;
                warns[wUser.id].WarnIDS.push(WarnID);
                fs.writeFile("warnings.json", JSON.stringify(warns), (err) => {
                    if (err) {
                        message.reply("ERROR: " + err.message);
                    }
                });

                let warnEmbed = new Discord.RichEmbed()
                    .setDescription("Warns")
                    .setAuthor(message.author.username)
                    .setColor("#fc6400")
                    .addField("Warned User", wUser.user.tag)
                    .addField("User ID", wUser.user.id)
                    .addField("Total Warnings", warns[wUser.id].warns)
                    .addField("Reason", reason)
                    .addField("Warned By", message.author.tag)
                    .addField("WarnID", WarnID);
                message.guild.channels.get(ModerationChannelID).send(warnEmbed);
            }
        }
    }
    if (command === "resolve") {
     try {
        if (message.member.roles.find("name", Admin) || message.member.roles.find("name", Council) || message.member.roles.find("name", Trium) || message.member.roles.find("name", Moderator)) {
            if (!args) {
                message.reply("You have to supply a User ID and Warn ID");
            } else {
                let wUserID = args[0];
                let WarnID = args[1];
                for (var i = 0; i < warns[wUserID].WarnIDS.length; i++) {
                    if (warns[wUserID].WarnIDS[i] == WarnID) {
                        message.reply("Resolved Warning" + WarnID);
                        warns[wUserID].warns--;
                        delete warns[wUserID].WarnIDS[i];
                        fs.writeFile("warnings.json", JSON.stringify(warns), (err) => {
                           if (err) {
                           message.reply("ERROR: " + err.message);
                           }
                       });
                    }
                }
            }
        }
     } catch (err) {
      message.reply("ERROR: " + err.message);
     }
    }

    if (command === "kick") {
        if (message.member.roles.find("name", Admin) || message.member.roles.find("name", Council) || message.member.roles.find("name", Trium)) {
            let user = message.mentions.users.first();
            let reason = args.join(" ").slice(22)
            message.guild.member(user).sendMessage("You have been kicked from: " + message.guild.name + "\nReason: " + reason);
            let warnEmbed = new Discord.RichEmbed()
                .setDescription("Kicked")
                .setAuthor(message.author.username)
                .setColor("#fc6400")
                .addField("Kicked User", user.tag)
                .addField("Total Warnings", warns[user.id].warns)
                .addField("Reason", reason)
                .addField("Kicked By", message.author.tag)
            message.guild.channels.get(ModerationChannelID).send(warnEmbed);
            message.guild.member(user).kick(reason);
        }
    }

    if (command === "ban") {
        if (message.member.roles.find("name", Trium) || message.member.roles.find("name", Council)) {

            let user = message.mentions.users.first();
            let reason = args.join(" ").slice(22)
            message.guild.member(user).sendMessage("You have been banned from: " + message.guild.name + "\nReason: " + reason);
            let warnEmbed = new Discord.RichEmbed()
                .setDescription("Banned")
                .setAuthor(message.author.username)
                .setColor("#fc6400")
                .addField("Banned User", user.tag)
                .addField("Total Warnings", warns[user.id].warns)
                .addField("Reason", reason)
                .addField("Banned By", message.author.tag)
            message.guild.channels.get(ModerationChannelID).send(warnEmbed);
            message.guild.member(user).ban(reason);
        }
    }

        if (command === "login") {
            Initiated = true;
            UserID = message.author.id;
            message.channel.sendMessage("**Username: " + message.author.username + "**");
            message.channel.sendMessage("Please enter your password");
        }
});

function GetWarnID(id) {
    return data.filter(
        function (data) {
            return data.id == id
        }
    );
}















































































































































client.login(process.env.TOKEN);
