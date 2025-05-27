<template>
    <el-row>
        <el-col :span="24">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="断卦四要素" name="0">
                    <section>
                        <h4>月建</h4>
                        <div class="description">
                            <p>月建能生克冲合一也。</p>
                        </div>
                    </section>

                    <section>
                        <h4>日辰</h4>
                        <div class="description">
                            <p>日辰能生克冲合二也。</p>
                        </div>
                    </section>

                    <section>
                        <h4>卦中之动爻</h4>
                        <div class="description">
                            <p>卦中之动爻能生克冲合三也。</p>
                        </div>
                    </section>

                    <section>
                        <h4>世爻发动变出之爻</h4>
                        <div class="description">
                            <p>世爻发动变出之爻能回头生、克、冲、合四也。</p>
                        </div>
                    </section>

                    <section>
                        <h4>综合分析</h4>
                        <ul>
                            <li>以上四项全来生合用神，诸占全吉。</li>
                            <li>三处生，一处克也为吉。</li>
                            <li>两克两生须看旺衰，元神旺相，吉；忌神旺相，凶。</li>
                            <li>三处克，一处生，若得相生之爻旺相，也可以理解为绝处逢生，凶可得解决；若值休囚，有生之名，无生之实。</li>
                            <li>与四处克同论，诸占皆大凶。</li>
                        </ul>
                    </section>
                </el-collapse-item>
                <el-collapse-item title="爻位含义" name="1">
                    <img src="@/assets/images/yao.png" style="width: 450px;"/>
                    <section>
                        <h4>上、中、下位</h4>  
                        <div class="description">      
                        <p>上爻，为上位。上卦之中爻和下卦之中爻为中位，初爻为下位</p>
                        </div>
                    </section>
                    <section>
                        <h4>天、地、人位</h4>  
                        <div class="description">      
                        <p>五爻、六爻为天位，三爻、四爻为人位，初爻、二爻为地位。五、三、初爻为天、人、地之正位</p>
                        </div>
                    </section>
                    <section>
                        <h4>阳位、阴位</h4>
                        <div class="description">      
                            <p>一卦六个爻，以初、三、五爻为阳位，二、四、上爻为阴位。阳居阳位，阴居阴位，为得位，如阴居阳位，阳居阴位，为不得位。得位象人所处的地位、环境有利，人之才德与职位相当，或人行事与职位相当，否则不当，不利。得位者，有利之象，不得位者，不利之象。</p>
                        </div>
                    </section>
                    <section>
                        <h4>天爻</h4>
                        <div class="description">
                            <p>天爻在上面，主高处、远处、外来、外面、外地、外国、外省、首皆、高贵、高层次、居于首脑地位；</p>
                            <p>主天象，天意，天灾，天时，人命不可违之事及规律；在人体上面表示上面部、头颈部等等一些含义。</p>
                        </div>
                    </section>

                    <section>
                        <h4>地爻</h4>
                        <div class="description">
                            <p>地爻主地理，为本地、近地、家里、为低处、下边、表示的下身、腿与足、主地位低贱、官位卑微、身份低下；</p>
                            <p>地爻为农村、乡里、主矿山、地质、为地理上面的变故、为地下、暗地里、地墓、地面等等。</p>
                        </div>
                    </section>

                    <section>
                        <h4>人爻</h4>
                        <div class="description">
                            <p>人爻在中间，地理上面主不远不近之处，在本市、县、区、镇；</p>
                            <p>主中间的、中等的、地位不高也不低、中间人、中介；</p>
                            <p>主人事、人事方面之事、主人祸、人事纠纷，人为灾祸，人为因素。</p>
                        </div>
                    </section>
                    <el-table :data="tableData" style="width: 100%" stripe>
                        <el-table-column v-for="(column, index) in columns" :key="index" :prop="column.prop"
                            :label="column.label" :min-width="column.minWidth" :fixed="column.fixed"
                            :show-overflow-tooltip="column.showOverflowTooltip" :tooltip-effect="column.tooltipEffect"
                            :tooltip-options="column.tooltipOptions">
                            <template #default="scope" v-if="column.render">
                                <div class="cell-wrap">{{ column.render(scope.row) }}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="五行" name="2">
                    <template v-for="(wx, index) in wuxingList" :key="index">
                        <section>
                            <h4>{{ wx.element }}</h4>
                            <div class="description">
                                <p>{{ wx.description }}</p>
                            </div>
                        </section>
                    </template>
                </el-collapse-item>
                <el-collapse-item title="三合局" name="10">
                    <template v-for="(he, index) in threeHeDtos" :key="index">
                        <section>
                            <h4>{{ he.wx }}局</h4>
                            <div class="element-group">
                                <span>{{ he.first }}↔{{ he.second }}↔{{ he.third }}</span>
                            </div>
                            <div class="description">
                                <p>{{ he.desc }}</p>
                            </div>
                        </section>
                    </template>
                </el-collapse-item>
                <el-collapse-item title="相合" name="3">
                    <el-row class="description">
                        <el-col :span="12">
                            <el-tooltip class="box-item" content="如为用事就表示人的运气也会越来越好" placement="top-start">
                                <h4 style="padding-left: 30px;">合中有生</h4>
                            </el-tooltip>
                            <template v-for="(he, index) in sixHeDtos">
                                <p v-if="he.desc.includes('生')" style="padding-left: 60px;">
                                    {{ he.first }}↔{{ he.second }}={{ he.wx }}
                                </p>
                            </template>
                        </el-col>
                        <el-col :span="12">
                            <el-tooltip class="box-item"
                                content="先好后坏，先合后分，诸如此类的先吉后忌的状况<br>比如夫妻关系中先和谐而后离婚；朋友关系中先友好而最终破裂。" placement="top-start"
                                raw-content>
                                <h4 style="padding-left: 40px;">合中有克</h4>
                            </el-tooltip>
                            <template v-for="(he, index) in sixHeDtos">
                                <p v-if="!he.desc.includes('生')" style="padding-left: 80px;">
                                    {{ he.first }}↔{{ he.second }}={{ he.wx }}
                                </p>
                            </template>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="相冲" name="4">
                    <p>如在八卦图上可以看出，卯为木在东，酉为金在西，火在南，子为水在北，其他支也如此，都是处在互对的位上，故为冲。</p>
                    <p>相冲为相克之意。凡四柱中逢冲不吉。六爻中逢冲有吉有凶，冲去福神者为凶，冲去克神者为吉。</p>
                    <div class="description">
                        <template v-for="(ctrl, index) in sixChongDtos" :key="index">
                            <h4>{{ ctrl.first }} ↔ {{ ctrl.second }}</h4>
                            <p>{{ ctrl.desc }}</p>
                        </template>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="相害" name="5">
                    <div class="description">
                        <p>假设，丙申年、乙未月、戊丁巳时，四柱中就有子未相害。</p>
                        <p>相害当然不好，但还看有制无制，有制者无妨，无制者不利。</p>
                        <template v-for="(ctrl, index) in sixHaiDtos" :key="index">
                            <h4>{{ ctrl.first }} ↔ {{ ctrl.second }}</h4>
                            <p>{{ ctrl.desc }}</p>
                        </template>
                    </div>

                </el-collapse-item>
                <el-collapse-item title="相刑 " name="6">
                    <p>主凶。多主刑事犯法之事，也主伤灾病痛之疾。凡四柱中见者不吉，遵纪守法，不作坏事可免刑役之苦。至于病灾多加防范，坚持练功可免病痛之忧。</p>
                    <p>相刑的原则与三合局一样，不同的是，三子可刑一卯，一卯可刑三子，但二卯不刑一子，一子不刑二卯。此外贪合忘刑，贪生忘刑也为有救</p>
                    <div class="description">
                        <template v-for="(ctrl, index) in xingDtos" :key="index">
                        <span style="color: #2c3e50;font-weight: bold;"
                            v-if="ctrl.first.includes('子') || ctrl.second.includes('子') || ctrl.first.includes('卯') || ctrl.second.includes('卯')">
                            {{ ctrl.first }}↔{{ ctrl.second }}
                        </span>&nbsp;
                        </template>
                        <p>
                        子刑卯，卯刑子，无礼之刑。凡四柱中有子卯二支（其他如此）为 “无礼之刑”，是因无礼之事而造成犯法或生灾祸。
                        </p>
                    </div>
                    <div class="description">
                        <template v-for="(ctrl, index) in xingDtos" :key="index">
                        <span style="color: #2c3e50;font-weight: bold;"
                            v-if="ctrl.first.includes('丑') || ctrl.first.includes('戌') || ctrl.first.includes('未')">
                            {{ ctrl.first }}↔{{ ctrl.second }}
                        </span>{{ctrl.first.includes('丑') || ctrl.first.includes('戌') || ctrl.first.includes('未')?'&nbsp;&nbsp;&nbsp;&nbsp;':''}}
                        </template>
                        <p>
                            丑刑戌，戌刑未，未刑丑，恃势之刑。 “恃势之刑”，是因自己仗着有权有势，胡作非为，欺压人民和他人，而导致犯法和生灾。
                        </p>
                    </div>
                    <div class="description">
                        <template v-for="(ctrl, index) in xingDtos" :key="index">
                            <span style="color: #2c3e50;font-weight: bold;" v-if="ctrl.first.includes('寅') || ctrl.first.includes('巳') || ctrl.first.includes('申')">
                            {{ ctrl.first }}↔{{ ctrl.second }}
                            </span>{{ctrl.first.includes('寅') || ctrl.first.includes('巳') || ctrl.first.includes('申')?'&nbsp;&nbsp;&nbsp;&nbsp;':''}}
                        </template>
                        <p>
                            寅刑巳，巳刑申，申刑寅，无恩之刑。“无恩之刑”，是知恩、得恩不报，相反陷害恩人，或杀害恩人而受到刑法的判决。
                        </p>
                    </div>

                    <div class="description">
                        <template v-for="(ctrl, index) in xingDtos" :key="index">
                            <span style="color: #2c3e50;font-weight: bold;"
                            v-if="ctrl.first.includes('辰') || ctrl.first.includes('午') || ctrl.first.includes('酉') || ctrl.first.includes('亥')">
                            {{ ctrl.first }}↔{{ ctrl.second }}
                        </span>{{ ctrl.first.includes('辰') || ctrl.first.includes('午') || ctrl.first.includes('酉') || ctrl.first.includes('亥') ?'&nbsp;&nbsp;&nbsp;&nbsp;':''}}
                        </template>
                        <p>
                        辰午酉亥，辰与辰、午与午、酉与酉、亥与亥，自刑。“自刑”，即是自己为达到某种阴谋或企图而造成犯罪。
                    </p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ChongHeDto, CtrlDto } from '../model/interfaces';
