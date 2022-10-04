# zurabot
A Discord Bot Project (v14) designed to provide a template for new "slash" command bots for the Discord client

## Install

All base required packages are pre-installed - see `package.json` for more details:

    # With Yarn
    yarn install

    # With NPM
    npm i 

## Setup of Environmental Variables

To ensure the template bot can run on your Discord client of choice, you will need to set the following variables in a new `.env` file:

    # env file
    DISCORD_TOKEN=
    CLIENT_ID=
    GUILD_ID=

To determine the values of these `env` variables, please review [Integration with Discord Client](#integration-with-discord-client) below.

## Usage

The project is run as a Node.js server, with scripts allowing for the use of `nodemon` to spin up the development environment:

    # With Yarn
    yarn dev

    # With NPM
    npm run dev

Make sure to review the linter file, to ensure your ruleset is consistent with your development standards (see `.eslintrc.json`)

&nbsp;

## Template Technical Build Details

This project was to create a Discord Bot template in line with [v14 Discord specifications](https://discordjs.guide/creating-your-bot/).  In particular, it is designed to allow for modular development of new "slash commands", whilst maintaining a DRY index file system.  

&nbsp;

### Entry point file (`index.js`)

- **LINES 1-11:** Imports all required modules & creates new instance of Discord Client with **attached** commands property, [which will allow access to commands in other files](https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files)

- **LINES 13-22:** Creates a dynamic file retrieval system, using the `fs` (*File System*) package, as part of Node.js.  The remaining code merely looks through **ALL** `functions`, `events` & `commands` directories for `.js` files

- **LINES 25-32:** These `.js` files are ordered in accordance with the `handleEvents.js` and `handleCommmands.js` functions, which basically checks for WHAT available events have been created and WHAT commands are available to the user

&nbsp;

### Function-handling (`/functions`)

The purpose of the function directory is to automatically retrieve and register NEW event & command files whenever you restart the bot*ties into the entry point file, file system*) 

It also sets the CLIENT/GUILD information & the API auth details for the Bot

&nbsp;

### Events (`/events`)

Node.js & Discord uses event-driven architecture - and will respond in order of the events that occur

  - Events can include things like the Discord bot turning on, to user interactions, to database responses

  - You will mainly focus on `interactionCreate.js`, which checks which "slash command" event has been queued by the Discord user.

  - We specify these interaction events in the `/command` folder & sub-folders

&nbsp;

### Commands (`/commands`)

Discord provides developers with the option to create client-integrated slash commands

- *Previously, the user had to enter a custom "prefix" and refer to documentation to figure out what the right command was*).  

- The commands sub-folders represent different slash commands, and **will likely be the main focus for using this template**.

To build your own custom commands, you will need to research:

- [v14 Discord Guide](https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands), which provides useful examples and code snippets for different types of commands

  - For example, you will may need to use the [`EmbedBuilder`](https://discordjs.guide/popular-topics/embeds.html#embed-preview) library, to allow for special/custom content to be displayed in the Discord

  - See an example of an `EmbedBuilder` in use [here](https://github.com/DanielFitzsimmons/discord-bots)

- [Discord Functions & Classes documentation](https://discord.js.org/#/docs/discord.js/main/function/createComponent), which provides in-depth technical details on functions/classes you may need to use & determine the behaviour of (*i.e. what parameters they take, what promises are returned, etc.*)

&nbsp;

## Integration with Discord Client 

To test your discord bot on a live Discord server, you will need to complete two broad steps, as provided by Discord documentation:

- [Read  about Bot Applications here.](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

- [Read about Adding a Bot here.](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)

### 1. Setup a Bot Application

- **(a) Create the Application:**
  
  - Go to the **Discord Developer Portal** 
    
  - Click the TOP-LEFT button to create a New Application, with the name of the Bot 
  
  - *Note: you will need to create a Discord account to access the Dev portal*

- **(b) Edit & Add Bot:**

  - On the landing page, you can edit details about your bot such as name, description, avatar and so on

  - Once ready, click on the "Bot' section in the menu, and "Add Bot"

- **(c) Obtain Bot Token**

  - The bot token effectively represents your bot's password & is what your bot uses to login to Discord.  

  - Click "Reset Token" to reveal your token and save this information to the `env` file [detailed above](#setup-of-environmental-variables) under `DISCORD_TOKEN`

  - *Note: If you have 2FA setup on your Discord account, you will need to enter this before getting your token!*
 
&nbsp;

### 2. Add Bot to Discord Server

- **(a) Configure Invite Link (to Discord Server)**

  - **"Bot" section** - enable all three **Privleged Gateway Intents**, just to allow your bot access to more features, and not constrain it initially in testing - *save changes once ticked*

  - **"OAuth2 section** - inside, click on **"URL Generator"**, and adjust the scopes & bot permissions:

    - (i) SCOPES: Click `bot` and `applications.commands`

    - (ii) PERMISSIONS: Click `Administrator`

  - Copy the custom link provided at the bottom of the page

- **(b) Invite Bot to Designated Server**

  - Log into your Discord client, and on the left-hand side, click the `+` icon, to create your own discord server

  - Once you have reached your server with a `#general` channel, you are ready to add your bot to it

  - Using the custom URL, copy it into your browser, and select your bot be added to your created Discord server

- **(c) Obtain bot "client" & discord server "guild" IDs**

  - On the Discord client, click Settings & under "Advanced", enable "Developer Mode":

    - (i) CLIENT: Right click the Bot and copy ID & save as the `CLIENT_ID` in the `env` as [detailed above](#setup-of-environmental-variables)

    - (ii) GUILD: Right click the Server and copy ID & save as the `GUILD_ID` in the `env` as [detailed above](#setup-of-environmental-variables)

  - *NOTE: Our bot will now ONLY work in the server we specified with these IDs - if you need to migrate servers, you will need to re-obtain these IDs in the new server*

  - **ON COMPLETION:** Start up your discord bot, and you should be able to see the Bot become active and ready for testing!