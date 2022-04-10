import {getDataIndex} from "../getDataIndex.js";
import {regexConfig} from "../../../config/commonConfig.js";
import {DiscordManager} from "../../DiscordManager.js";

export async function exists(this: DiscordManager, key: string): Promise<boolean> {
    if(!this.master)
        throw new Error("Master not initialized");

    if(!this.globalIndex)
        throw new Error("Global index not initialized");

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    if(this.globalIndex.events.find(e => e.name === key))
        return true;

    const slave = this.getRandomSlave().client;

    for(const dataChannel of this.globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(slave, dataChannel);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1])
            return true;
    }

    return false;
}
