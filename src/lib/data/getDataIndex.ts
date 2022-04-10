import {Client, TextChannel} from "discord.js";
import {DataIndex} from "../../types/DataIndex.js";
import {DataChannel} from "../../types/DataChannel.js";

export async function getDataIndex(client: Client, dataChannel: DataChannel): Promise<DataIndex> {
    let guild = client.guilds.cache.get(dataChannel.guildId);

    if(!guild)
        throw new Error("Guild not found");

    const discordDataChannel = await guild.channels.fetch(dataChannel.channelId) as TextChannel;
    if(!discordDataChannel)
        throw new Error("Data channel could not be found.");

    const indexMessage = await discordDataChannel.messages.fetch(discordDataChannel.topic!);
    const index = indexMessage.content;

    return {
        index: index,
        full: discordDataChannel.nsfw,
        channel: discordDataChannel,
        indexMessage: indexMessage,
    };
}
