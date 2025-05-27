<template>
    <el-row :gutter="50" class="row">
        <el-col :span="5">
            <TaiJiCanvas />
            <div style="margin-top: 480px;">
                <p v-for="guaDto in gongDto.guaList" :key="guaDto.gongSeq" style="padding-left: 20px;padding-right: 20px;">
                        <el-link style="font-size: medium;" @click="navigateToAbout(guaDto.code)">{{ guaDto.gongSeq }}.{{ guaDto.symbol }}{{guaDto.name }}（{{guaDto.pin }}）{{ guaDto.type }}</el-link>
                        </p>  
            </div>
        </el-col>
        <el-col :span="16">
            <el-card class="box-card" style="margin-left:20px;width:100%; ">
                <template #header>
                    <div class="card-header">
                        <span>{{gongDto.seq}}-{{gongDto.name}}宫</span>
                    </div>
                </template>
                <el-row>
                    <el-col :span="24">
                        <EightTrigrams :id="gongDto.seq" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <h4 style="padding-left: 10px;">纳干：<span v-for="(ganDto, index) in gongDto.ganList" :key="index" class="text item">{{
                        getGanLabel(ganDto) }}{{ index < gongDto.ganList.length - 1 ? '、' : '' }}</span></h4>

                        <el-table :data="uniqueGanList" style="padding-left:30px;width: 95%">
                        <el-table-column prop="name" label="名称" width="80" />
                        <el-table-column prop="pin" label="拼音" width="80" />
                        <el-table-column prop="season" label="季节" width="80"/>
                        <el-table-column prop="wx" label="五行" width="80" />
                        <el-table-column prop="nei" label="脏腑" width="80" />
                        <el-table-column prop="wai" label="百骸"  width="80"/>
                        <el-table-column prop="desc" label="描述" />
                        </el-table>

                        <h4 style="padding-left: 10px;">纳支：<span v-for="(zhiDto, index) in gongDto.zhiList" :key="index" class="text item">{{
                        getZhiLabel(zhiDto) }}{{ index < gongDto.zhiList.length - 1 ? '、' : '' }}</span></h4>
                        <el-table :data="gongDto.zhiList" style="padding-left:30px;width: 95%">
                        <el-table-column prop="name" label="名称" width="80" />
                        <el-table-column prop="pingYin" label="拼音" width="80" />
                        <el-table-column prop="wx" label="五行" width="80"/>
                        <el-table-column prop="direction" label="方位" width="80"  />
                        <el-table-column prop="animal" label="属相" width="80" />
                        <el-table-column prop="yue" label="月份" width="80" />
                        <el-table-column prop="hourRange" label="时间范围" width="80" />
                        <el-table-column prop="solarRange" label="节气" width="100" />
                        <el-table-column prop="season" label="季节" width="80" />
                        <el-table-column prop="organ" label="脏腑" width="80"/>
                        <el-table-column prop="star" label="紫薇星" />
                        </el-table>                  
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="50" class="row">
        <el-col>
            <GuaxiangDetails :gongSeq="currentGongSeq" />
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide, watch , computed } from 'vue';
import { useRouter } from 'vue-router';
import { GanDto, ZhiDto, GongDto, GuaDto } from '../model/interfaces';
import http from '@/utils/http';
import TaiJiCanvas from '@/components/TaiJiCanvas.vue';
import GuaxiangDetails from '@/components/GuaxiangDetails.vue';

// 使用 ref 创建响应式数组
const gongDto = ref<GongDto>({ seq: 1, name: '', desc: '', guaList: [], ganList: [], zhiList: [] });
const error = ref<string | null>(null);
const currentGongSeq = ref<number>(1);

// 获取 Vue Router 实例
const router = useRouter();

// 提供 fetchGong 方法给子组件
provide('fetchGong', fetchGong);

// 计算属性去重 ganList
const uniqueGanList = computed(() => {
  const map = new Map();
  gongDto.value.ganList.forEach(item => {
    if (!map.has(item.code)) {
      map.set(item.code, item);
    }
  });
  return Array.from(map.values());
});

watch(gongDto, async (newGongDto) => {
    if(newGongDto.guaList.length > 0){
        navigateToAbout(newGongDto.guaList[0].code);
    }
}, { immediate: true }); 

// 获取卦宫数据
async function fetchGong(name: string) {
    try {
        const response = await http.get('/baseData/getByName/' + encodeURIComponent(name));
        gongDto.value = response.data;
        currentGongSeq.value = gongDto.seq;
    } catch (err) {
        error.value = err.message || 'Failed to fetch gans';
    }
}

function getGongLabel(gong: GongDto) {
    return `${gong.seq}-${gong.name}宫,属${gong.wx}：${gong.desc}`;
}

function getGanLabel(gan: GanDto) {
    return `${gan.name}(${gan.wx})`;
}

function getZhiLabel(zhi: ZhiDto) {
    return `${zhi.name}(${zhi.wx})`;
}

// 导航到关于页面
function navigateToAbout(gongSeq: number) {
    router.push({ name: 'About', params: { gongSeq } });
}

// 在组件挂载时获取数据
onMounted(() => {
    fetchGong("乾");
});
</script>

<style scoped>
.row {
    max-width: 98%;
    margin-left: 10px;
    margin-top: 10px;
}
</style>