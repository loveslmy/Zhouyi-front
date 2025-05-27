<template>
    <el-tree-select
      v-model="selectedValue"
      lazy
      :load="lazyLoad"
      :props="treeSelectProps"
      :placeholder="placeholder"
      style="width: 240px"
    />
  </template>
  
  <script>
  import { getCategoryData } from '@/api/category';
  
  export default {
    name: 'TreeSelectDropdown',
    props: {
      value: [String, Number],
      treeSelectProps: Object,
      placeholder: String
    },
    data() {
      return {
        selectedValue: this.value
      };
    },
    watch: {
      value(newValue) {
        this.selectedValue = newValue;
      }
    },
    methods: {
      async lazyLoad(node, resolve) {
        const { level, data } = node;
  
        try {
          let response;
          if (level === 0) {
            response = await getCategoryData(); // 获取顶级分类
          } else {
            response = await getCategoryData(data.id); // 根据父节点ID获取子节点
          }
  
          const nodes = response.data.map(item => ({
            id: item.id,
            categoryName: item.categoryName,
            isLeaf: false // 判断是否为叶子节点
          }));
  
          resolve(nodes);
        } catch (error) {
          console.error('Failed to load categories:', error);
          resolve([]);
        }
      }
    }
  };
  </script>
  
  
  
  