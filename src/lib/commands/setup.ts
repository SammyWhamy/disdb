import {Message} from "discord.js";
import {createDataChannel} from "../data/createDataChannel.js";

export async function setup(message: Message) {
    if(!message.guild) return;

    const channels = message.guild.channels.cache;
    for(const channel of channels.values()) {
        await channel.delete();
    }

    await message.guild.channels.create("setup", {
        type: "GUILD_TEXT",
        position: 0,
    });

    const dataCategory = await message.guild.channels.create("data", {
        type: "GUILD_CATEGORY",
        position: 1,
    });

    const indexChannel = await message.guild.channels.create("index", {
        type: "GUILD_TEXT",
        position: 0,
        parent: dataCategory.id,
    });

    await message.guild.setRulesChannel(indexChannel);

    const indexMsg = await indexChannel.send(`**INDEX**\n\nc:${dataCategory.id}`);
    await indexChannel.setTopic(indexMsg.id);

    await createDataChannel(message.guild);
}
