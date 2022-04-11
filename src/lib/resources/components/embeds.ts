import {APIEmbed} from "discord-api-types/v10";

export const ControlPanelEmbed: APIEmbed = {
    color: 10715903,
    title: "Simple control panel for the database",
    description: "Use the buttons below to do simple CRUD operations on the database.\nThis should only be used for testing or development purposes.",
    footer: {
        text: "• Powered by DisDB",
    },
};
