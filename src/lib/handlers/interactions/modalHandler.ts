import {DiscordManager} from "../../DiscordManager.js";
import {EmbedBuilder, ModalSubmitInteraction} from "discord.js";

export async function modalHandler(this: DiscordManager, modal: ModalSubmitInteraction) {
    switch(modal.customId) {
        case "get": {
            const key = modal.fields.getTextInputValue("key")

            try {
                const value = await this.get(key);

                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Result for key: ${key}`)
                    .setDescription(value ? JSON.parse(value) : "Value not found in database.")
                    .setColor(8560895);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            } catch(e: any) {
                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Error getting key: ${key}`)
                    .setDescription(e.message)
                    .setColor(16711680);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            }

            break;
        }

        case "set":
        case "setjson":{
            const key = modal.fields.getTextInputValue("key");
            let value = modal.fields.getTextInputValue("value");
            const ttl = parseInt(modal.fields.getTextInputValue("ttl")) || undefined;

            if(modal.customId !== "setjson")
                value = JSON.stringify(value);

            try {
                if(ttl) {
                    await this.setWithTTL(key, value, new Date(Date.now() + ttl * 1000));
                } else {
                    await this.set(key, value);
                }

                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Set key: ${key}`)
                    .setDescription(`Value: ${value}`)
                    .setColor(8560895);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            } catch(e: any) {
                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Error setting key: ${key}`)
                    .setDescription(e.message)
                    .setColor(16711680);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            }

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

        case "exists": {
            const key = modal.fields.getTextInputValue("key");

            try {
                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Key: ${key}`)
                    .setDescription(await this.exists(key) ? "Key exists" : "Key does not exist")
                    .setColor(8560895);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            } catch(e: any) {
                const replyEmbed = new EmbedBuilder()
                    .setTitle(`Error checking key: ${key}`)
                    .setDescription(e.message)
                    .setColor(16711680);

                await modal.reply({embeds: [replyEmbed], ephemeral: true});
            }

            break;
        }
    }
}
