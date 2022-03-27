import {GlobalIndex} from "../../types/GlobalIndex.js";
import {regexConfig} from "../../config/commonConfig.js";
import {DiscordManager} from "../DiscordManager.js";

export async function getGlobalIndex(this: DiscordManager): Promise<GlobalIndex> {
    if(!this.master)
        throw new Error("Master not initialized");

    let guild = this.master.client.guilds.cache.get(this.guildId);

    if(!guild)
        throw new Error("Guild not found");

    const indexChannel = guild.rulesChannel || guild.systemChannel;

    if(!indexChannel)
        throw new Error("Index channel could not be found.");

    if(!indexChannel.topic)
        throw new Error("Index message could not be found.");

    const indexMessage = await indexChannel.messages.fetch(indexChannel.topic)

    const dataChannels = indexMessage.content.match(regexConfig.index.data)?.map(x => {
        const match = x.match(regexConfig.index.dataGroups);

        if(!match)
            throw new Error("Index message could not be parsed.");

        return {
            id: parseInt(match[1]),
            channelId: match[2],
            guildId: this.guildId,
        };
    }) ?? [];

    return {
        indexMessage: indexMessage,
        dataChannels: dataChannels,
        guildId: this.guildId,
    }
}
