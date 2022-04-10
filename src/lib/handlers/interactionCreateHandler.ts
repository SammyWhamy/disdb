import {Interaction} from "discord.js";
import {DiscordManager} from "../DiscordManager.js";
import {buttonHandler} from "./interactionHandlers/buttonHandler.js";
import {modalHandler} from "./interactionHandlers/modalHandler.js";

export async function interactionCreateHandler(this: DiscordManager, interaction: Interaction) {
    if(interaction.isButton())
        await buttonHandler.call(this, interaction);

    if(interaction.isModalSubmit())
        await modalHandler.call(this, interaction);
}
