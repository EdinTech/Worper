import { PatchingSetting } from "../../../util/interface/common";

export const validate = (setting: PatchingSetting) => {

    const result = {
        messages: [] as string[],
        isValid: true
    }
    if (!validateDefaultApplicant(setting)) {
        result.messages.push("Invalid default applicant. a default applicant required string. min: 1, max: 20");
        result.isValid = false;
    }
    if (!validateDefaultChecker(setting)) {
        result.messages.push("Invalid default checker. a default checker required string. min: 1, max: 20");
        result.isValid = false;
    }
    if (!validateMembers(setting)) {
        result.messages.push("Invalid members. a members required array. min: 1, max: 20");
        result.isValid = false;
    }
    if (!validateAction(setting)) {
        result.messages.push("Invalid action. a action required array");
        result.isValid = false;
    }
    if (!validateActionAutoSaving(setting)) {
        result.messages.push("Invalid action auto saving. a action auto saving required \"on\" or \"off\"");
        result.isValid = false;
    }
    if (!validateTableName(setting)) {
        result.messages.push("Invalid table name. a table name required object. [key: string]: string");
        result.isValid = false;
    }
    return result;
}

const validateDefaultApplicant = (setting: PatchingSetting) => {

    const minLength = 1;
    const maxLength = 20;

    if (!('default_applicant' in setting)) {
        return false;
    }

    if (typeof setting.default_applicant !== 'string') {
        return false;
    }

    if (setting.default_applicant.length < minLength || setting.default_applicant.length > maxLength ) {
        return false;
    }
    return true;
}

const validateDefaultChecker = (setting: PatchingSetting) => {

    const minLength = 1;
    const maxLength = 20;
    if (!('default_checker' in setting)) {
        return false;
    }
    if (typeof setting.default_checker !== 'string') {
        return false;
    }
    if (setting.default_checker.length < minLength || setting.default_checker.length > maxLength ) {
        return false;
    }
    return true;
}

const validateMembers = (setting: PatchingSetting) => {

    const minLength = 1;
    const maxLength = 20;
    if (!('members' in setting)) {
        return false;
    }
    if (!Array.isArray(setting.members)) {
        return false;
    }
    if (setting.members.length < minLength || setting.members.length > maxLength ) {
        return false;
    }
    return true;
}

const validateAction = (setting: PatchingSetting) => {

    if (!('action' in setting)) {
        return false;
    }
    if (!Array.isArray(setting.action)) {
        return false;
    }
    const unableValue = setting.action.some(v => typeof v !== "string")
    return unableValue ? false : true;
}

const validateTableName = (setting: PatchingSetting) => {
    if (!('table_name' in setting)) {
        return false;
    }
    if (Array.isArray(setting.table_name)|| typeof setting.table_name !== "object") {
        return false;
    }
    const unableValue = Object.values(setting.table_name).some(v => typeof v !== "string");
    return unableValue ? false : true;
}

const validateActionAutoSaving = (setting: PatchingSetting) => {
    if (!('action_auto_saving' in setting)) {
        return false;
    }
    if (typeof setting.action_auto_saving !== "string") {
        return false;
    }
    if (!["on", "off"].includes(setting.action_auto_saving)) {
        return false;
    }
    return true;
}