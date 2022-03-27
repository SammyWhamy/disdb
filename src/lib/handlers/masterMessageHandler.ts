import {Message} from "discord.js";
import {setup} from "../commands/setup.js";
import {defaultLogger as console} from "../../utils/Logger.js";

export async function masterMessageHandler(message: Message, prefix: string) {
    if (message.author.bot || message.channel.type === "DM" || !message.content) return;

    if (!message.content.startsWith(prefix)) return;
    let command = message.content.slice(prefix.length).toLowerCase();

    console.debug(`${message.author.tag} issued command: ${command}`);

    switch (command) {
        case "ping":
            message.channel.send("Pong!");
            break;

        case "setup": {
            await setup(message);
            break;
        }

        default: {
            console.debug(`Command ${command} not found`);
            break;
        }
    }
}
