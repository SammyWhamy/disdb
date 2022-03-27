import {Message, TextChannel} from "discord.js";

export interface DataIndex {
    index: string,
    full: boolean,
    channel: TextChannel,
    indexMessage: Message,
}
