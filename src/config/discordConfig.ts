import {ActivityType, ClientOptions, GatewayIntentBits} from "discord.js";

export const master: ClientOptions = {
    presence: {
        activities: [{
            name: "a database",
            type: ActivityType.Watching,
        }],
        status: "online",
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}

export const slave: ClientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}

export const discordConfig = {
    master,
    slave,
}
