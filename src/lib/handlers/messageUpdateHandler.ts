import {Message, PartialMessage} from "discord.js";
import {DiscordManager} from "../DiscordManager.js";
import {regexConfig} from "../../config/commonConfig.js";

export async function messageUpdateHandler(this: DiscordManager, message: Message | PartialMessage) {
    if(message.partial)
        message = await message.fetch();

    if(!message.content)
        return;

    if(message.id !== this.globalIndex?.indexMessage.id) return;

    const dataChannels = message.content.match(regexConfig.index.data)?.map(x => {
        const match = x.match(regexConfig.index.dataGroups);

        if(!match)
            throw new Error("Index message could not be parsed.");

        return {
            id: parseInt(match[1]),
            channelId: match[2],
            guildId: this.guildId,
        };
    }) ?? [];

    this.globalIndex.indexMessage = message;
    this.globalIndex.dataChannels = dataChannels;
}
