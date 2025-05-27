// src/enums/Shen.ts

export enum Wx {
    WOOD = "木",
    FIRE = "火",
    EARTH = "土",
    GOLD = "金",
    WATER = "水"
}

export enum Shen {
    QING_LONG = "青龙",
    ZHU_QUE = "朱雀",
    GOU_CHEN = "勾陈",
    TENG_SHE = "腾蛇",
    BAI_HU = "白虎",
    XUAN_WU = "玄武"
}

interface ShenDetails {
    code: number;
    cnName: string;
    wx: Wx;
}

const shenMapping: { [key: string]: ShenDetails } = {
    [Shen.QING_LONG]: { code: 1, cnName: "青龙", wx: Wx.WOOD},
    [Shen.ZHU_QUE]: { code: 2, cnName: "朱雀", wx: Wx.FIRE},
    [Shen.GOU_CHEN]: { code: 3, cnName: "勾陈", wx: Wx.EARTH},
    [Shen.TENG_SHE]: { code: 4, cnName: "腾蛇", wx: Wx.EARTH},
    [Shen.BAI_HU]: { code: 5, cnName: "白虎", wx: Wx.GOLD},
    [Shen.XUAN_WU]: { code: 6, cnName: "玄武", wx: Wx.WATER}
};

/**
 * 根据名称获取 Shen
 * @param name 名称
 * @returns Shen
 */
export function getShenByName(name: string): Shen | undefined {
    return Object.keys(shenMapping).find(key => shenMapping[key].cnName === name) as Shen;
}

/**
 * 根据编码获取 Shen
 * @param code 编码
 * @returns Shen
 */
export function getShenByCode(code: number): Shen | undefined {
    return Object.values(shenMapping).find(details => details.code === code)?.cnName as Shen;
}

/**
 * 根据名称获取 Shen 描述
 * @param name 名称
 * @returns 描述
 */
export function getShenDescByName(name: string): string | undefined {
    const details = Object.values(shenMapping).find(detail => detail.cnName === name);
    return details ? details.desc : undefined;
}

/**
 * 获取所有 Shen
 * @returns Map of Shen
 */
export function getAllShens(): { [key: string]: ShenDetails } {
    return shenMapping;
}

export { shenMapping };