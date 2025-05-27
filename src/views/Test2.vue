<template>
  <div>
    <el-form :model="queryParams" ref="queryForm" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="年干" prop="yearHeavenlyStem">
            <el-select v-model="queryParams.yearHeavenlyStem" placeholder="请选择年干">
              <el-option
                v-for="item in heavenlyStems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年支" prop="yearEarthlyBranch">
            <el-select v-model="queryParams.yearEarthlyBranch" placeholder="请选择年支">
              <el-option
                v-for="item in earthlyBranches"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月干" prop="monthHeavenlyStem">
            <el-select v-model="queryParams.monthHeavenlyStem" placeholder="请选择月干">
              <el-option
                v-for="item in heavenlyStems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月支" prop="monthEarthlyBranch">
            <el-select v-model="queryParams.monthEarthlyBranch" placeholder="请选择月支">
              <el-option
                v-for="item in earthlyBranches"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="日干" prop="dayHeavenlyStem">
            <el-select v-model="queryParams.dayHeavenlyStem" placeholder="请选择日干">
              <el-option
                v-for="item in heavenlyStems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日支" prop="dayEarthlyBranch">
            <el-select v-model="queryParams.dayEarthlyBranch" placeholder="请选择日支">
              <el-option
                v-for="item in earthlyBranches"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="handleQuery">查询</el-button>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="gregorian" label="公历日期"></el-table-column>
      <el-table-column prop="yearHeavenlyStem" label="年干"></el-table-column>
      <el-table-column prop="yearEarthlyBranch" label="年支"></el-table-column>
      <el-table-column prop="monthHeavenlyStem" label="月干"></el-table-column>
      <el-table-column prop="monthEarthlyBranch" label="月支"></el-table-column>
      <el-table-column prop="dayHeavenlyStem" label="日干"></el-table-column>
      <el-table-column prop="dayEarthlyBranch" label="日支"></el-table-column>
      <el-table-column prop="sortOrder" label="排序"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import http from '../utils/http';

export default defineComponent({
  data() {
    return {
      queryParams: {
        yearHeavenlyStem: null,
        yearEarthlyBranch: null,
        monthHeavenlyStem: null,
        monthEarthlyBranch: null,
        dayHeavenlyStem: null,
        dayEarthlyBranch: null
      },
      tableData: [],
      // 定义选项
      heavenlyStems: [
        { value: '甲', label: '甲' },
        { value: '乙', label: '乙' },
        { value: '丙', label: '丙' },
        { value: '丁', label: '丁' },
        { value: '戊', label: '戊' },
        { value: '己', label: '己' },
        { value: '庚', label: '庚' },
        { value: '辛', label: '辛' },
        { value: '壬', label: '壬' },
        { value: '癸', label: '癸' }
      ],
      earthlyBranches: [
        { value: '子', label: '子' },
        { value: '丑', label: '丑' },
        { value: '寅', label: '寅' },
        { value: '卯', label: '卯' },
        { value: '辰', label: '辰' },
        { value: '巳', label: '巳' },
        { value: '午', label: '午' },
        { value: '未', label: '未' },
        { value: '申', label: '申' },
        { value: '酉', label: '酉' },
        { value: '戌', label: '戌' },
        { value: '亥', label: '亥' }
      ]
    };
  },
  methods: {
    async handleQuery() {
      try {
        const response = await http.post('/baseData/queryGanZhiCalendarList', this.queryParams);
        this.tableData = response;
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  }
});
</script>

<style scoped>
/* 添加一些样式 */
</style>