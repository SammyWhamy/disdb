import {Client, TextChannel} from "discord.js";
import {getGlobalIndex} from "../getGlobalIndex.js";
import {getDataIndex} from "../getDataIndex.js";
import {regexConfig} from "../../../config/commonConfig.js";

export async function get(slave: Client, guildId: string, key: string): Promise<string> {
    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const globalIndex = await getGlobalIndex(slave, guildId);

    let indexNum = 0;
    let messageId: string | undefined;
    let channel: TextChannel | undefined;
    while(!messageId) {
        const dataIndex = await getDataIndex(slave, guildId, indexNum, globalIndex.index);
        const match = dataIndex.index.match(new RegExp(`${key}:(\\d{18,19})`, 'm'));
        if(match && match[1]) {
            messageId = match[1];
            channel = dataIndex.channel;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return (await channel!.messages.fetch(messageId)).content;
}
