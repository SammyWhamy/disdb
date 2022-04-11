import {createDataChannel} from "../data/createDataChannel.js";
import {DiscordManager} from "../DiscordManager.js";
import {ChannelType} from "discord.js";
import {ControlPanelButtons} from "../resources/components/buttons.js";
import {ControlPanelEmbed} from "../resources/components/embeds.js";

export async function runServerSetup(this: DiscordManager) {
    const guild = this.master?.client.guilds.cache.get(this.guildId);

    if(!guild)
        throw new Error("No guild was found");

    const channels = guild.channels.cache;
    for(const channel of channels.values()) {
        await channel.delete();
    }

    await guild.channels.create("setup", {
        type: ChannelType.GuildText,
        position: 0,
    });

    const controlChannel = await guild.channels.create("control", {
        type: ChannelType.GuildText,
        position: 1,
    });

    const dataCategory = await guild.channels.create("data", {
        type: ChannelType.GuildCategory,
        position: 2,
    });

    const indexChannel = await guild.channels.create("index", {
        type: ChannelType.GuildText,
        position: 0,
        parent: dataCategory.id,
    });

    await guild.setRulesChannel(indexChannel);
    await guild.setSystemChannel(indexChannel);

    const indexMsg = await indexChannel.send(`**INDEX**\n\nc:${dataCategory.id}`);
    await indexChannel.setTopic(indexMsg.id);

    await controlChannel.send({
        embeds: [ControlPanelEmbed],
        components: [ControlPanelButtons],
    });

    await controlChannel.permissionOverwrites.create(guild.id, {
        SendMessages: false,
        AddReactions: false,
        CreatePublicThreads: false,
        CreatePrivateThreads: false,
    });

    await createDataChannel(guild);

    await guild.channels.fetch();
}
