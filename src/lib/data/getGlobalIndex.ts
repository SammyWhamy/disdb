import {Client} from "discord.js";
import {GlobalIndex} from "../../types/globalIndex.js";
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

    return {
        index: index,
        dataChannels: index.match(regexConfig.index.data)?.length ?? 0,
    }
}
