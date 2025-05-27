import { GuaType } from '@/model/enums/GuaType';
import { Qin } from '@/model/enums/Qin';
import { Role } from '@/model/enums/Role';
import { YaoStatus } from '@/model/enums/YaoStatus';
import { Shen } from '@/model/enums/Shen';
import { RelationType } from '@/model/enums/RelationType';

export interface BQinDetail {
  id: number;                       // 主键
  qinName: string;                  // 六亲名称
  matter: string;                   // 所占事项
  symbolicMeaning: string;          // 象征意义
}

export interface BEightTrigrams {
  id?: number;                  // 卦象ID
  guaName: string;              // 卦象名称
  skyTime: string;              // 天时
  geography: string;            // 地理
  person: string;               // 人物
  personnelMatters: string;     // 人事
  bodyPart: string;             // 身体
  timeSequence: string;         // 时序
  animal: string;               // 动物
  staticObject: string;         // 静物
  houseResidence: string;       // 屋宿
  familyResidence: string;      // 家宅
  marriage: string;             // 婚姻
  diet: string;                 // 饮食
  production: string;           // 生产
  seekingFame: string;          // 求名
  seekingProfit: string;        // 求利
  transaction: string;          // 交易
  travel: string;               // 出行
  visiting: string;             // 谒见
  illness: string;              // 疾病
  lawsuits: string;             // 官讼
  graves: string;               // 坟墓
  surname: string;              // 姓氏
  number: string;               // 数目
  direction: string;            // 方道
  color: string;                // 五色
  taste: string;                // 五味
  profession: string;           // 职业
  fiveElements: string;         // 五行
  shape: string;                // 形状
  createdAt: Date;              // 创建时间
  updatedAt: Date;              // 更新时间
  deepSymbolism: string;        // 深层象征
  personalityTraits: string;    // 性格特征
}

export interface GanDto {
  code: number; 
  name: string; 
  pin: string;
  wx: string;   
  nei: string;  
  wai: string;  
  angle: number; 
  season: string; 
  desc: string;
}

export interface ZhiDto {
  code: number; 
  name: string; 
  pingYin: string;
  animal: string;
  yue: string;
  hourRange: string;
  solarRange: string;
  direction: string;
  wx: string;   
  season: string;
  organ: string;
  star:string;
} 

export interface YaoDto {
  yinYang: boolean;
  index:number;
  guaType: GuaType;
  gan: GanDto;
  zhi: ZhiDto;
  qin: Qin;
  roles: Role[];
  statuses: YaoStatus[];
  shen: Shen;
  idx: Role;
  times: YaoStatus[];
}

export interface YaoRelationDto {
  source: YaoDto;
  target: YaoDto;
  relationType: RelationType;
}

export interface LiuYaoGuaDto {
  yinLi:string;                // 阴历
  yangLi:string;               // 阳历
  matter:string;               // 占卜事项
  remark:string;               // 备注
  conclusion:string;           // 结论
  xunKong:string;              // 旬空
  yearGan: GanDto;             // 年干
  monthGan: GanDto;            // 月干
  dayGan: GanDto;              // 日干
  hourGan: GanDto;             // 时干
  yearZhi: ZhiDto;             // 年支
  monthZhi: ZhiDto;            // 月支
  dayZhi: ZhiDto;              // 日支
  hourZhi: ZhiDto;             // 时支
  originGua: GuaDto;           // 本卦
  changeGua: GuaDto;           // 变卦
  joinGua: GuaDto;             // 综卦
  guaWxStatuses:string[];      // 卦在月令上旺相休囚状态
  bodyUseStatuses:string[];    // 体用生克状态
  gongs:number[];              // 纯卦编号列表
  originYaos: YaoDto[];        // 本卦的六个爻
  changeYaos: YaoDto[];        // 变卦的六个爻
  joinYaos: YaoDto[];          // 藏卦的六个爻
  originScores: number[];      // 本卦爻分数
  changeScores: number[];      // 变卦爻分数
  joinScores: number[];        // 藏卦爻分数
  relations: YaoRelationDto[]; // 动爻作用关系
  msgList:string[];            // 分析日志          
}

export interface BLiuYao {
  id: number | null;
  seq: string;
  name: string;
  matter: string;
  symbol: string;
  used: number;
  usedName: string;
  startTime: Date;
  type: number;
  remark: string;
  conclusion: string;
  category: number;
  categoryName: string;
}

export interface BCategory {
  id: number;
  parentId: number;
  categoryName: string;
  categorySlug: string;
  description: string;
  sortOrder: number;
  children?: BCategory[]; 
}

export interface GongDto {
  seq: number;
  name: string;
  wx:string;
  desc: string;
  guaList: GuaDto[];
  ganList: GanDto[];
  zhiList: ZhiDto[];
}

export interface GuaDto {
  gong: string;
  code: number; 
  gongSeq: number; 
  guaType: '0' | '1' | '2'; 
  type: string; 
  symbol: string;
  name: string;
  pin: string;
  heavenlyTiming: string;
  geography: string;
  characters: string;
  personnelMatters: string;
  bodyParts: string;
  timeSequence: string;
  houseResidence: string;
  familyResidence: string;
  marriage: string;
  diet: string;
  production: string;
  seekingFame: string;
  seekingProsperity: string;
  transaction: string;
  seekingProfit: string;
  travel: string;
  visiting: string;
  illness: string;
  lawsuits: string;
  graves: string;
  direction: string;
  fiveColors: string;
  surname: string;
  number: string;
  fiveTastes: string;
  comment: string;
  yaoComment: string;
}

export interface ChongHeDto {
  first: string;
  second: string;
  third: string;
  type: string;
  wx: string;   
  desc: string;
}

export interface CtrlDto {
  first: string;
  second: string;
  type: string;
  desc: string;
  relationType: string;
}