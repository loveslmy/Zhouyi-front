<template>
    <div>
      <!-- 遍历并显示 starVos -->
      <el-text style="padding-right:10px;" type="primary" tag="b" size="large">星煞：</el-text>
      <template v-for="(star, index) in starVos" :key="index">
        <el-tooltip class="box-item"
                :content="star.description"
                raw-content
                placement="top-start">
        <el-text class="mx-1"  type="primary" tag="b">
          {{ index + 1 }} - {{ star.name }} - {{ star.position }}
        </el-text>
      </el-tooltip>
      </template>


      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  import http from '../utils/http';
  
  // 定义 StarVo 接口
  interface StarVo {
    name: string;
    position: string;
    description: string;
  }
  
  // 使用 props 接收 date 参数
  const props = defineProps<{
    date: string;
  }>();
  
  // 使用 ref 创建响应式数组
  const starVos = ref<StarVo[]>([]);
  const error = ref<string | null>(null);
  
  // 获取星星列表
  async function fetchStars(date: string) {
    try {
      const response = await http.get('/star/query', {
        params: {
         dateStr: date,
        },
      });
      starVos.value = response.data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch stars';
    }
  }
  
  // 监听 date 变化并重新获取数据
  watch(() => props.date, (newDate) => {
    if (newDate) {
      fetchStars(newDate);
    }
  }, { immediate: true }); // 立即执行一次以处理初始值
  </script>
  
  <style scoped>
  /* 添加一些样式 */
  .mx-1 {
    margin-right: 8px;
  }
  </style>