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
try{
    const EXTRA_TAGS = process.env.EXTRA_TAGS.split(',')
}
catch(err){const EXTRA_TAGS = ''}

//List of games, as a tag.  Here I should have code to verify that the tag I get into handleTags is a valid tag, based off of the forums.
/*const TAGS = [
  'Blades',
  'Regulators (FO1)',
  'Unity',
  'Brotherhood of Steel',
  'Followers of the Apocalypse',
  'Raider Gangs',
  'Enclave',
  'Shi',
  'Unity',
  'Vault City',
  'Tanker Vagrants',
  'Raider Gangs',
  'Enclave',
  "Lyon's Pride",
  'Regulators (FO3)',
  'Tunnel Snakes',
  "Reilly's Rangers",
  'Talon Company',
  'Children of the Atom',
  'BoS - Outcasts',
  'Outcasts',
  'Raider Gangs',
  'Independent Vegas (Yes Man)',
  'Mr. House',
  "Caesar's Legion",
  'New California Republic',
  'Followers of the Apocalypse',
  'Kings',
  'Great Khans',
  'Boomers',
  'Brotherhood of Steel',
  'Raider Gangs',
  'Sorrows',
  'Twisted Hairs',
  'Railroad',
  'Minutemen',
  'Institute',
  "Maxson's Pride",
  'Atom Cats',
  'Children of the Atom',
  'Raider Gangs',
  'Midwest Chapter',
  'Not Specified',
  '+18',
  '-18',
  'Brotherhood of Steel (Mojave Chapter)',
  'Brotherhood of Steel (First Chapter)',
  "Brotherhood of Steel (Lyon's Pride)",
  "Brotherhood of Steel (Maxson's Pride)",
  'Brotherhood of Steel (Midwest Chapter)',
  'Brotherhood of Steel (Outcasts)',
  'NoAge'
]*/


client.on('ready', () => {
  console.log(`> Bot Ready`)
})


//On first log-in *to this website*, this gets called, and changes the default role.  *TODO*: Change hardcoded roles into a CONST up above
function addMembership(member) {
  const GUILD = client.guilds.find('id', SERVER_ID)
  member.addRole(GUILD.roles.find('name', 'Vault Dweller').id).then(() => {
    member.removeRole(GUILD.roles.find('name', DEFAULT_SERVER_ROLE).id)
    member.addRole(GUILD.roles.find('name', 'Vault Renegade [0]').id)
  })
}


//Useless Function that handles BoS
function toggleRole(member, tag) {
  const GUILD = client.guilds.find('id', SERVER_ID)
  if (member.roles.find('name', tag)) {
    member.removeRole(GUILD.roles.find('name', tag).id).then(() => {
      if (
        !(
          member.roles.find('name', "Lyon's Pride") ||
          member.roles.find('name', "Maxson's Pride") ||
          member.roles.find('name', 'Midwest Chapter') ||
          member.roles.find('name', 'First Chapter') ||
          member.roles.find('name', 'Mojave Chapter') ||
          member.roles.find('name', 'Outcasts')
        )
      )
        member.removeRole(GUILD.roles.find('name', 'Brotherhood of Steel').id)
    })
  } else {
    member.addRole(GUILD.roles.find('name', 'Brotherhood of Steel').id)
    member.addRole(GUILD.roles.find('name', tag).id)
  }
}


//Handles changing Tags, most of it is useless to us, last is important
function handleTags(member, tag) {
  const GUILD = client.guilds.find('id', SERVER_ID)
  if (TAGS.includes(tag)) {
    let userTags = member.roles.filterArray(i => TAGS.includes(i.name))
    if (tag === 'Not Specified') {
      for (let tag of userTags) {
        if (tag.name === '+18' || tag.name === '-18') continue
        member.removeRole(GUILD.roles.find('name', tag.name).id)
      }
      member.addRole(GUILD.roles.find('name', 'Not Specified').id)
      return
    }
    if (tag === 'NoAge') {
      if (member.roles.find('name', '-18')) {
        member.removeRole(GUILD.roles.find('name', '-18').id)
      } else if (member.roles.find('name', '+18')) {
        member.removeRole(GUILD.roles.find('name', '+18').id)
      }
      return
    }
    //Try to sort out this code
    if (tag === '+18' || tag === '-18') {
      if (member.roles.find('name', '-18')) {
        member.removeRole(GUILD.roles.find('name', '-18').id).then(() => {
          member.addRole(GUILD.roles.find('name', tag).id)
        })
      } else if (member.roles.find('name', '+18')) {
        member.removeRole(GUILD.roles.find('name', '+18').id).then(() => {
          member.addRole(GUILD.roles.find('name', tag).id)
        })
      } else {
        member.addRole(GUILD.roles.find('name', tag).id)
      }
      return
    }
    
    //Get rid of all this, it's useless
    if (member.roles.find('name', 'Not Specified')) {
      member.removeRole(GUILD.roles.find('name', 'Not Specified').id)
    }
    if (tag === 'Brotherhood of Steel (First Chapter)') {
      toggleRole(member, 'First Chapter')
      return
    }
    if (tag === "Brotherhood of Steel (Lyon's Pride)") {
      toggleRole(member, "Lyon's Pride")
      return
    }
    if (tag === 'Brotherhood of Steel (Mojave Chapter)') {
      toggleRole(member, 'Mojave Chapter')
      return
    }
    if (tag === "Brotherhood of Steel (Maxson's Pride)") {
      toggleRole(member, "Maxson's Pride")
      return
    }
    if (tag === 'Brotherhood of Steel (Midwest Chapter)') {
      toggleRole(member, 'Midwest Chapter')
      return
    }
    if (tag === 'Brotherhood of Steel (Outcasts)') {
      toggleRole(member, 'Outcasts')
      return
    }
    if (member.roles.find('name', tag)) {
      member.removeRole(GUILD.roles.find('name', tag).id)
    } else {
      member.addRole(GUILD.roles.find('name', tag).id)
    }
  } else {
    console.log(member.name, '#', member.discriminator, '- Tag not recognized')
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

//Has Block of useless code regarding Brotherhood of Steel, selecting all BoS versions applicable.  Only part of this is useful.
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
        console.log(tags)
        res.send(tags)
      })
    } else {
      res.send(req.body)
    }
  })

  app.get('/userRoles/:userid', (req, res) => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
        req.params.userid
      }`,
      headers: {
        Authorization: 'Bot ' + token
      }
    })
      .then(({ data }) => {
        res.send(data.roles)
      })
      .catch(err => res.send('error'))
  })

  
//MyCode to get all channels from specific category

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
            var TAGS = []
            try{
                for (i in EXTRA_TAGS){
                    TAGS.push(EXTRA_TAGS[i])
                }
            }
            catch(err){
                TAGS = []
            }
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
		})
		.catch(err => res.send('error'))
  })
  
  app.post('/handleTags', (req, res) => {
    if (req.body.token) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/users/@me`,
        headers: {
          Authorization: 'Bearer ' + req.body.token
        }
        //Next bit of code checks to see if the user is a member of group DEFAULT_SERVER_ROLE, and if it is, calls addMembership
      }).then(({ data }) => {
        const member = client.guilds
          .find('id', SERVER_ID)
          .members.find('id', data.id)
        if (member.roles.find('name', DEFAULT_SERVER_ROLE)) addMembership(member)
        addMembership(member)
        handleTags(member, req.body.tag)
        res.send(member)
      })
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
