import {createDataChannel} from "../data/createDataChannel.js";
import {DiscordManager} from "../DiscordManager.js";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    EmbedBuilder,
    MessageActionRowComponentBuilder
} from "discord.js";

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

    const controlEmbed = new EmbedBuilder()
        .setColor(10715903)
        .setTitle("Simple control panel for the database")
        .setDescription("Use the buttons below to do simple CRUD operations on the database.\nThis should only be used for testing or development purposes.")
        .setFooter({text: "• Powered by DisDB"});

    const controlComponents = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Get")
                .setCustomId("get")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setLabel("Set")
                .setCustomId("set")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setLabel("Delete")
                .setCustomId("delete")
                .setStyle(ButtonStyle.Danger),
        );

    await controlChannel.send({embeds: [controlEmbed], components: [controlComponents]});

    await createDataChannel(guild);

    await guild.channels.fetch();
}
