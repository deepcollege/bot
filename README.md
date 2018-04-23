<p align="center">
<a href="https://i.imgur.com/gW21Bko.jpg"><img width="300" src="https://i.imgur.com/gW21Bko.jpg" title="source: imgur.com" /></a>
<h3>DeepCollege Operational Assistant (friendlybot)</h3>
</p>

> Hi.

[![Build Status](https://travis-ci.org/deepcollege/friendlybot.svg?branch=master)](https://travis-ci.org/deepcollege/friendlybot)
[![Discord](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/MAMPnmm)


### Instruction


##### 1. Set up Discord bot and generate a token

https://anidiots.guide/getting-started/getting-started-long-version

Following along above link will give you

- App registered to be bound to a bot aka our Nodejs discord bot
- A token that you need to place into `.env` file

#### 2. Setup your development environment


Install packages
```bash
$ yarn
or
$ npm install
```

Prepare .env

```bash
$ pwd                     # ensure you are in friendlybot folder
$ cp .env.example .env    # Copied existing .env template
# add your discord bot secret key into .env.
# You must have it if you've followed `1. Set up Discord bot and generate a token` step
# Then place these variables into .env file

.env file may look like
---
MESSAGE_QUEUE=memory
DISCORD_PRIV_KEY=<key>
---

# These keys will be automatically picked up by src/config/index.js and assign
# it to process.env
```

#### 3. Initiate

##### a) bare-metal node approach

To start (for dev)

```$ yarn dev```

To start (for prod)

```$ yarn start```

To build

```bash
$ yarn build
or 
$ npm run build
```

##### b) docker-compose (preferred method)

```bash
# Ensure you have docker-compose and docker installed
$ docker-compose -f compose.dev.yml build
$ docker-compose -f compose.dev.yml up
```

#### 4. Tests

```bash
 docker run \
  --rm \
  -v /c/Users/Shin/Desktop/deepcollege/friendlybot:/home/node/app \
  -v /home/node/app/node_modules \
  friendlybot:latest \
  yarn test
```

#### 4. Code quality

To lint
```bash
$ yarn lint
or 
$ npm run lint
or
docker run -v <path to source code>:/home/node/app -v /home/node/app/node_modules friendlybot:latest yarn lint
```

To fix formats
```bash
$ yarn fix
or 
$ npm run fix
or
docker run -v <path to source code>:/home/node/app -v /home/node/app/node_modules friendlybot:latest yarn fix
```

### Useful links

- `ARCHITECTURE.md` located under `docs/` will give you big picture
understanding about friendlybot architecture
- `DEPLOYMENT_TO_HEROKU.md` can be used to deploy the bot on to Heroku
at the moment we intend to use Heroku for production bot only

