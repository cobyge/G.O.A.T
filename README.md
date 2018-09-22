This fork was made in order to make this repo easily useable, in English, and easy to set up and run.


Create a bot on Discord's developers page at https://discordapp.com/developers/applications/

Find your Client ID on the "General information" page of your bot, and put it into this link:

https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot  (Replace CLIENTID with your Client ID)

Go to that link, and add the bot to your server (You must have Manage Server or Admin permissions)

In the OAuth2 tab, add a redirect, and put in "http://localhost/callback", as well as the link you are going to deploy to + /callback (e.g "https://mydeploymentwebsite.now.sh/callback")

Make a file named .env (You can copy from .env.example) and put it in the project root. The format should be as follows, # comments are allowed:

    #Server ID found on the server settings page in Discord
    SERVER_ID=
    #Client_ID from Discord Developer page
    CLIENT_ID=
    #Client Secret from Discord Developer page
    CLIENT_SECRET=
    #Client Token from Discord Developer page
    CLIENT_TOKEN=
	#Name of category containing all games.  Category names are shown capitalized in Discord regardless of actual capitalization, so I reccommend naming your channel in all caps for simplicity
	CHANNEL_CATEGORY=CATEGORY123
	#Channel for bot commands.  Bot will only work in this channel.
	BOT_COMMAND_CHANNEL=
	#Prefix for Bot command.  (e.g: !help | @help | $help, etc)
	BOT_COMMAND_PREFIX=!
    
Install yarn from yarnpkg.com

Once you have that set up, run:

    yarn

Yarn will install dependencies
Then run:

    yarn dev

And you'll be running in development mode.

Browse to http://localhost:3000, and check it out.

Deployment to Now:
In package.json, under 'deploy', change 
	
	yarn deploy
	
	
Add server icon

Add option for Range of players
Delete game message after 1 hour