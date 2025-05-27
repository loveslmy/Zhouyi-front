// src/enums/Role.ts
export enum Role {
    ONE_YAO = "初",
    TWO_YAO = "二",
    THREE_YAO = "三",
    FOUR_GOD = "四",
    FIVE_GOD = "五",
    SIX_GOD = "上",
    USE_GOD = "用神",
    ORIGIN_GOD = "原神",
    AVOID_GOD = "忌神",
    ENMITY_GOD = "仇神",
    HIDE_GOD = "伏神",
    FLY_GOD = "飞神",
    SHI_YAO = "世爻",
    YING_YAO = "应爻",
    ACTIVE_YAO = "动爻",
    HIDE_ACTIVE_YAO = "暗动",
    CHANGE_YAO = "变爻"
}

interface RoleDetails {
    code: number;
    cnName: string;
}

const roleMapping: { [key: string]: RoleDetails } = {
    [Role.ONE_YAO]: { code: 0, cnName: "初" },
    [Role.TWO_YAO]: { code: 1, cnName: "二" },
    [Role.THREE_YAO]: { code: 2, cnName: "三" },
    [Role.FOUR_GOD]: { code: 3, cnName: "四" },
    [Role.FIVE_GOD]: { code: 4, cnName: "五" },
    [Role.SIX_GOD]: { code: 5, cnName: "上" },
    [Role.USE_GOD]: { code: 6, cnName: "用神" },
    [Role.ORIGIN_GOD]: { code: 7, cnName: "原神" },
    [Role.AVOID_GOD]: { code: 8, cnName: "忌神" },
    [Role.ENMITY_GOD]: { code: 9, cnName: "仇神" },
    [Role.HIDE_GOD]: { code: 10, cnName: "伏神" },
    [Role.FLY_GOD]: { code: 11, cnName: "飞神" },
    [Role.SHI_YAO]: { code: 12, cnName: "世爻" },
    [Role.YING_YAO]: { code: 13, cnName: "应爻" },
    [Role.ACTIVE_YAO]: { code: 14, cnName: "动爻" },
    [Role.HIDE_ACTIVE_YAO]: { code: 15, cnName: "暗动" },
    [Role.CHANGE_YAO]: { code: 16, cnName: "变爻" }
};

/**
 * 根据名称获取 Role
 * @param name 名称
 * @returns Role
 */
export function getRoleByName(name: string): Role | undefined {
    return Object.keys(roleMapping).find(key => roleMapping[key].cnName === name) as Role;
}

/**
 * 根据编码获取 Role
 * @param code 编码
 * @returns Role
 */
export function getRoleByCode(code: number): Role | undefined {
    return Object.values(roleMapping).find(details => details.code === code)?.cnName as Role;
}

/**
 * 获取所有 Role
 * @returns Map of Role
 */
export function getAllRoles(): { [key: string]: RoleDetails } {
    return roleMapping;
}