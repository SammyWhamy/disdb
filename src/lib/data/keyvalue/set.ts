import {Client, TextChannel} from "discord.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {DataIndex} from "../../../types/DataIndex.js";
import {createDataChannel} from "../createDataChannel.js";
import {regexConfig} from "../../../config/commonConfig.js";
import {exists} from "./exists.js";

export async function set(master: Client, slave: Client, guildId: string, key: string, value: string) {
    if(value.length > 1899)
        throw new Error('Value is too large to store in key value store (max 1899)');

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    if(await exists(slave, guildId, key))
        throw new Error('Key already exists');

    const globalIndex = await getGlobalIndex(slave, guildId);

    let availableIndex: DataIndex | undefined;
    for(const dataChannel of globalIndex.dataChannels) {
        const dataIndex = await getDataIndex(master, dataChannel);

        if(dataIndex.index.length + key.length + 20 > 2000) {
            await dataIndex.channel.setNSFW(true);
            dataIndex.full = true;
        }

        if(!dataIndex.full)
            availableIndex = dataIndex;
    }

    if(!availableIndex)
        availableIndex = await createDataChannel(master.guilds.cache.get(guildId)!);

    if(!availableIndex)
        throw new Error('Failed to get an available data channel');

    const dataMessage = await (slave.guilds.cache.get(guildId)!.channels.cache.get(availableIndex.channel.id) as TextChannel).send(value);
    await availableIndex.indexMessage.edit(`${availableIndex.index}\n${key}:${dataMessage.id}`);
}
