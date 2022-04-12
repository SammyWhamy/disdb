import {regexConfig} from "../../../config/commonConfig.js";
import {DiscordManager} from "../../DiscordManager.js";
import {GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel} from "discord.js";
import {encode as JPEGEncode} from "../JPEG.js";

export async function setWithTTL(this: DiscordManager, key: string, value: any, ttl: Date): Promise<void> {
    if(!this.master)
        throw new Error("Master not initialized");

    if(!this.globalIndex)
        throw new Error("Global index not initialized");

    if(!regexConfig.key.test(key))
        throw new Error('Key must match a-zA-Z0-9_-');

    const slave = this.getRandomSlave().client;

    const exists = await this.exists(key);
    if(exists)
        await this.del(key);

    const guild = slave.guilds.cache.get(this.guildId)!;

    await guild.scheduledEvents.create({
        name: key,
        scheduledStartTime: ttl,
        scheduledEndTime: new Date(ttl.getTime() + 1),
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: GuildScheduledEventEntityType.External,
        image: JPEGEncode(value),
        entityMetadata: {
            location: ".",
        },
    });
}
