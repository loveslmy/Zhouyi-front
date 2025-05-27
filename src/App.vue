<template>
  <div style="overflow: auto; height: 98vh; display: flex;">
    <el-container>
      <el-header>
        <div>
          <h2>周易</h2>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeIndex" class="el-menu-vertical" @select="handleSelect">
            <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
              {{ item.name }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <el-page-header @back="goBack" style="padding-bottom: 1%;">

              <template #content>
                <span class="text-large font-600 mr-3"> {{ title }} </span>
              </template>
            </el-page-header>
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      title: '',
      activeIndex: '1',
      menuItems: [
        { index: '/taiji', name: '六十四卦' },
        { index: '/category', name: '分类管理' },
        { index: '/liuyao', name: '六爻' },
        { index: '/test2', name: '万年历' },
        { index: '/gan-zhi', name: '天干地支' },
        { index: '/about/1', name: '五行' },
        { index: '/guaType', name: '卦类型' },
        { index: '/qin', name: '六亲' },
        { index: '/role', name: '爻神' },
        { index: '/yao', name: '爻状态' },
        { index: '/shen', name: '六神' },
        { index: '/test2', name: 'Test2' },
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.back(); // 返回上一页
    },
    handleSelect(key) {
      const selectedItem = this.menuItems.find(item => item.index === key);
      if (selectedItem) {
        this.title = selectedItem.name;
        this.$router.push(key); // 根据选择的菜单项索引导航到相应的路由
      }
    },
  }
};

</script>
