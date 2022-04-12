import {DiscordManager} from "../DiscordManager.js";
import {GuildScheduledEvent, GuildScheduledEventStatus} from "discord.js";

export async function guildScheduledEventUpdateHandler(this: DiscordManager, event: GuildScheduledEvent) {
    if(!this.globalIndex)
        return;

    if(event.status === GuildScheduledEventStatus.Active)
        this.globalIndex.events = this.globalIndex.events.filter(event => event.id !== event.id);
}
