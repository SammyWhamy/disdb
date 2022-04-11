import {ModalData} from "discord.js";
import {ModalKeyInput, ModalTTLInput, ModalValueInput} from "./inputs.js";

export const GetModal: ModalData = {
    title: "Get a value from the database",
    customId: "get",
    components: [{
        components: [
            ModalKeyInput
        ]
    }]
};

export const SetModal: ModalData = {
    title: "Set a value in the database",
    customId: "set",
    components: [{
        components: [
            ModalKeyInput,
            ModalValueInput,
            ModalTTLInput,
        ]
    }]
};

export const DeleteModal: ModalData = {
    title: "Delete a value from the database",
    customId: "delete",
    components: [{
        components: [
            ModalKeyInput
        ]
    }]
};

export const ExistsModal: ModalData = {
    title: "Check if a value exists in the database",
    customId: "exists",
    components: [{
        components: [
            ModalKeyInput
        ]
    }]
};
