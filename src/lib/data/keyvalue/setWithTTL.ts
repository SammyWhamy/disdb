import {regexConfig} from "../../../config/commonConfig.js";
import {DiscordManager} from "../../DiscordManager.js";
import {GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel} from "discord.js";

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

    const hexString = Buffer.from(value).toString('hex');

    const jpeg =
        "FFD8FFDB004300FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC0000B080001000101011100FFC40014000100000000000000000000000000000003FFC40014100100000000000000000000000000000000FFDA0008010100003F0037FFFE"
        + hexString
        + "FFD9";

    await guild.scheduledEvents.create({
        name: key,
        scheduledStartTime: ttl,
        scheduledEndTime: new Date(ttl.getTime() + 10000),
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: GuildScheduledEventEntityType.External,
        image: `data:image/jpeg;base64,${Buffer.from(jpeg, 'hex').toString('base64')}`,
        entityMetadata: {
            location: ".",
        },
    });
}
