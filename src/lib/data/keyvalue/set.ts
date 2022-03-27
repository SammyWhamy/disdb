import {Client, TextChannel} from "discord.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {DataIndex} from "../../../types/dataIndex.js";
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

    let indexNum = 0;
    let dataIndex: DataIndex | undefined;
    while(!dataIndex || dataIndex.full) {
        try {
            dataIndex = await getDataIndex(master, guildId, indexNum, globalIndex.index);
        } catch (e: any) {
            if(e.message === "Data channel could not be found.") {
                let newDataIndex = await createDataChannel(master.guilds.cache.get(guildId)!);
                if(!newDataIndex)
                    throw new Error('Could not create a new data channel');
                dataIndex = newDataIndex;
            }
        }

        if(!dataIndex)
            throw new Error('Could not get data index');

        if(dataIndex.index.length + key.length + 20 > 2000) {
            await dataIndex.channel.setNSFW(true);
            dataIndex.full = true;
        }

        indexNum++;
    }

    const dataMessage = await (slave.guilds.cache.get(guildId)!.channels.cache.get(dataIndex.channel.id) as TextChannel).send(value);
    await dataIndex.indexMessage.edit(`${dataIndex.index}\n${key}:${dataMessage.id}`);
}
