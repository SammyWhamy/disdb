import {regexConfig} from "../../../config/commonConfig.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {Client} from "discord.js";
import {getDataIndex} from "../getDataIndex.js";

export async function del(master: Client, slave: Client, guildId: string, key: string) {
    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const globalIndex = await getGlobalIndex(slave, guildId);

    for(const dataChannel of globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(slave, dataChannel);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1]) {
            await dataIndex.channel.messages.delete(match[1])
            const masterDataIndex = await getDataIndex(master, dataChannel);
            await masterDataIndex.channel.messages.edit(masterDataIndex.indexMessage, {
                content: masterDataIndex.index.replace(new RegExp(`${key}:(\\d{18,19})`, 'm'), '')
            });
            return;
        }
    }

    throw new Error('Key not found');
}
