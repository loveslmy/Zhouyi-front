<template>
    <div class="custom-tree-container">
      <el-tree :data="categories" node-key="id" default-expand-all :expand-on-click-node="false" :load="loadNode" lazy :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-link @click.stop="add(data)" type="primary">添加</el-link>
              <el-link style="margin-left: 10px" @click.stop="remove(node, data)" type="primary">删除</el-link>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { getCategoryData, deleteCategory } from '@/api/category';
  
  // 树节点的默认属性配置
  const defaultProps = {
    children: 'children',
    label: 'categoryName', // 使用 categoryName 作为节点标签
  };
  
  // 数据源
  const categories = ref([]);
  
  // 加载顶级分类数据
  const loadCategories = () => {
    getCategoryData().then(response => {
      categories.value = response.data;
    }).catch(error => {
      console.error('Failed to load categories:', error);
    });
  };
  
  // 懒加载子节点
  const loadNode = (node, resolve) => {
    if (node.level === 0) {
      // 加载顶级节点
      getCategoryData().then(response => {
        resolve(response.data);
      }).catch(error => {
        console.error('Failed to load top-level categories:', error);
        resolve([]); // 返回空数组以防错误导致界面卡死
      });
    } else {
      // 加载子节点
      const parentId = node.data.id;
      getCategoryData(parentId).then(response => {
        resolve(response.data);
      }).catch(error => {
        console.error(`Failed to load children for node ${parentId}:`, error);
        resolve([]); // 返回空数组以防错误导致界面卡死
      });
    }
  };
  
  // 编辑操作
  const emit = defineEmits(['edit']);
  const edit = (data) => {
    // 触发编辑事件并传递当前节点数据给父组件
    emit('edit', data);
  };
  
  const add = (data) => {
    edit({
      id: null,
      parentId: data.id,
      categoryName: '',
      categorySlug: '',
      description: '',
      sortOrder: 0
    });
  };
  
  // 删除操作
  const remove = (node, data) => {
    if (data.parentId === 0) {
      ElMessage({
        type: 'warning',
        message: '无法删除根节点'
      });
      return;
    }
    if(!node.isLeaf){
        ElMessage({
        type: 'warning',
        message: '请删除子节点'
      });
      return;
    }
    ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleteCategory(data.id).then(() => {
        loadCategories();
        ElMessage({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(error => {
        console.error('Failed to delete category:', error);
        ElMessage.error('删除失败，请重试');
      });
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      });
    });
  };
  
  // 点击树节点时显示当前节点信息
  const handleNodeClick = (data) => {
    edit(data);
  };
  
  onMounted(() => {
    loadCategories();
  });
  
  defineExpose({
    loadCategories
  });
  </script>
  
  <style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  </style>
  
  
  
  