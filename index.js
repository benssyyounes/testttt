// require the discord.js module
const Discord = require('discord.js');
const { prefix, token, giphyToken } = require ('./config.json');
const client = new Discord.Client ();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)


client.once('ready', () => { console.log('Ready!')
})

client.on('message', message =>{
    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        //console.log(message.content);

        if(message.content.startsWith(`${prefix}kick`)){
            //message.channel.send("Kick")

            let member = message.mentions.members.first ();
            member.kick().then ((member) => {
                
                giphy.search('gifs', {"q": "fail"})
                    .then((response) => {
                        //console.log(response);
                        var totalResponses = response.data.lenght;
                        console.log(totalResponses);
                        var responseIndex = Math.floor((Math.random() * 25) + 1);
                        //var responseIndex = 2;
                        ///console.log(responseIndex);
                        var responseFinal = response.data[responseIndex];
                        //console.log(responseFinal);
                        //var responseFinal = response.data[1];

                        message.channel.send (":wave: " + member.displayName + " has been Kicked!", {
                            files:[responseFinal.images.fixed_height.url]
                        })

                    }).catch(() => {
                        message.channel.send('Error ugh!');
                    })
                
            })
        }

        if(message.content.startsWith(`${prefix}ban`)){
            //message.channel.send("ban")

            let member = message.mentions.members.first ();
            member.ban().then ((member) => {
                
                giphy.search('gifs', {"q": "fail"})
                    .then((response) => {
                        var totalResponses = response.data.lenght;
                        console.log(totalResponses);
                        var responseIndex = Math.floor((Math.random() * 25) + 1);
                        var responseFinal = response.data[responseIndex];

                        message.channel.send (":wave: " + member.displayName + " has been Banned!", {
                            files:[responseFinal.images.fixed_height.url]
                        })

                    }).catch(() => {
                        message.channel.send('Error ugh!');
                    })
                
            })
        }

    }
})

client.login(token);
