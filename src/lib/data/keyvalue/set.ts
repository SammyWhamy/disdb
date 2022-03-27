import {TextChannel} from "discord.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {DataIndex} from "../../../types/DataIndex.js";
import {createDataChannel} from "../createDataChannel.js";
import {regexConfig} from "../../../config/commonConfig.js";
import {DiscordManager} from "../../DiscordManager.js";

export async function set(this: DiscordManager, key: string, value: string) {
    if(!this.master)
        throw new Error("Master not initialized");

    if(value.length > 1899)
        throw new Error('Value is too large to store in key value store (max 1899)');

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const slave = this.getRandomSlave().client;
    const globalIndex = await getGlobalIndex(slave, this.guildId);

    let availableIndex: DataIndex | undefined;
    for(const dataChannel of globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(this.master.client, dataChannel);

        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1]) {
            const slaveId = (await dataIndex.indexMessage.channel.messages.fetch(match[1])).author.id;
            const editSlave = this.getSlaveById(slaveId)?.client;
            if(editSlave) {
                await (editSlave.guilds.cache.get(this.guildId)!.channels.cache.get(dataChannel.channelId) as TextChannel).messages.edit(match[1], {content: value});
            } else {
                await this.del(key);
            }
            return;
        }

        if(dataIndex.index.length + key.length + 20 > 2000) {
            await dataIndex.channel.setNSFW(true);
            dataIndex.full = true;
        }

        if(!dataIndex.full)
            availableIndex = dataIndex;
    }

    if(!availableIndex)
        availableIndex = await createDataChannel(this.master.client.guilds.cache.get(this.guildId)!);

    if(!availableIndex)
        throw new Error('Failed to get an available data channel');

    const dataMessage = await (slave.guilds.cache.get(this.guildId)!.channels.cache.get(availableIndex.channel.id) as TextChannel).send(value);
    await availableIndex.indexMessage.edit(`${availableIndex.index}\n${key}:${dataMessage.id}`);
}
