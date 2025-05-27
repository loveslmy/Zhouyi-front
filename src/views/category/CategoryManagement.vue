<template>
  <el-row>
    <el-col :span="6">
      <category-tree @edit="handleEdit" ref="categoryTree" />
    </el-col>
    <el-col :span="18">
      <category-form :is-edit="isEdit" :initial-data="selectedCategory" @submit="handleSubmit" />
    </el-col>
  </el-row>
</template>

<script>
import CategoryTree from './CategoryTree.vue';
import CategoryForm from './CategoryForm.vue';

export default {
  name: 'CategoryManagement',
  components: {
    CategoryTree,
    CategoryForm
  },
  data() {
    return {
      isEdit: false,
      selectedCategory: null
    };
  },
  methods: {
    handleEdit(category) {
      this.isEdit = true;
      this.selectedCategory = category;
    },
    handleSubmit(isAdd) {
      this.isEdit = false;
      this.selectedCategory = null;
      // 不管是添加还是更新，都刷新 CategoryTree
      this.$refs.categoryTree.loadCategories();
    }
  }
};
</script>



