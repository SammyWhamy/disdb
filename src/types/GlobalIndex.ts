import {DataChannel} from "./DataChannel.js";
import {Message} from "discord.js";
import {DataEvent} from "./DataEvent.js";

export interface GlobalIndex {
    indexMessage: Message,
    dataChannels: DataChannel[],
    guildId: string,
    events:  DataEvent[],
}
