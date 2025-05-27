// src/enums/RelationType.ts

export enum RelationType {
    UNKNOWN = 0,
    CHONG = 1,
    HAI = 2,
    XING = 3,
    GENERATE = 4,
    CTRL = 5,
    HE = 6,
}

export const RelationTypeNameMapping: { [key in RelationType]: string } = {
    [RelationType.UNKNOWN]: '未知',
    [RelationType.CHONG]: '冲',
    [RelationType.HAI]: '害',
    [RelationType.XING]: '刑',
    [RelationType.GENERATE]: '生',
    [RelationType.CTRL]: '克',
    [RelationType.HE]: '合',
};

export function getRelationTypeByCode(code: number): { code: number, cnName: string } {
    const cnName = RelationTypeNameMapping[code as RelationType];
    if (!cnName) {
        throw new Error(`invalid code: ${code}`);
    }
    return { code, cnName };
}

export function getRelationTypeByName(name: string): { code: number, cnName: string } {
    for (const [key, value] of Object.entries(RelationTypeNameMapping)) {
        if (value === name) {
            return { code: parseInt(key), cnName: value };
        }
    }
    throw new Error(`invalid name: ${name}`);
}