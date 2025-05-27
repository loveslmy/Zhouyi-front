<template>
    <div>
      <el-row>
        <el-col :span="6" style="max-width: 450px;">
            <el-card class="box-card">
            <template #header>
            <div class="card-header">
                <span>卦象图解：</span>
            </div>
            </template>
            <el-image v-if="imageSrc" :src="imageSrc" style="max-width: 400px;" />
        </el-card>
        </el-col>
        <el-col :span="17">
            <el-card class="box-card" style="margin-left: 32px;width: 93%;">
            <template #header>
            <div class="card-header">
                <span>卦辞：</span>
            </div>
            </template>
            <p style="padding-left: 10px;">{{ lyaoData.comment }}</p>
        </el-card>
        <el-card class="box-card" style="margin-left:32px; margin-top:10px;width: 93%; height: 415px;">
            <template #header>
            <div class="card-header">
                <span>爻辞：</span>
            </div>
            </template>
            <p style="padding-left: 10px;" v-for="listItem in parsedText(lyaoData.yaoComment).reverse()" :key="listItem">
            {{ listItem }}
          </p>
        </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
            <el-card class="box-card" style="margin-top:10px;width:85%;">
            <template #header>
            <div class="card-header">
                <span>万物类象：</span>
            </div>
            </template>
            <el-row>
                <render-field label="方位:" :content="lyaoData.direction" />
                <render-field label="时序:" :content="lyaoData.timeSequence" />
                <render-field label="字姓:" :content="lyaoData.surname" />
            </el-row>
            <el-row class="row">
                <render-field label="天时:" :content="lyaoData.heavenlyTiming" />
                <render-field label="婚姻:" :content="lyaoData.marriage" />
                <render-field label="出行:" :content="lyaoData.travel" />
            </el-row>
        
            <el-row class="row">
                <render-field label="五味:" :content="lyaoData.fiveTastes" />
                <render-field label="疾病:" :content="lyaoData.illness" />
                <render-field label="人物:" :content="lyaoData.characters" />
            </el-row>
        
            <el-row class="row">
                <render-field label="身体:" :content="lyaoData.bodyParts" />
                <render-field label="人事:" :content="lyaoData.personnelMatters" />
                <render-field label="地理:" :content="lyaoData.geography" />
            </el-row>
        
            <el-row class="row">
                <render-field label="官讼:" :content="lyaoData.lawsuits" />
                <render-field label="家宅:" :content="lyaoData.familyResidence" />
                <render-field label="坟墓:" :content="lyaoData.graves" />
            </el-row>
            <el-row class="row">
                <render-field label="求利:" :content="lyaoData.seekingProfit" />
                <render-field label="屋宿:" :content="lyaoData.houseResidence" />
                <render-field label="饮食:" :content="lyaoData.diet" />
            </el-row>
            <el-row class="row">
                <render-field label="生产:" :content="lyaoData.production" />
                <render-field label="求名:" :content="lyaoData.seekingFame" />
                <render-field label="谋旺:" :content="lyaoData.seekingProsperity" />
            </el-row>
            <el-row class="row">
                <render-field label="交易:" :content="lyaoData.transaction" />
                <render-field label="谒见:" :content="lyaoData.visiting" />
            </el-row>
        </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import http from '../utils/http';
  import _ from 'lodash';
  import RenderField from '../components/RenderField.vue'; // 导入 RenderField 组件
  
  // 定义 Props
  const props = defineProps({
    gongSeq: {
      type: Number,
      required: true
    }
  });
  
  // 获取当前路由对象
  const route = useRoute();
  const lyaoData = ref({});
  const imageSrc = ref(null);
  const tranLength = 18;
  
  // 计算属性，基于路由参数 gongSeq 获取动态 ID
  const dynamicId = computed(() => props.gongSeq || route.params.gongSeq || 'default');
  
  // 监听 dynamicId 的变化，并更新 imageSrc 和 lyaoData
  watch(dynamicId, async (newId) => {
    try {
      // 加载图片
      const module = await import(`@/assets/images/${newId}.png`);
      imageSrc.value = module.default;
  
      // 加载数据
      await fetchData(newId);
    } catch (error) {
      console.error('Failed to load dynamic image or data:', error);
      imageSrc.value = null; // 设置为 null 或默认图片路径
    }
  }, { immediate: true }); // 立即执行一次以加载初始图片
  
  // 加载数据的方法
  async function fetchData(gongSeq) {
    try {
      const response = await http.get(`/baseData/getById/${gongSeq}`);
      lyaoData.value = response.data;
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  }
  
  function parsedText(yaoComment) {
    if (!yaoComment) return [];
    // 使用正则表达式匹配每个爻辞
    const regex = /(?:初九|初六|六二|九二|六三|九三|六四|九四|六五|九五|上六|上九|用九|用六)：[^\n]*/g;
    const matches = yaoComment.match(regex);
  
    if (!matches) return [];
    // 使用 lodash 的 words 函数进一步处理每个爻辞
    return matches.map(line => _.words(line).join(''));
  }
  </script>
  
  <style scoped>
  .row {
    padding-top: 5px;
  }
  </style>