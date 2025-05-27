// src/enums/GuaType.ts
export enum GuaType {
    ORIGIN = "本",
    CHANGE = "变",
    JOIN = "互"
}

const NAME_MAPPING: { [key: string]: GuaType } = {
    "本": GuaType.ORIGIN,
    "变": GuaType.CHANGE,
    "互": GuaType.JOIN
};

const CODE_MAPPING: { [key: number]: GuaType } = {
    0: GuaType.ORIGIN,
    1: GuaType.CHANGE,
    2: GuaType.JOIN
};

/**
 * 根据名称获取 GuaType
 * @param name 名称
 * @returns GuaType
 */
export function getGuaTypeByName(name: string): GuaType {
    const guaType = NAME_MAPPING[name];
    if (!guaType) {
        throw new Error(`Invalid name: ${name}`);
    }
    return guaType;
}

/**
 * 根据编码获取 GuaType
 * @param code 编码
 * @returns GuaType
 */
export function getGuaTypeByCode(code: number): GuaType {
    const guaType = CODE_MAPPING[code];
    if (!guaType) {
        throw new Error(`Invalid code: ${code}`);
    }
    return guaType;
}

/**
 * 获取所有 GuaType 的映射
 * @returns Map of GuaType
 */
export function getAllGuaTypes(): { [key: string]: GuaType } {
    return NAME_MAPPING;
}