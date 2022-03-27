import {Client} from "discord.js";
import {GlobalIndex} from "../../types/GlobalIndex.js";
import {regexConfig} from "../../config/commonConfig.js";

export async function getGlobalIndex(client: Client, guildId: string): Promise<GlobalIndex> {
    let guild = client.guilds.cache.get(guildId);

    if(!guild)
        throw new Error("Guild not found");

    const indexChannel = guild.rulesChannel || guild.systemChannel;

    if(!indexChannel)
        throw new Error("Index channel could not be found.");

    if(!indexChannel.topic)
        throw new Error("Index message could not be found.");

    const index = (await indexChannel.messages.fetch(indexChannel.topic)).content;

    const dataChannels = index.match(regexConfig.index.data)?.map(x => {
        const match = x.match(regexConfig.index.dataGroups);

        if(!match)
            throw new Error("Index message could not be parsed.");

        return {
            id: parseInt(match[0]),
            channelId: match[1],
            guildId: guildId,
        };
    }) ?? [];

    return {
        rawIndex: index,
        dataChannels: dataChannels,
        guildId: guildId,
    }
}
