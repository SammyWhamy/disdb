import {ClientOptions, Intents} from "discord.js";

export const master: ClientOptions = {
    presence: {
        activities: [{
            name: "a database",
            type: "WATCHING",
        }],
        status: "online",
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
}

export const slave: ClientOptions = {
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
}

export const discordConfig = {
    master,
    slave,
}
