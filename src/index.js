import axios from 'axios'
import qs from 'qs'
import Discord from 'discord.js'
import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'
require('dotenv').config()

const client = new Discord.Client()
const SERVER_ID = process.env.SERVER_ID
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const token = process.env.CLIENT_TOKEN
const DEFAULT_SERVER_ROLE = process.env.DEFAULT_SERVER_ROLE
const CHANNEL_CATEGORY = process.env.CHANNEL_CATEGORY
const BOT_COMMAND_CHANNEL = process.env.BOT_COMMAND_CHANNEL
const prefix = process.env.BOT_COMMAND_PREFIX
var TAGS = []

client.on('ready', () => {
  console.log(`> Bot Ready`)
})

//Creating game matcher here:
client.on("message", (message) => {
	//Only continue if message is meant for bot, and was not sent by a bot.3
	if (!(message.channel.name == BOT_COMMAND_CHANNEL) || (!message.content.startsWith(prefix))|| message.author.bot)return
	
	//Split message into command, and into args for command
	const args = message.content.slice(prefix.length).trim().split(/ *,+ */g)
    const command = args.shift().toLowerCase().split(/ +/g)[0]
	
	//Need to create a help page
	switch (command){
		case 'help':
			message.delete()
			message.channel.send(`
Finding games:
The only current command is: !lookingforgame/!lfg:  This command will help you find people to play games with.  You can use this command, and tell it which game you are looking for, and how many more players you need.  The command looks like this: '!lfg, Monster Hunter: World, 3'.  This tells the bot that you are looking to play Monster Hunter World, and you are looking for 3 more people to play with.  Once 3 people join you, your post will be deleted, and you will get messages from the bot telling who wants to play with you.  Make sure to use commas to seperate the command, game, and number of players.

Joining Games:
When someone is looking for a game, you will be able to see a message from a bot, and a reaction under that.  When you click on the reaction, you will be added to the player count, and the bot will let the person looking know.
			`).catch(err => console.log(err))
			break
			
		case 'lookingforgame':
		case 'lfg':
			//Makes sure that the correct number of arguments are given, in the correct format
			if (!(args[1] || (RegExp('\w+').test(args[0])))){message.channel.send('Forgot Arguments'); message.delete(); break}
			if (!(RegExp('\\d+').test(args[1])) || args[1] == 0) {message.channel.send('How many players are you looking for?'); message.delete(); break}
			let [game, amountofplayers] = args
			amountofplayers = amountofplayers.match(/\d+/g)[0].split(" ").slice(-1)[0].replace(/\D/g,'')
			message.reply(`is looking for a game of ${game}.  They need another ${amountofplayers}.  Click on the reaction to join.`).then(message=>
			message.react('✋'))
			message.delete()
			break

			default:
			message.delete()
			message.channel.send("Command not found").catch(err => console.log(err))
			break
	}
})

client.on("messageReactionAdd", (reaction, user) => {
	if (!(reaction.message.channel.name == BOT_COMMAND_CHANNEL) || reaction.emoji != '✋' || user == client.user)return
	var currentPlayers = reaction.count - 1
	var goalPlayers = reaction.message.edits.slice(-1)[0].content.match(/need another[-0-9a-zA-Z \/_?:.,\s]*\d+/g)[0].split(" ").slice(-1)[0].replace(/\D/g,'')
	var playersNeeded = goalPlayers - currentPlayers
	var hostPlayer = reaction.message.mentions.users.last()
	//When Game is full, edit message to show that the game is full.  Otherwise, edit it to reflect that.
	if (playersNeeded == 0){
		reaction.message.clearReactions()
		reaction.message.edit(`${hostPlayer} has found his players.`)
	}
	else {reaction.message.edit(`${reaction.message.edits.slice(-1)[0]} ${hostPlayer} has currently found ${currentPlayers}.  Need ${playersNeeded}`)}
	
	//Handle users
	hostPlayer.send(`${user} wants to play with you`).catch(err => console.log(err))
})

