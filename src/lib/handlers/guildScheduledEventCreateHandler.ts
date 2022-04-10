import {DiscordManager} from "../DiscordManager.js";
import {GuildScheduledEvent} from "discord.js";

export async function guildScheduledEventCreateHandler(this: DiscordManager, event: GuildScheduledEvent) {
    if(!this.globalIndex || !event.image)
        return;

    this.globalIndex.events.push({
        id: event.id,
        name: event.name,
        ttl: event.scheduledStartAt,
        dataHash: event.image
    });
}
