import {Client, TextChannel} from "discord.js";
import {DataIndex} from "../../types/dataIndex.js";

export async function getDataIndex(client: Client, guildId: string, dataIndex: number, globalIndex: string): Promise<DataIndex> {
    let guild = client.guilds.cache.get(guildId);

    if(!guild)
        throw new Error("Guild not found");

    const dataChannelIndex = globalIndex.match(new RegExp(`d_${dataIndex}:(\\d{18,19})`));
    if(!dataChannelIndex || !dataChannelIndex[1])
        throw new Error("Data channel could not be found.");

    const dataChannel = guild.channels.cache.get(dataChannelIndex[1]) as TextChannel;
    if(!dataChannel)
        throw new Error("Data channel could not be found.");

    const indexMessage = await dataChannel.messages.fetch(dataChannel.topic!);
    const index = indexMessage.content;

    return {
        index: index,
        full: dataChannel.nsfw,
        channel: dataChannel,
        indexMessage: indexMessage,
    };
}