//Handles changing Tags, most of it is useless to us, last is important
//Gets the users info, and the name of the tag to be toggled.
function handleTags(member, tag) {
  const GUILD = client.guilds.find('id', SERVER_ID)
  if (TAGS.includes(tag)) {
    let userTags = member.roles.filterArray(i => TAGS.includes(i.name))
    //Next 3 lines remove all roles except age if someone clicked 'Not Specified'
    if (tag === 'Not Specified') {
      for (let tag of userTags) {
        member.removeRole(GUILD.roles.find('name', tag.name).id)
      }
      //This line adds the 'Not specified' role to those who ask
      member.addRole(GUILD.roles.find('name', 'Not Specified').id)
      return
    }    
    //If the member has 'Not Specified' role, it removes it.
    if (member.roles.find('name', 'Not Specified')) {
      member.removeRole(GUILD.roles.find('name', 'Not Specified').id)
    }
    //If the tag == a role that the user currently has, remove it.  Otherwise, add it.
    if (member.roles.find('name', tag)) {
      member.removeRole(GUILD.roles.find('name', tag).id)
    } else {
      member.addRole(GUILD.roles.find('name', tag).id)
    }
  }
  //If someone sends an invalid TAG, then log it.
  else {
    console.log(member.user.username, '#', member.user.discriminator, '- Tag not recognized - ', tag)
  }
}

client.login(token)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
var i = 0
var j = 0

nextApp.prepare().then(() => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

//This code handles the callback when the Discord Auth sends the user back to GOAT
  app.get('/callback', (req, res) => {
    axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: req.query.code || req.body.code || req.params.code,
        redirect_uri: process.env.SITE_URL
          ? process.env.SITE_URL + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.redirect(
          301,
          process.env.SITE_URL
            ? process.env.SITE_URL + '/goat?code=' +
              access_token +
              '&refresh=' +
              refresh_token
            : 'http://localhost:3000/goat?code=' +
              access_token +
              '&refresh=' +
              refresh_token
        )
      })
      .catch(err => {
        console.log("Callback Error\n", err)
        res.send({ error_callback: true })
      })
  })

//This refreshes the user token
  app.post('/refresh', (req, res) => {
    axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: req.body.refresh_token,
        redirect_uri: process.env.SITE_URL
          ? process.env.SITE_URL + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.send({ access_token: access_token, refresh_token: refresh_token })
      })
      .catch(err => {
        console.log('Refresh Error\n', err)
        res.send({ error_refresh: true })
      })
  })

//Get a list of user roles.  For each role, it gets it's name, and then sends a list of all roles to FormVault
  app.get('/userTags/:userid', (req, res) => {
    if (req.params.userid) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
          req.params.userid
        }`,
        headers: {
          Authorization: 'Bot ' + token
        }
      }).then(({ data }) => {
        let tags = []
        for (let tag of data.roles) {
          tags.push(
            client.guilds.find('id', SERVER_ID).roles.find('id', tag).name
          )
        }
        res.send(tags)
      }).catch(err => res.send('error'))
    } else {
      res.send(req.body)
    }
  })
  
  
//Gets all channels from specific category and put into TAGS
    app.get('/serverChannels', (req, res) => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/channels
    `,
      headers: {
        Authorization: 'Bot ' + token
      }
    })
        .then(function(data){
			TAGS = []
            for (i in data.data){
                if (data.data[i]['name'] == CHANNEL_CATEGORY  && data.data[i]['type'] == 4){
                    for (j in data.data){
                        if (data.data[i]['id'] == data.data[j]['parent_id']){
								TAGS.push(data.data[j]['name'].match(/\w+-*\w+/g)[0])
						}
                    }
                }
            }
        res.send(TAGS)
        }).catch(err => console.log(err))
  })

//This code gets a token from the user, checks to see if the user is new (based on the user having DEFAULT_SERVER_ROLE).  If he does, it calls addMembership(Which changes his roles).  Then calls handleTags.
  app.post('/handleTags', (req, res) => {
    if (req.body.token) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/users/@me`,
        headers: {
          Authorization: 'Bearer ' + req.body.token
        }
      }).then(({ data }) => {
        const member = client.guilds
          .find('id', SERVER_ID)
          .members.find('id', data.id)
        handleTags(member, req.body.tag)
        res.send(member)
      }).catch(err => console.log(err))
    } else {
      res.send(req.body)
    }
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(3000, err => {
    if (err) throw err
    console.log(`> Web service ready on http://localhost:${3000}`)
  })
})
