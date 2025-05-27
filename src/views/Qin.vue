<template>
    <div>
      <h1>六亲示例</h1>
      <p>当前六亲: {{ currentQin }}</p>
      <button @click="changeQinByName('未设置')">切换到未设置</button>
      <button @click="changeQinByName('父母')">切换到父母</button>
      <button @click="changeQinByName('子孙')">切换到子孙</button>
      <button @click="changeQinByName('兄弟')">切换到兄弟</button>
      <button @click="changeQinByName('妻财')">切换到妻财</button>
      <button @click="changeQinByName('官鬼')">切换到官鬼</button>
  
      <p>父级六亲: {{ fuQin }}</p>
      <p>子级六亲: {{ ziQin }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Qin, getQinByName, getFu, getZi } from '@/model/enums/Qin';
  
  // 使用名称管理六亲
  const currentQin = ref(Qin.FU_MU);
  
  const changeQinByName = (name) => {
    const qin = getQinByName(name);
    if (qin) {
      currentQin.value = qin;
    } else {
      console.error(`Invalid name: ${name}`);
    }
  };
  
  // 获取父级和子级六亲
  const fuQin = ref(getFu(currentQin.value));
  const ziQin = ref(getZi(currentQin.value));
  
  watch(currentQin, (newVal) => {
    fuQin.value = getFu(newVal);
    ziQin.value = getZi(newVal);
  });
  </script>