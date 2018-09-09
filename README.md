This fork was made in order to make this repo easily useable, in English, and easy to set up and run.


Create a bot on Discord's developers page at https://discordapp.com/developers/applications/

Find the Client ID and put it into this link:

https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot

Go to that link, and add the bot to your server (You must have Manage Server permission, or be an Admin)

Make a file called .env and put it in the project root. The format should be as follows, # comments are allowed:

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

	#Default server role that users are placed into by Discord (Changes per server).  The code currently changes this value to "Vault Dweller", need to add another env to customize roles.
	DEFAULT_SERVER_ROLE=Wastelander

	#EXCLUDE_SERVER_ROLE=  Insert comma seperated list of roles that are not game related (Admin, user, different ranks, etc.)

	#Name of category containing all games.  Category names are capitalized in Discord regardless of Category name, so I reccommend naming you channel in all caps
	CHANNEL_CATEGORY=CATEGORY123

	#Extra Tags included such as age, etc.  Seperated by comma without spaces
	EXTRA_TAGS=
    
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
        /components/ManualKarma.js   //Only if we are going to use it (unlikely)
        /components/ManualNetwork.js
        /components/ManualRules.js
        /components/ManualTags.js
    
    Change code so TAGS will be a list of channels, taken from the channel when user visits webpage.
    
    Decide if Karma page is something we want in our server.
    
    Change the way this server currently adds new members:  It currently has it's roles hardcoded into the body, I want to make some of them come from the server (channels), and some come from env-file (Default role, and role to change to (if-any).
	
	Add explanation of the tagging system