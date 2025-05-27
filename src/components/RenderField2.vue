<template>
    <el-col :span="6">
      <el-text class="title" tag="b">{{ label }}</el-text>
      <el-tooltip v-if="content && content.length > tranLength" class="box-item" effect="dark" :content="content" placement="top-start">
        <el-text class="ele" size="small">{{ truncatedContent() }}</el-text>
      </el-tooltip>
      <el-text v-else class="ele" size="small">{{ content }}</el-text>
    </el-col>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import _ from 'lodash';
  const tranLength = 28;
  export default defineComponent({
    name: 'RenderField',
    props: {
      label: String,
      content: String
    },
    methods: {
      truncatedContent() {
        return _.truncate(this.content, { length: tranLength });
      }
    },
    setup() {
      return { tranLength };
    }
  });
  </script>
  
  <style scoped>
  .title {
    padding-left: 35px;
  }
  
  .ele {
    padding-left: 10px;
  }
  
  .box-item {
    display: inline-block;
  }
  </style>