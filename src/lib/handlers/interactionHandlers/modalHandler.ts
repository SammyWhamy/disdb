import {DiscordManager} from "../../DiscordManager.js";
import {EmbedBuilder, ModalSubmitInteraction} from "discord.js";

export async function modalHandler(this: DiscordManager, modal: ModalSubmitInteraction) {
    switch(modal.customId) {
        case "get": {
            const key = modal.fields.getTextInputValue("key")
            const value = await this.get(key);

            const replyEmbed = new EmbedBuilder()
                .setTitle(`Result for key: ${key}`)
                .setDescription(value ?? "Value not found in database.")
                .setColor(8560895);

            await modal.reply({embeds: [replyEmbed], ephemeral: true});

            break;
        }

        case "set": {
            const key = modal.fields.getTextInputValue("key");
            const value = modal.fields.getTextInputValue("value");

            await this.set(key, value);

            const replyEmbed = new EmbedBuilder()
                .setTitle(`Set key: ${key}`)
                .setDescription(`Value: ${value}`)
                .setColor(8560895);

            await modal.reply({embeds: [replyEmbed], ephemeral: true});

            break;
        }

        case "delete": {
            const key = modal.fields.getTextInputValue("key");

            try {
                await this.del(key);

                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Deleted key: ${key}`)
                    .setColor(8560895);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            } catch(e: any) {
                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Error deleting key: ${key}`)
                    .setDescription(e.message)
                    .setColor(8560895);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            }

            break;
        }
    }
}
