export const isString = (data) => typeof data === "string";

export const stringIsFilled = (data) => isString(data) && data.trim().length > 0;

export const stringsAreFilled = (data) => Array.isArray(data) && data.every(stringIsFilled);
