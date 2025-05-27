<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-row class="row">
            <render-field label="象征:" :content="eightTrigrams.deepSymbolism" />
            <render-field label="五行:" :content="eightTrigrams.fiveElements" />
            <render-field label="形状:" :content="eightTrigrams.shape" />
          </el-row>
          <el-row>
            <render-field label="天时:" :content="eightTrigrams.skyTime" />
            <render-field label="地理:" :content="eightTrigrams.geography" />
            <render-field label="人物:" :content="eightTrigrams.person" />
          </el-row>
          <el-row class="row">
            <render-field label="人事:" :content="eightTrigrams.personnelMatters" />
            <render-field label="身体:" :content="eightTrigrams.bodyPart" />
            <render-field label="时序:" :content="eightTrigrams.timeSequence" />
          </el-row>
          <el-row class="row">
            <render-field label="动物:" :content="eightTrigrams.animal" />
            <render-field label="静物:" :content="eightTrigrams.staticObject" />
            <render-field label="屋宿:" :content="eightTrigrams.houseResidence" />
          </el-row>
          <el-row class="row">
            <render-field label="家宅:" :content="eightTrigrams.familyResidence" />
            <render-field label="婚姻:" :content="eightTrigrams.marriage" />
            <render-field label="饮食:" :content="eightTrigrams.diet" />
          </el-row>
          <el-row class="row">
            <render-field label="生产:" :content="eightTrigrams.production" />
            <render-field label="求名:" :content="eightTrigrams.seekingFame" />
            <render-field label="求利:" :content="eightTrigrams.seekingProfit" />
          </el-row>
          <el-row class="row">
            <render-field label="交易:" :content="eightTrigrams.transaction" />
            <render-field label="出行:" :content="eightTrigrams.travel" />
            <render-field label="谒见:" :content="eightTrigrams.visiting" />
          </el-row>
          <el-row class="row">
            <render-field label="疾病:" :content="eightTrigrams.illness" />
            <render-field label="官讼:" :content="eightTrigrams.lawsuits" />
            <render-field label="坟墓:" :content="eightTrigrams.graves" />
          </el-row>
          <el-row class="row">
            <render-field label="姓氏:" :content="eightTrigrams.surname" />
            <render-field label="数目:" :content="eightTrigrams.number" />
            <render-field label="方道:" :content="eightTrigrams.direction" />
          </el-row>
          <el-row class="row">
            <render-field label="五色:" :content="eightTrigrams.color" />
            <render-field label="五味:" :content="eightTrigrams.taste" />
            <render-field label="职业:" :content="eightTrigrams.profession" />
          </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import http from '../utils/http';
import RenderField from '../components/RenderField.vue'; // 导入 RenderField 组件

// 定义 Props
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

// 获取当前路由对象
const route = useRoute();
const eightTrigrams = ref({});

// 计算属性，基于路由参数 id 获取动态 ID
const dynamicId = computed(() => props.id || route.params.id);

// 监听 dynamicId 的变化，并更新 eightTrigrams
watch(dynamicId, async (newId) => {
  try {
    // 加载数据
    await fetchData(newId);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
}, { immediate: true }); // 立即执行一次以加载初始数据

// 加载数据的方法
async function fetchData(id) {
  try {
    const response = await http.get(`/baseData/getEightById/${id}`);
    eightTrigrams.value = response.data;
  } catch (err) {
    console.error('Failed to fetch data:', err);
  }
}
</script>

<style scoped>
.row {
  padding-top: 10px;
}
</style>