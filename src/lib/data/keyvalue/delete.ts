import {regexConfig} from "../../../config/commonConfig.js";
import {getDataIndex} from "../getDataIndex.js";
import {DiscordManager} from "../../DiscordManager.js";

export async function del(this: DiscordManager, key: string) {
    if(!this.master)
        throw new Error("Master not initialized");

    if(!this.globalIndex)
        throw new Error("Global index not initialized");

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const event = this.globalIndex.events.find(e => e.name === key);
    if(event) {
        const slave = this.getRandomSlave();
        const guild = slave.client.guilds.cache.get(this.guildId)!;
        await guild.scheduledEvents.delete(event.id);
        return;
    } else {
        for(const dataChannel of this.globalIndex.dataChannels) {
            const dataIndex = await getDataIndex(this.getRandomSlave().client, dataChannel);
            const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
            if(match && match[1]) {
                await dataIndex.channel.messages.delete(match[1])
                const masterDataIndex = await getDataIndex(this.master.client, dataChannel);
                await masterDataIndex.channel.messages.edit(masterDataIndex.indexMessage, {
                    content: masterDataIndex.index.replace(new RegExp(`${key}:(\\d{18,19})`, 'm'), '')
                });

                if(dataIndex.channel.nsfw && dataIndex.index.length + key.length + 20 < 2000) {
                    await dataIndex.channel.setNSFW(false);
                    dataIndex.full = false;
                }

                return;
            }
        }
    }

    throw new Error('Key not found');
}
