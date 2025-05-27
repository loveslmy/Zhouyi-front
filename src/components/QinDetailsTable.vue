<template>
  <el-tooltip placement="top-end" :disabled="!showTooltip">
    <template #content>
      <div class="tooltip-content">
        <table>
          <thead>
            <tr>
              <th>所占事项</th>
              <th>象征意义</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(detail, index) in filteredDetails" :key="index">
              <tr>
                <td>{{ detail.matter }}</td>
                <td>{{ detail.symbolicMeaning }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
    <!-- 触发 Tooltip 显示的元素 -->
    <div @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { BQinDetail } from '../model/interfaces';
import http from '../utils/http';

// 定义 Props
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const qinDetails = ref<BQinDetail[]>([]);
const showTooltip = ref(false);

// 计算属性，过滤出与当前名称相关的详情
const filteredDetails = computed(() => {
  return qinDetails.value.filter(detail => detail.qinName === props.name);
});

// 加载数据的方法
async function fetchData() {
  try {
    const response = await http.get(`/baseData/getQinDetails`);
    qinDetails.value = response.data;
  } catch (err) {
    console.error('Failed to fetch data:', err);
  }
}

onMounted(() => {
  fetchData();
});
</script>
