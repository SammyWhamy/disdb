import {ComponentType, ModalActionRowComponentData, TextInputStyle} from "discord.js";

export const ModalKeyInput: ModalActionRowComponentData = {
    type: ComponentType.TextInput,
    customId: "key",
    label: "Enter the key here:",
    style: TextInputStyle.Short,
    required: true,
    maxLength: 100,
};

export const ModalValueInput: ModalActionRowComponentData = {
    type: ComponentType.TextInput,
    customId: "value",
    label: "Enter the value here:",
    style: TextInputStyle.Paragraph,
    required: true,
};

export const ModalTTLInput: ModalActionRowComponentData = {
    type: ComponentType.TextInput,
    customId: "ttl",
    label: "Enter the TTL here:",
    style: TextInputStyle.Short,
    required: false,
    maxLength: 100,
};