import http from '../utils/http';

// 初始化数据
const heDtos = ref<ChongHeDto[]>([]);
const threeHeDtos = ref<ChongHeDto[]>([]);
const sixHeDtos = ref<ChongHeDto[]>([]);
const ctrlDtos = ref<CtrlDto[]>([]);
const sixChongDtos = ref<CtrlDto[]>([]);
const sixHaiDtos = ref<CtrlDto[]>([]);
const xingDtos = ref<CtrlDto[]>([]);
const error = ref<string | null>(null);


const wuxingList = ref([
  {
    element: '木',
    description: '具有生发、条达的特性'
  },
  {
    element: '火',
    description: '具有炎热、向上的特性'
  },
  {
    element: '土',
    description: '具有长养、化育的特性'
  },
  {
    element: '金',
    description: '具有清静、收杀的特性'
  },
  {
    element: '水',
    description: '具有寒冷、向下的特性'
  }
]);

const tableData = [
    {
        yao: '初爻',
        person: '群众、小学生、无业游民',
        human_relation: '子孙晚辈',
        body_part: '足部、口部（脸部）',
        disease: '脚部疾病',
        time: '早晨、农历十一月、十二月',
        location: '农村、幼儿园、居委会',
        seeking_help: '心事',
        business: '亡身',
        other: '无宗教信仰者、告诉、报告、植物'
    },
    {
        yao: '二爻',
        person: '行政管理者',
        human_relation: '夫妇',
        body_part: '腿、股、脸颊部（脸部）',
        disease: '腿、股病，子宫病',
        time: '中午、农历正月、二月',
        location: '区、镇、乡政府，街道办事处',
        seeking_help: '身事',
        business: '伴侣',
        other: '宗教团体、易动感情者、成家立业者、家宅、果实、竹子等'
    },
    {
        yao: '三爻',
        person: '处长、厂长、成家立业者、初中学生',
        human_relation: '兄弟姐妹',
        body_part: '腰部、鼻部（脸部）',
        disease: '腰部疾病',
        time: '午后、农历三月、四月',
        location: '县政府、区委会、中等城市',
        seeking_help: '家事',
        business: '行李、货物',
        other: '基督教、聪明者、无产者、森林、蔬菜'
    },
    {
        yao: '四爻',
        person: '局级以上干部、工矿企业家、高中级专科学生、有产者',
        human_relation: '伯叔婶姨姑等长辈',
        body_part: '肋部、耳部（脸部）',
        disease: '肋部疾病',
        time: '下午至傍晚、农历五月、六月',
        location: '省府、大城市、专科学校',
        seeking_help: '人事',
        business: '车、船等交通工具',
        other: '善于思考者、土地'
    },
    {
        yao: '五爻',
        person: '国家统治者、中央部委局办负责人、大企业家',
        human_relation: '父母亲',
        body_part: '心脏、肺部、眼睛部位（脸部）',
        disease: '心、肺、气管等疾病',
        time: '夜晚、农历七月、八月',
        location: '首都、高等学府',
        seeking_help: '官事',
        business: '道路',
        other: '黄金、光热、聪明绝顶者、成效、信用、农民、儒道'
    },
    {
        yao: '上爻',
        person: '皇室人员、元老、有功军人、退休人、大富豪',
        human_relation: '祖父母、祖宗',
        body_part: '头部',
        disease: '头部疾病',
        time: '半夜、农历九月、十月',
        location: '外国、皇室居住地、众议院、人大会、科学院等大型科研机构',
        seeking_help: '国事',
        business: '目的地',
        other: '贵金属、金刚石、精神病患者、饮料、神道、仁慈'
    }
].reverse();

