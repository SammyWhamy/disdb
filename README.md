## DisDB
#### A package to use Discord as a (horrible) database

### Features:
- A simple key value database
- Entirely hosted in Discord
- Horrible performance
- Dirt poor security
- Awful reliability 

### Example:
```js
import { StorageClient } from 'disdb';

let client = new StorageClient({
    logLevel: "INFO",
    discord: {
        // The prefix you want to use for the master client
        prefix: "!",
        // The ID of your storage server here
        storageServer: "id",
        bots: {
            // The bot token for your master
            // This bot is used for in-Discord control and setup
            master: "token",
            slaves: [
                // The bot tokens for your slaves
                // At least one slave is required, but more will improve performance
                "token",
                "token",
            ]
        }
    }
});

// Connect all clients to Discord and waits until they're ready
await client.connect();

await client.set("key", "value");

await client.get("key"); // returns "value"

await client.exists("test"); // returns true

await client.delete("test");

await client.exists("test"); // returns false
```

### But why?
Because it's fun!  
It's also interesting to see what you can do with Discord and how I can completely misuse it and have fun with it.
You should probably never use this in an actual project, but I won't stop you.

> it's genius because when discord is down, so is your bot, so you only have access to the data when you need it :4head:
> 
> **- devoxin#0001**
