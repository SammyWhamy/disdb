import {DataChannel} from "./DataChannel.js";
import {Message} from "discord.js";

export interface GlobalIndex {
    indexMessage: Message,
    dataChannels: DataChannel[],
    guildId: string,
}