const tooltipOptions = {
    effect: 'light',
    placement: 'top-start',
    offset: [0, 10],
    disabled: false,
    transition: 'el-fade-in-linear',
    openDelay: 500,
    hideAfter: 3000,
    manual: false,
    popperClass: 'custom-tooltip',
};
const columns = [
    {
        prop: 'yao',
        label: '爻位',
        width: 100,
        fixed: true,
    },
    {
        prop: 'person',
        label: '人物',
        minWidth: 150,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.person,
    },
    {
        prop: 'human_relation',
        label: '人伦',
        minWidth: 120,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.human_relation,
    },
    {
        prop: 'body_part',
        label: '人身',
        minWidth: 120,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.body_part,
    },
    {
        prop: 'disease',
        label: '疾病',
        minWidth: 120,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.disease,
    },
    {
        prop: 'time',
        label: '时间',
        minWidth: 150,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.time,
    },
    {
        prop: 'location',
        label: '场所',
        minWidth: 150,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.location,
    },
    {
        prop: 'seeking_help',
        label: '求事',
        minWidth: 120,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.seeking_help,
    },
    {
        prop: 'business',
        label: '出外经商',
        minWidth: 150,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.business,
    },
    {
        prop: 'other',
        label: '其它',
        minWidth: 200,
        showOverflowTooltip: true,
        tooltipEffect: 'light',
        tooltipOptions: tooltipOptions,
        render: (row) => row.other,
    },
]


