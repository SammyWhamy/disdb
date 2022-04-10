import {getDataIndex} from "../getDataIndex.js";
import {regexConfig} from "../../../config/commonConfig.js";
import {DiscordManager} from "../../DiscordManager.js";
import {getImageFromEvent} from "../getImageFromEvent.js";
import {getDataFromJPEG} from "../getDataFromJPEG.js";

export async function get(this: DiscordManager, key: string): Promise<string | null> {
    if(!this.master)
        throw new Error("Master not initialized");

    if(!this.globalIndex)
        throw new Error("Global index not initialized");

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const slave = this.getRandomSlave().client;

    const event = this.globalIndex.events.find(e => e.name === key);
    if(event) {
        const image = await getImageFromEvent(event);

        if(!image)
            throw new Error("Key was found but data was not found");

        return await getDataFromJPEG(image);
    } else {
        for(const dataChannel of this.globalIndex.dataChannels) {
            const dataIndex = await getDataIndex(slave, dataChannel);
            const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
            if(match && match[1])
                return (await dataIndex.channel.messages.fetch(match[1])).content;
        }
    }

    return null;
}
