import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {regexConfig} from "../../../config/commonConfig.js";
import {DiscordManager} from "../../DiscordManager.js";

export async function get(this: DiscordManager, key: string): Promise<string | null> {
    if(!this.master)
        throw new Error("Master not initialized");

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const slave = this.getRandomSlave().client;
    const globalIndex = await getGlobalIndex(slave, this.guildId);

    for(const dataChannel of globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(slave, dataChannel);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1])
            return (await dataIndex.channel.messages.fetch(match[1])).content;
    }

    return null;
}
