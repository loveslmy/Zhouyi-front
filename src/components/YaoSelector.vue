<template>
    <div>
      <el-select v-model="selectedValue" clearable placeholder="Select" style="width: 360px">
        <el-option v-for="item in yaos" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; font-size: 11px;">
            {{item.labelRight }}
          </span>
        </el-option>
      </el-select>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  import _ from 'lodash';
  
  const props = defineProps<{
    modelValue: string;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const selectedValue = ref(props.modelValue);
  
  watch(
    () => props.modelValue,
    (newValue) => {
      selectedValue.value = newValue;
    }
  );
  
  watch(
    selectedValue,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
  );
  
  const yaos = [
    {
      value: '、',
      label: '▄▄▄▄▄',
      labelRight:'1个背2个字，称单为少阳，记作、'
    },
    {
      value: '、、',
      label: '▄▄　▄▄',
      labelRight:'2个背1个字，称拆为少阴，记作、、'
    },
    {
      value: 'O',
      label: '▄▄▄▄▄ O',
      labelRight:'3个背，称重为老阳，记作O'
    },
    {
      value: 'X',
      label: '▄▄　▄▄ X',
      labelRight:'3个字，称交为老阴，记作X'
    }
  ];
  </script>
  
  <style scoped>
  /* 自定义样式 */
  .yao-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  
  
  
  