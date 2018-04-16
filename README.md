<p align="center">
<a href="https://i.imgur.com/gW21Bko.jpg"><img width="300" src="https://i.imgur.com/gW21Bko.jpg" title="source: imgur.com" /></a>
<h3>DeepCollege Operational Assistant (friendlybot)</h3>
</p>

> Hi.

### Instructions

#### 1. Setup your development environment


1. Install packages
```angular2html
$ yarn
or
$ npm install
```

2. Create .env

```angular2html
$ pwd  # ensure you are in friendlybot folder
$ cp .env.example .env
$ # add your discord bot secret key into .env

.env file may look like
---
DISCORD_PRIV_KEY=<key>
---
# These keys will be automatically picked up by src/config/index.js and assign
# it to process.env
```

#### 2. Initiate

To start
```angular2html
$ yarn start
or
$ npm start
```

To build

```bash
$ yarn build
or 
$ npm run build
```

#### 3. Code quality

To lint
```angular2html
$ yarn lint
or 
$ npm run lint
```

To fix formats
```angular2html
$ yarn fix
or 
$ npm run fix
```