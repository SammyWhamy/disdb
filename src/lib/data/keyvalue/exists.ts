import {Client} from "discord.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {regexConfig} from "../../../config/commonConfig.js";

export async function exists(slave: Client, guildId: string, key: string): Promise<boolean> {
    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const globalIndex = await getGlobalIndex(slave, guildId);

    let indexNum = 0;

    for(let i = 0; i < globalIndex.dataChannels; i++) {
        const dataIndex = await getDataIndex(slave, guildId, indexNum, globalIndex.index);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1])
            return true;
    }

    return false;
}
