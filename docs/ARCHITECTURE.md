# Friendlybot architecture

In a situation where an user types in `!help` on a channel and "friendlybot" needs to return a help message

operations.yml example:

```yaml
version: 1
operations:
  - name: summarize_todays_articles_on_trigger
    type: websocket_trigger
    function: summarize_todays_article.js
    conditions:
      - contentEquals: "!help"
    inputs:
      - client
        message
```

- friendlybot needs to have this behaviour defined in operations.yml
- In this case, it's an event from Discordjs websocket client, which matches type: websocket_trigger
- Then the actionDispatcher bucket decides to use "websocket_action_dispatcher"
   - At this point, we must have client object  and message objects available
- The dispatcher finds that content equals to "!help", which satisfies the operation.yml example
   - At this point, it is certain that there is a function available to invoke according to the payload and operation.yml
- Dispatcher constructs the payload and publishes it
- The subscriber receives the payload and invokes the function accordingly
- In summarize_todays_articles.js, we have requested client object so we can reply back to a channel with a message(edited)
Do you get it?


#### Diagram

<p>
<img width="800" src="https://i.imgur.com/osrb4eV.png" title="source: imgur.com" />
</p>
