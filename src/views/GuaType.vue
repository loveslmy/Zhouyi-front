<template>
  <div>
    <h1>卦类型示例</h1>
    <p>当前卦类型（名称）: {{ currentGuaTypeByName }}</p>
    <button @click="changeGuaTypeByName('本')">切换到本卦</button>
    <button @click="changeGuaTypeByName('变')">切换到变卦</button>
    <button @click="changeGuaTypeByName('互')">切换到互卦</button>

    <p>当前卦类型（编码）: {{ currentGuaTypeByCode }}</p>
    <button @click="changeGuaTypeByCode(0)">切换到本卦 (代码)</button>
    <button @click="changeGuaTypeByCode(1)">切换到变卦 (代码)</button>
    <button @click="changeGuaTypeByCode(2)">切换到互卦 (代码)</button>

    <h2>所有卦类型</h2>
    <ul>
      <li v-for="(guaType, key) in allGuaTypes" :key="key">{{ key }}: {{ guaType }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { GuaType, getGuaTypeByName, getGuaTypeByCode, getAllGuaTypes } from '@/model/enums/GuaType';

// 使用名称管理卦类型
const currentGuaTypeByName = ref(GuaType.ORIGIN);

const changeGuaTypeByName = (name) => {
  try {
    currentGuaTypeByName.value = getGuaTypeByName(name);
  } catch (error) {
    console.error(error.message);
  }
};

// 使用编码管理卦类型
const currentGuaTypeByCode = ref(GuaType.ORIGIN);

const changeGuaTypeByCode = (code) => {
  try {
    currentGuaTypeByCode.value = getGuaTypeByCode(code);
  } catch (error) {
    console.error(error.message);
  }
};

// 获取所有卦类型
const allGuaTypes = getAllGuaTypes();
</script>