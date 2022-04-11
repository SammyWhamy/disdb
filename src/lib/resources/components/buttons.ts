import {ActionRowData, BaseComponentData, ButtonComponentData, ButtonStyle, ComponentType} from "discord.js";

export const ControlPanelButtons: ActionRowData<ButtonComponentData> & Required<BaseComponentData> = {
    type: ComponentType.ActionRow,
    components: [{
        customId: "get",
        label: "Get",
        style: ButtonStyle.Primary,
        type: ComponentType.Button,
    }, {
        customId: "set",
        label: "Set",
        style: ButtonStyle.Success,
        type: ComponentType.Button,
    }, {
        customId: "delete",
        label: "Delete",
        style: ButtonStyle.Danger,
        type: ComponentType.Button,
    }, {
        customId: "exists",
        label: "Exists",
        style: ButtonStyle.Secondary,
        type: ComponentType.Button,
    }],
};
