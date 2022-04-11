import {ActionRowData, BaseComponentData, ButtonComponentData, ButtonStyle, ComponentType} from "discord.js";

export const ControlPanelButtons: ActionRowData<ButtonComponentData> & Required<BaseComponentData> = {
    type: ComponentType.ActionRow,
    components: [{
        customId: "get",
        label: "Get",
        style: ButtonStyle.Primary,
    }, {
        customId: "set",
        label: "Set",
        style: ButtonStyle.Success,
    }, {
        customId: "delete",
        label: "Delete",
        style: ButtonStyle.Danger,
    }, {
        customId: "exists",
        label: "Exists",
        style: ButtonStyle.Secondary,
    }],
};
