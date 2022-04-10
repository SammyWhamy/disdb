import {GlobalIndex} from "../../types/GlobalIndex.js";
import {regexConfig} from "../../config/commonConfig.js";
import {DiscordManager} from "../DiscordManager.js";
import {DataEvent} from "../../types/DataEvent.js";

export async function getGlobalIndex(this: DiscordManager): Promise<GlobalIndex> {
    if(!this.master)
        throw new Error("Master not initialized");

    let guild = this.master.client.guilds.cache.get(this.guildId);

    if(!guild)
        throw new Error("Guild not found");

    if(!guild.rulesChannel)
        throw new Error("Index channel could not be found.");

    if(!guild.rulesChannel.topic)
        throw new Error("Index message could not be found.");

    const indexMessage = await guild.rulesChannel.messages.fetch(guild.rulesChannel.topic)

    const dataChannels = indexMessage.content.match(regexConfig.index.data)?.map(x => {
        const match = x.match(regexConfig.index.dataGroups);

        if(!match)
            throw new Error("Index message could not be parsed.");

        return {
            id: parseInt(match[1]),
            channelId: match[2],
            guildId: this.guildId,
        };
    }) ?? [];

    const events: DataEvent[] = [];
    const guildEvents = await guild.scheduledEvents.fetch();

    for(const [_, event] of guildEvents) {
        if(event.image) {
            events.push({
                id: event.id,
                name: event.name,
                ttl: event.scheduledStartAt,
                dataHash: event.image
            });
        }
    }

    return {
        indexMessage: indexMessage,
        dataChannels: dataChannels,
        guildId: this.guildId,
        events: events,
    };
}
