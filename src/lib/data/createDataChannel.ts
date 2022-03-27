import {Guild} from "discord.js";
import {regexConfig} from "../../config/commonConfig.js";
import {DataIndex} from "../../types/dataIndex.js";

export async function createDataChannel(guild: Guild): Promise<DataIndex | undefined> {
    if(!guild.rulesChannel) {
        console.error(`Index channel could not be found.`);
        return;
    }

    if(!guild.rulesChannel.topic) {
        console.error(`Index message could not be found.`);
        return;
    }

    const indexMessage = await guild.rulesChannel.messages.fetch(guild.rulesChannel.topic).catch(() => null);
    if(!indexMessage) {
        console.error(`Index message could not be fetched.`);
        return;
    }

    const index = indexMessage.content;
    const dataChannels = index.match(regexConfig.index.data);
    const dataCategory = index.match(regexConfig.index.category);
    if(!dataCategory) {
        console.error(`Data category could not be found.`);
        return;
    }

    const dataChannelName = `d_${dataChannels ? dataChannels.length : 0}`
    const dataChannel = await guild.channels.create(dataChannelName, {
        type: "GUILD_TEXT",
        position: 1,
        parent: dataCategory.toString().slice(2),
    });

    await indexMessage.edit(`${indexMessage.content}\n${dataChannelName}:${dataChannel.id}`);

    const dataIndexMessage = await dataChannel.send("**INDEX**");
    await dataChannel.setTopic(dataIndexMessage.id);

    return {
        full: false,
        index: dataIndexMessage.content,
        indexMessage: dataIndexMessage,
        channel: dataChannel,
    }
}
