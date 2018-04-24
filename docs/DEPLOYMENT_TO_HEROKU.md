# Deployment instruction

##### Download and install Heroku CLI

Please goto 

`https://devcenter.heroku.com/articles/heroku-cli#download-and-install`


##### Deployment to Heroku

Assuming that cli installation is complete, you should be able to
authenticate `heroku` cli.

```bash
$ cd <project_dir>
$ heroku --version  # check version
$ heroku login      # login
```

If you haven't created an app already, do this step

```bash
$ heroku create <app_name, globally unique>
$ git remote -v    # check a remote is created
```

We also need to make sure apps are using the correct timezone
```bash
$ heroku config:add TZ="Australia/Sydney"
```

If you want to base your Heroku app based on a buildpack

```bash
$ heroku create deepcollege-bot-staging --buildpack <github url | shorthand official image>
```

##### Note

Chromium issue: https://github.com/jontewks/puppeteer-heroku-buildpack/issues/13
> May need to change buildpack order 1. Node -> 2. puppeteer

Set environment variables; easiest way is to set it via 
Heroku dashboard. 

1. goto https://dashboard.heroku.com/apps/<your_app>
2. Settings tap
3. Set variables

```bash
# 1. MESSAGE_QUEUE=memory
# 2. DISCORD_PRIV_KEY=<KEY>
```

Once it's done, you can now deploy `friendlybot`

```bash
$ git push <heroku_remote> master
```

How to deploy a worker dyno: https://stackoverflow.com/questions/38343299/deploy-only-worker-dyno-to-heroku-for-firebase-queue 

Check app status (e.g. logs)

```bash
$ heroku logs
```


#### Tips

Keep your free Heroku app awake

`https://quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping/`