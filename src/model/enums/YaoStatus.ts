// src/enums/YaoStatus.ts
export enum YaoStatus {
    SHENG = "长生",
    YU = "沐浴",
    DAI = "冠带",
    GUAN = "临官",
    DI_WANG = "帝旺",
    SHUAI = "衰",
    BING = "病",
    ZHANG_SI = "死",
    MU = "墓",
    JUE = "绝",
    TAI = "胎",
    YANG = "养",
    WANG = "旺",
    XIANG = "相",
    XIU = "休",
    QIU = "囚",
    SI = "死",
    BACK_CTRL = "回头克",
    BACK_GEN = "回头生",
    BACK_TOMB = "回头墓",
    NEXT_GOD = "进神",
    BACK_GOD = "退神",
    YUE_JIAN = "临月建",
    YUE_HE = "月合",
    YUE_PO = "月破",
    YUE_CTRL = "月克",
    GEN_YUE = "生月",
    CTRL_YUE = "克月",
    YUE_GEN = "得月生",
    YUE_HARMONY = "得月扶",
    RI_JIAN = "临日建",
    RI_HE = "与日合",
    RI_GEN = "得日生",
    RI_HARMONY = "得日扶",
    RI_CTRL = "日克",
    RI_PO = "日破",
    RI_TOMB = "日绝",
    GNE_RI = "生日",
    CTRL_RI = "克日",
    DONG_HE = "与动爻合"
}

interface YaoStatusDetails {
    code: number;
    cnName: string;
}

const yaoStatusMapping: { [key: string]: YaoStatusDetails } = {
    [YaoStatus.SHENG]: { code: 1, cnName: "长生" },
    [YaoStatus.YU]: { code: 2, cnName: "沐浴" },
    [YaoStatus.DAI]: { code: 3, cnName: "冠带" },
    [YaoStatus.GUAN]: { code: 4, cnName: "临官" },
    [YaoStatus.DI_WANG]: { code: 5, cnName: "帝旺" },
    [YaoStatus.SHUAI]: { code: 6, cnName: "衰" },
    [YaoStatus.BING]: { code: 7, cnName: "病" },
    [YaoStatus.ZHANG_SI]: { code: 8, cnName: "死" },
    [YaoStatus.MU]: { code: 9, cnName: "墓" },
    [YaoStatus.JUE]: { code: 10, cnName: "绝" },
    [YaoStatus.TAI]: { code: 11, cnName: "胎" },
    [YaoStatus.YANG]: { code: 12, cnName: "养" },
    [YaoStatus.WANG]: { code: 13, cnName: "旺" },
    [YaoStatus.XIANG]: { code: 14, cnName: "相" },
    [YaoStatus.XIU]: { code: 15, cnName: "休" },
    [YaoStatus.QIU]: { code: 16, cnName: "囚" },
    [YaoStatus.SI]: { code: 17, cnName: "死" },
    [YaoStatus.BACK_CTRL]: { code: 18, cnName: "回头克" },
    [YaoStatus.BACK_GEN]: { code: 19, cnName: "回头生" },
    [YaoStatus.BACK_TOMB]: { code: 20, cnName: "回头墓" },
    [YaoStatus.NEXT_GOD]: { code: 21, cnName: "进神" },
    [YaoStatus.BACK_GOD]: { code: 22, cnName: "退神" },
    [YaoStatus.YUE_JIAN]: { code: 23, cnName: "临月建" },
    [YaoStatus.YUE_HE]: { code: 24, cnName: "月合" },
    [YaoStatus.YUE_PO]: { code: 25, cnName: "月破" },
    [YaoStatus.YUE_CTRL]: { code: 26, cnName: "月克" },
    [YaoStatus.GEN_YUE]: { code: 27, cnName: "生月" },
    [YaoStatus.CTRL_YUE]: { code: 28, cnName: "克月" },
    [YaoStatus.YUE_GEN]: { code: 29, cnName: "得月生" },
    [YaoStatus.YUE_HARMONY]: { code: 30, cnName: "得月扶" },
    [YaoStatus.RI_JIAN]: { code: 31, cnName: "临日建" },
    [YaoStatus.RI_HE]: { code: 32, cnName: "与日合" },
    [YaoStatus.RI_GEN]: { code: 33, cnName: "得日生" },
    [YaoStatus.RI_HARMONY]: { code: 34, cnName: "得日扶" },
    [YaoStatus.RI_CTRL]: { code: 35, cnName: "日克" },
    [YaoStatus.RI_PO]: { code: 36, cnName: "日破" },
    [YaoStatus.RI_TOMB]: { code: 37, cnName: "日绝" },
    [YaoStatus.GNE_RI]: { code: 38, cnName: "生日" },
    [YaoStatus.CTRL_RI]: { code: 39, cnName: "克日" },
    [YaoStatus.DONG_HE]: { code: 40, cnName: "与动爻合" }
};

/**
 * 根据名称获取 YaoStatus
 * @param name 名称
 * @returns YaoStatus
 */
export function getYaoStatusByName(name: string): YaoStatus | undefined {
    return Object.keys(yaoStatusMapping).find(key => yaoStatusMapping[key].cnName === name) as YaoStatus;
}

/**
 * 根据编码获取 YaoStatus
 * @param code 编码
 * @returns YaoStatus
 */
export function getYaoStatusByCode(code: number): YaoStatus | undefined {
    return Object.values(yaoStatusMapping).find(details => details.code === code)?.cnName as YaoStatus;
}

/**
 * 获取所有 YaoStatus
 * @returns Map of YaoStatus
 */
export function getAllYaoStatus(): { [key: string]: YaoStatusDetails } {
    return yaoStatusMapping;
}

/**
 * 判断是否为旺状态集合中的状态
 * @param yaoStatus YaoStatus
 * @returns boolean
 */
export function isWang(yaoStatus: YaoStatus): boolean {
    const wangSet = new Set([YaoStatus.SHENG, YaoStatus.GUAN, YaoStatus.DI_WANG]);
    return wangSet.has(yaoStatus);
}

/**
 * 判断是否为墓状态集合中的状态
 * @param yaoStatus YaoStatus
 * @returns boolean
 */
export function isTomb(yaoStatus: YaoStatus): boolean {
    const tombSet = new Set([
        YaoStatus.TAI, YaoStatus.YANG, YaoStatus.SHUAI, YaoStatus.BING,
        YaoStatus.ZHANG_SI, YaoStatus.MU, YaoStatus.JUE
    ]);
    return tombSet.has(yaoStatus);
}