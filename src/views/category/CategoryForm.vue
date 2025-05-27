<template>
  <el-form ref="form" :model="category" label-width="100px">
    <el-form-item label="父分类">
      <tree-select-dropdown v-model="category.parentId" :tree-select-props="treeSelectProps" placeholder="请选择父分类" />
    </el-form-item>
    <el-form-item label="分类名称">
      <el-input v-model="category.categoryName"></el-input>
    </el-form-item>
    <el-form-item label="分类 Slug">
      <el-input v-model="category.categorySlug"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea" v-model="category.description"></el-input>
    </el-form-item>
    <el-form-item label="排序权重">
      <el-input-number v-model="category.sortOrder" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveCategory">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addCategory, updateCategory} from '@/api/category';
import TreeSelectDropdown from '@/components/TreeSelectDropdown.vue';

export default {
  name: 'CategoryForm',
  components: {
    TreeSelectDropdown
  },
  props: {
    isEdit: Boolean,
    initialData: Object
  },
  data() {
    return {
      category: {
        id: null,
        parentId: null,
        categoryName: '',
        categorySlug: '',
        description: '',
        sortOrder: 0,
      },
      treeSelectProps: {
        value: 'id',
        label: 'categoryName',
        children: 'children',
        checkStrictly: true,
        isLeaf: 'isLeaf'
      }
    };
  },
  watch: {
    initialData(val) {
      if (val) {
        this.category = { ...val };
        this.category.parentId = val.parentId || null;
      }
    }
  },
  methods: {
    async saveCategory() {
      try {
        if(this.category.id){
          const response = await updateCategory(this.category);
          this.$message.success('保存成功');
          const newCategory = response.data; // 假设 API 返回新创建的分类数据
          this.$emit('add', newCategory); // 传递新分类数据给父组件
        }else{
          const response = await addCategory(this.category);
          this.$message.success('添加成功');
          const newCategory = response.data; // 假设 API 返回新创建的分类数据
          this.$emit('add', newCategory); // 传递新分类数据给父组件
        }
        this.resetForm();
      } catch (error) {
        this.$message.error('保存失败，请重试');
      }
    },
    resetForm() {
      this.category = {
        id: null,
        parentId: null,
        categoryName: '',
        categorySlug: '',
        description: '',
        sortOrder: 0,
      };
      this.$refs.form.resetFields();
    }
  },
  mounted() {
    // 如果是编辑模式，初始化数据
    if (this.initialData) {
      this.category = { ...this.initialData };
      this.category.parentId = this.initialData.parentId || null;
    }
  }
};
</script>
