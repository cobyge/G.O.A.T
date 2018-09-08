Create a bot on Discord's developers page at https://discordapp.com/developers/applications/

Find the Client ID and put it into this link:

https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot

Go to that link, and add the bot to your server (You must have Manage Server permission, or be an Admin)

Make a file called .env and put it in the project root. The format should be as follows:

#Server ID found on the server settings page in discord
SERVER_ID=
#Client_ID from Discord Developer page
CLIENT_ID=
#Client Secret from Discord Developer page
CLIENT_SECRET=
#Client Token from Discord Developer page
CLIENT_TOKEN=
#URL of callback site for DiscordAPI, leave empty for default localhost:3000
SITE_URL=


Once you have that set up, run:

yarn

Yarn will install dependencies
Then run:

yarn dev

And you'll be running in development mode.

Browse to http://localhost:3000