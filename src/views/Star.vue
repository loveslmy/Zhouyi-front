<script lang="ts" setup>
import { ref, onMounted} from 'vue';
import http from '../utils/http';

// 定义 StarVo 接口
interface StarVo {
  name: string;
  position: string;
  description: string;
}

// 使用 ref 创建响应式数组
const starVos = ref <StarVo[]>([]);
const error = ref<string | null>(null);

// 获取星星列表
async function fetchStars() {
  try {
    const response = await http.get('/star/query');
    starVos.value = response.data;
  } catch (err) {
    error.value = err.message || 'Failed to fetch stars';
  }
}

// 在组件挂载时获取星星列表
onMounted(() => {
  fetchStars();
});
</script>

<template>
  <div>
    <!-- 遍历并显示 starVos -->
    <el-text class="mx-1" v-for="(star, index) in starVos" :key="index" style="padding-right: 1%;" type="primary">
      {{ index+1 }} - {{ star.name }} - {{ star.position }}
    </el-text>
    <!-- 如果有错误信息，则显示 -->
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>
