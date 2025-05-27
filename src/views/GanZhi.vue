<template>
    <el-row :gutter="100" style="max-width: 98%;">
        <el-col :span="24">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="十天干" name="1">
                    <el-table :data="ganDtos" style="width: 98%">
                        <el-table-column prop="code" label="编码" />
                        <el-table-column prop="name" label="名称" />
                        <el-table-column prop="pin" label="拼音" />
                        <el-table-column prop="season" label="季节" />
                        <el-table-column prop="wx" label="五行" />
                        <el-table-column prop="nei" label="脏腑" />
                        <el-table-column prop="wai" label="百骸" />
                        <el-table-column prop="desc" label="描述" width="800" />
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="十二地支" name="2">
                    <el-table :data="zhiDtos" style="width: 98%">
                        <el-table-column prop="code" label="编码" />
                        <el-table-column prop="name" label="名称" />
                        <el-table-column prop="pingYin" label="拼音" />
                        <el-table-column prop="animal" label="属相" />
                        <el-table-column prop="yue" label="月份" />
                        <el-table-column prop="hourRange" label="时间范围" />
                        <el-table-column prop="solarRange" label="节气" />
                        <el-table-column prop="direction" label="方位" />
                        <el-table-column prop="wx" label="五行" />
                        <el-table-column prop="season" label="季节" />
                        <el-table-column prop="organ" label="脏腑" />
                        <el-table-column prop="star" label="紫薇星" width="800" />
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="三合局" name="3">
                    <p v-for="(he, index) in threeHeDtos" :key="index" style="padding-left: 50px;">
                        {{ he.desc }}
                    </p>
                </el-collapse-item>
                <el-collapse-item title="六合（合中有生，如为用事就表示人的运气也会越来越好。合中有克，先好后坏，先热后冷，先合后分等，诸如此类的先吉后忌的状况。比如夫妻关系中先和谐而后离婚；朋友关系中先友好而最终破裂。）" name="4" >
                    <p v-for="(he, index) in sixHeDtos" :key="index" style="padding-left: 50px;" :style="{color: he.desc.includes('生')?'green':'orange'}">
                        {{ he.first }}<->{{ he.second }}={{ he.wx }}
                    </p>
                </el-collapse-item>
                <el-collapse-item title="六冲" name="5" >
                    <p v-for="(ctrl, index) in sixChongDtos" :key="index" style="padding-left: 50px;">
                        {{ ctrl.first }}<->{{ ctrl.second }}:{{ ctrl.desc }}
                    </p>
                </el-collapse-item>
                <el-collapse-item title="六害" name="6" >
                    <p v-for="(ctrl, index) in sixHaiDtos" :key="index" style="padding-left: 50px;">
                        {{ ctrl.first }}<->{{ ctrl.second }}:{{ ctrl.desc }}
                    </p>
                </el-collapse-item>
                <el-collapse-item title="相刑 (子刑卯，卯刑子，无礼之刑。丑刑戌，戌刑未，未刑丑，恃势之刑。寅刑巳，巳刑申，申刑寅，无恩之刑。辰午酉亥，辰与辰、午与午、酉与酉、亥与亥，自刑。)" name="7" >
                    <p v-for="(ctrl, index) in xingDtos" :key="index" style="padding-left: 50px;">
                        {{ ctrl.first }}<->{{ ctrl.second }}
                    </p>
                </el-collapse-item>
            </el-collapse>
        </el-col>

    </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GanDto, ZhiDto, ChongHeDto ,CtrlDto} from '../model/interfaces';
import http from '../utils/http';

// 使用 ref 创建响应式数组
const ganDtos = ref<GanDto[]>([]);
const zhiDtos = ref<ZhiDto[]>([]);
const heDtos = ref<ChongHeDto[]>([]);
const threeHeDtos = ref<ChongHeDto[]>([]);
const sixHeDtos = ref<ChongHeDto[]>([]);
const ctrlDtos = ref<CtrlDto[]>([]);
const sixChongDtos = ref<CtrlDto[]>([]);
const sixHaiDtos = ref<CtrlDto[]>([]);
const xingDtos = ref<CtrlDto[]>([]);
const error = ref<string | null>(null);

const activeNames = ref(['1'])


// 获取天干列表
async function fetchGans() {
    try {
        const response = await http.get('/baseData/queryGans');
        ganDtos.value = response.data;
    } catch (err) {
        error.value = err.message || 'Failed to fetch gans';
    }
}

// 获取地支列表
async function fetchZhis() {
    try {
        const response = await http.get('/baseData/queryZhis');
        zhiDtos.value = response.data;
    } catch (err) {
        error.value = err.message || 'Failed to fetch zhis';
    }
}

// 获取相合列表
async function fetchHes() {
    try {
        const response = await http.get('/baseData/queryHes');
        heDtos.value = response.data;
        threeHeDtos.value = heDtos.value.filter(chonghe => 
            chonghe.third!==null
        );
        sixHeDtos.value = heDtos.value.filter(chonghe => 
            chonghe.type==='地支' && chonghe.third===null
        );
    } catch (err) {
        error.value = err.message || 'Failed to fetch hes';
    }
}

// 获取相冲列表
async function fetchCtrls() {
    try {
        const response = await http.get('/baseData/queryCtrls');
        ctrlDtos.value = response.data;
        sixChongDtos.value = ctrlDtos.value.filter(ctrl => 
            ctrl.type==='地支' && ctrl.relationType==='冲'
        );
        sixHaiDtos.value = ctrlDtos.value.filter(ctrl => 
            ctrl.type==='地支' && ctrl.relationType==='害'
        );
        xingDtos.value = ctrlDtos.value.filter(ctrl => 
            ctrl.type==='地支' && ctrl.relationType==='刑'
        );
    } catch (err) {
        error.value = err.message || 'Failed to fetch hes';
    }
}

function getHeDesc(index: number, he: ChongHeDto): string {
    return (index + 1) + `.${he.first}<->${he.second}=${he.wx}`;
}

// 在组件挂载时获取数据
onMounted(() => {
    fetchGans();
    fetchZhis();
    fetchHes();
    fetchCtrls();
});
</script>
<style>
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
</style>