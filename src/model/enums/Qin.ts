export enum Qin {
    NONE = "未设置",
    FU_MU = "父母",
    ZI_SUN = "子孙",
    XIONG_DI = "兄弟",
    QI_CAI = "妻财",
    GUAN_GUI = "官鬼"
}

interface QinDetails {
    code: number;
    cnName: string;
    fu?: Qin;
    zi?: Qin;
}

const qinMapping: { [key: string]: QinDetails } = {
    [Qin.NONE]: { code: 0, cnName: "未设置" },
    [Qin.FU_MU]: { code: 1, cnName: "父母", fu: Qin.GUAN_GUI, zi: Qin.XIONG_DI },
    [Qin.ZI_SUN]: { code: 2, cnName: "子孙", fu: Qin.XIONG_DI, zi: Qin.QI_CAI },
    [Qin.XIONG_DI]: { code: 3, cnName: "兄弟", fu: Qin.FU_MU, zi: Qin.ZI_SUN },
    [Qin.QI_CAI]: { code: 4, cnName: "妻财", fu: Qin.ZI_SUN, zi: Qin.GUAN_GUI},
    [Qin.GUAN_GUI]: { code: 5, cnName: "官鬼", fu: Qin.QI_CAI, zi: Qin.FU_MU}
};

export function getQinByName(name: string): Qin | undefined {
    return Object.keys(qinMapping).find(key => qinMapping[key].cnName === name) as Qin;
}

export function getQinByCode(code: number): Qin | undefined {
    return Object.values(qinMapping).find(details => details.code === code)?.cnName as Qin;
}

export function getFu(qin: Qin): Qin | undefined {
    return qinMapping[qin]?.fu;
}

export function getZi(qin: Qin): Qin | undefined {
    return qinMapping[qin]?.zi;
}