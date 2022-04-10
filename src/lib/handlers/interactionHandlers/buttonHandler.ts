import {DiscordManager} from "../../DiscordManager.js";
import {
    ActionRowBuilder,
    ButtonInteraction,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";

const ModalKeyInput = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(
        new TextInputBuilder()
            .setCustomId("key")
            .setLabel("Enter the key here:")
            .setStyle(TextInputStyle.Short)
    );

const ModalValueInput = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(
        new TextInputBuilder()
            .setCustomId("value")
            .setLabel("Enter the value here:")
            .setStyle(TextInputStyle.Paragraph)
    );

export async function buttonHandler(this: DiscordManager, interaction: ButtonInteraction) {
    switch(interaction.customId) {
        case "get": {
            const modal = new ModalBuilder()
                .setTitle("Get a value from the database")
                .setCustomId("get");

            modal.addComponents(ModalKeyInput);

            await interaction.showModal(modal);

            break;
        }

        case "set": {
            const modal = new ModalBuilder()
                .setTitle("Set a value in the database")
                .setCustomId("set");

            modal.addComponents(ModalKeyInput, ModalValueInput);

            await interaction.showModal(modal);

            break;
        }

        case "delete": {
            const modal = new ModalBuilder()
                .setTitle("Delete a value from the database")
                .setCustomId("delete");

            modal.addComponents(ModalKeyInput);

            await interaction.showModal(modal);

            break;
        }
    }
}
