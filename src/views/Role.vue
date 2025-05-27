<template>
    <div>
      <h1>爻神示例</h1>
      <p>当前爻神（名称）: {{ currentRoleByName }}</p>
      <button @click="changeRoleByName('初')">切换到初爻</button>
      <button @click="changeRoleByName('二')">切换到二爻</button>
      <button @click="changeRoleByName('三')">切换到三爻</button>
      <button @click="changeRoleByName('四')">切换到四爻</button>
      <button @click="changeRoleByName('五')">切换到五爻</button>
      <button @click="changeRoleByName('上')">切换到上爻</button>
      <button @click="changeRoleByName('用神')">切换到用神</button>
      <button @click="changeRoleByName('原神')">切换到原神</button>
      <button @click="changeRoleByName('忌神')">切换到忌神</button>
      <button @click="changeRoleByName('仇神')">切换到仇神</button>
      <button @click="changeRoleByName('伏神')">切换到伏神</button>
      <button @click="changeRoleByName('飞神')">切换到飞神</button>
      <button @click="changeRoleByName('世爻')">切换到世爻</button>
      <button @click="changeRoleByName('应爻')">切换到应爻</button>
      <button @click="changeRoleByName('动爻')">切换到动爻</button>
      <button @click="changeRoleByName('暗动')">切换到暗动</button>
      <button @click="changeRoleByName('变爻')">切换到变爻</button>
  
      <p>当前爻神（编码）: {{ currentRoleByCode }}</p>
      <button @click="changeRoleByCode(0)">切换到初爻 (代码)</button>
      <button @click="changeRoleByCode(1)">切换到二爻 (代码)</button>
      <button @click="changeRoleByCode(2)">切换到三爻 (代码)</button>
      <button @click="changeRoleByCode(3)">切换到四爻 (代码)</button>
      <button @click="changeRoleByCode(4)">切换到五爻 (代码)</button>
      <button @click="changeRoleByCode(5)">切换到上爻 (代码)</button>
      <button @click="changeRoleByCode(6)">切换到用神 (代码)</button>
      <button @click="changeRoleByCode(7)">切换到原神 (代码)</button>
      <button @click="changeRoleByCode(8)">切换到忌神 (代码)</button>
      <button @click="changeRoleByCode(9)">切换到仇神 (代码)</button>
      <button @click="changeRoleByCode(10)">切换到伏神 (代码)</button>
      <button @click="changeRoleByCode(11)">切换到飞神 (代码)</button>
      <button @click="changeRoleByCode(12)">切换到世爻 (代码)</button>
      <button @click="changeRoleByCode(13)">切换到应爻 (代码)</button>
      <button @click="changeRoleByCode(14)">切换到动爻 (代码)</button>
      <button @click="changeRoleByCode(15)">切换到暗动 (代码)</button>
      <button @click="changeRoleByCode(16)">切换到变爻 (代码)</button>
  
      <h2>所有爻神</h2>
      <ul>
        <li v-for="(role, key) in allRoles" :key="key">{{ key }}: {{ role.cnName }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Role, getRoleByName, getRoleByCode, getAllRoles } from '@/model/enums/Role';
  
  // 使用名称管理爻神
  const currentRoleByName = ref(Role.ONE_YAO);
  
  const changeRoleByName = (name) => {
    const role = getRoleByName(name);
    if (role) {
      currentRoleByName.value = role;
    } else {
      console.error(`Invalid name: ${name}`);
    }
  };
  
  // 使用编码管理爻神
  const currentRoleByCode = ref(Role.ONE_YAO);
  
  const changeRoleByCode = (code) => {
    const role = getRoleByCode(code);
    if (role) {
      currentRoleByCode.value = role;
    } else {
      console.error(`Invalid code: ${code}`);
    }
  };
  
  // 获取所有爻神
  const allRoles = getAllRoles();
  </script>