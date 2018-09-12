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

client.on('ready', () => {
  console.log(`> Bot Ready`)
})
var TAGS = []

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
          ? SITE_URL + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.redirect(
          301,
          process.env.SITE_URL
            ?  + '/goat?code=' +
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
        console.log(err)
        res.send({ error: true })
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
          ? SITE_URL + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.send({ access_token: access_token, refresh_token: refresh_token })
      })
      .catch(err => {
        console.log(err)
        res.send({ error: true })
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
  
  
//My code to get all channels from specific category and put into TAGS(Used to be hardcoded)
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
                            TAGS.push(data.data[j]['name'])
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
