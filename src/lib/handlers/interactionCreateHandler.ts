import {Interaction} from "discord.js";
import {DiscordManager} from "../DiscordManager.js";
import {buttonHandler} from "./interactions/buttonHandler.js";
import {modalHandler} from "./interactions/modalHandler.js";

export async function interactionCreateHandler(this: DiscordManager, interaction: Interaction) {
    if(interaction.isButton())
        await buttonHandler.call(this, interaction);

    if(interaction.isModalSubmit())
        await modalHandler.call(this, interaction);
}
