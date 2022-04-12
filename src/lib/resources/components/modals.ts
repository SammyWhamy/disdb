import {ComponentType, ModalData} from "discord.js";
import {ModalKeyInput, ModalTTLInput, ModalValueInput} from "./inputs.js";

export const GetModal: ModalData = {
    title: "Get a value from the database",
    customId: "get",
    components: [{
        type: ComponentType.ActionRow,
        components: [
            ModalKeyInput
        ]
    }]
};

export const SetModal: ModalData = {
    title: "Set a value in the database",
    customId: "set",
    components: [{
        type: ComponentType.ActionRow,
        components: [
            ModalKeyInput,
        ]
    }, {
        type: ComponentType.ActionRow,
        components: [
            ModalValueInput,
        ]
    }, {
        type: ComponentType.ActionRow,
        components: [
            ModalTTLInput,
        ]
    }]
};

export const SetJSONModal: ModalData = {
    ...SetModal,
    title: "Set a JSON value in the database",
    customId: "setjson",
}

export const DeleteModal: ModalData = {
    title: "Delete a value from the database",
    customId: "delete",
    components: [{
        type: ComponentType.ActionRow,
        components: [
            ModalKeyInput
        ]
    }]
};

export const ExistsModal: ModalData = {
    title: "Check if a value exists in the database",
    customId: "exists",
    components: [{
        type: ComponentType.ActionRow,
        components: [
            ModalKeyInput
        ]
    }]
};
