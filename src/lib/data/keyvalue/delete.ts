import {regexConfig} from "../../../config/commonConfig.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {DiscordManager} from "../../DiscordManager.js";

export async function del(this: DiscordManager, key: string) {
    if(!this.master)
        throw new Error("Master not initialized");

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const slave = this.getRandomSlave().client;
    const globalIndex = await getGlobalIndex(slave, this.guildId);

    for(const dataChannel of globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(slave, dataChannel);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1]) {
            await dataIndex.channel.messages.delete(match[1])
            const masterDataIndex = await getDataIndex(this.master.client, dataChannel);
            await masterDataIndex.channel.messages.edit(masterDataIndex.indexMessage, {
                content: masterDataIndex.index.replace(new RegExp(`${key}:(\\d{18,19})`, 'm'), '')
            });
            return;
        }
    }

    throw new Error('Key not found');
}
