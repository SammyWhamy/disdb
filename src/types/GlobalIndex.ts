import {DataChannel} from "./DataChannel.js";

export interface GlobalIndex {
    rawIndex: string,
    dataChannels: DataChannel[],
    guildId: string,
}