const activeNames = ref(['0', '1', '2', '3', '4', '5', '6']);

// 获取相合列表
async function fetchHes() {
    try {
        const response = await http.get('/baseData/queryHes');
        heDtos.value = response.data;
        threeHeDtos.value = heDtos.value.filter(chonghe => chonghe.third !== null);
        sixHeDtos.value = heDtos.value.filter(chonghe => chonghe.type === '地支' && chonghe.third === null);
    } catch (err) {
        error.value = err.message || 'Failed to fetch hes';
    }
}

// 获取相冲列表
async function fetchCtrls() {
    try {
        const response = await http.get('/baseData/queryCtrls');
        ctrlDtos.value = response.data;
        sixChongDtos.value = ctrlDtos.value.filter(ctrl => ctrl.type === '地支' && ctrl.relationType === '冲');
        sixHaiDtos.value = ctrlDtos.value.filter(ctrl => ctrl.type === '地支' && ctrl.relationType === '害');
        xingDtos.value = ctrlDtos.value.filter(ctrl => ctrl.type === '地支' && ctrl.relationType === '刑');
    } catch (err) {
        error.value = err.message || 'Failed to fetch ctrls';
    }
}

// 在组件挂载时获取数据
onMounted(() => {
    fetchHes();
    fetchCtrls();
});
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

.cell-wrap {
    white-space: nowrap;
    /* 防止自动换行 */
    overflow: hidden;
    /* 隐藏溢出部分 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.custom-tooltip {
    background-color: rgba(255, 255, 255, 0.9);
    /* 自定义背景颜色 */
    border: 1px solid #ccc;
    /* 自定义边框 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* 自定义阴影 */
}

h4 {
    color: #2c3e50;
}

section {
    margin-bottom: 40px;
}

.description {
    background-color: #f9f9f9;
    padding: 15px;
    border-left: 5px solid #3498db;
}

.description p {
    margin: 0 0 10px;
}
</style>