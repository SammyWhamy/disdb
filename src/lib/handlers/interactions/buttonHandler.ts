import {DiscordManager} from "../../DiscordManager.js";
import {ButtonInteraction} from "discord.js";
import {DeleteModal, ExistsModal, GetModal, SetModal} from "../../resources/components/modals.js";

export async function buttonHandler(this: DiscordManager, interaction: ButtonInteraction) {
    switch(interaction.customId) {
        case "get":
            await interaction.showModal(GetModal);
            break;

        case "set":
            await interaction.showModal(SetModal);
            break;

        case "delete":
            await interaction.showModal(DeleteModal);
            break;

        case "exists":
            await interaction.showModal(ExistsModal);
            break;
    }
}
