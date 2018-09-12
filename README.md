This fork was made in order to make this repo easily useable, in English, and easy to set up and run.


Create a bot on Discord's developers page at https://discordapp.com/developers/applications/

Find the Client ID and put it into this link:

https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot

Go to that link, and add the bot to your server (You must have Manage Server permission, or be an Admin)

Make a file named .env and put it in the project root. The format should be as follows, # comments are allowed:

    #Server ID found on the server settings page in Discord
    SERVER_ID=
    #Client_ID from Discord Developer page
    CLIENT_ID=
    #Client Secret from Discord Developer page
    CLIENT_SECRET=
    #Client Token from Discord Developer page
    CLIENT_TOKEN=
    #URL of callback site for DiscordAPI, leave empty for default localhost:3000
    SITE_URL=

	#Name of category containing all games.  Category names are shown capitalized in Discord regardless of actual capitalization, so I reccommend naming your channel in all caps for simplicity
	CHANNEL_CATEGORY=CATEGORY123

    
Install yarn from yarnpkg.com

Once you have that set up, run:

    yarn

Yarn will install dependencies
Then run:

    yarn dev

And you'll be running in development mode.

Browse to http://localhost:3000

Changing font:
Should be able to easily change font from /static/monofont.ttf
Font rules are contained in /pages/goat.js, and in /pages/rules.js

Public TODO:

    TRANSLATE INTO ENGLISH:
        /pages/goat.js
        /components/ManualNetwork.js
        /components/ManualRules.js
            
    Figure out now.json file renaming.  Add now deployment to README
    	
	Add explanation of the tagging system