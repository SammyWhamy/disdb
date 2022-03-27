import {Client} from "discord.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {regexConfig} from "../../../config/commonConfig.js";

export async function get(slave: Client, guildId: string, key: string): Promise<string | null> {
    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const globalIndex = await getGlobalIndex(slave, guildId);

    for(const dataChannel of globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(slave, dataChannel);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1])
            return (await dataIndex.channel.messages.fetch(match[1])).content;
    }

    return null;
}
