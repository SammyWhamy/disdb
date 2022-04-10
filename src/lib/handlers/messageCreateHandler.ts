import {DiscordManager} from "../DiscordManager.js";
import {Message, PartialMessage} from "discord.js";

export async function messageCreateHandler(this: DiscordManager, message: Message | PartialMessage) {
    if(!this.master || !this.slaves || !this.globalIndex || !message.author)
        return;

    const allowedIds = [this.master.client.user?.id, ...this.slaves.map(s => s.client.user?.id)];

    const protectedChannels = [this.globalIndex.indexMessage.channelId, ...this.globalIndex.dataChannels.map(c => c.channelId)];

    if(!allowedIds.includes(message.author.id) && protectedChannels.includes(message.channelId))
        await message.delete();
}
