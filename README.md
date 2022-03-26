## DisDB
#### A package to use Discord as a (horrible) database

### Configuration:
```js
const config = {
    "discord": {
        // Add the ID of your storage server here
        "storageServer": "",
        "bots": {
            // Add the bot token for your master here
            // This bot is used for in-Discord control and setup
            "master": "", 
            "slaves": [
                // Add the bot tokens for your slaves here
                // At least one slave is required, but more will improve performance
            ]
        }
    }
};
```
