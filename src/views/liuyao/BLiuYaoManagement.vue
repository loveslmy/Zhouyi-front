<template>
    <div>
        <!-- 查询表单 -->
        <el-form :model="searchForm" inline style="margin-top: 100px; margin-bottom: 50px; margin-left: 20px;">
            <el-form-item label="占卜事项">
                <el-input v-model="searchForm.name" placeholder="输入占卜事项"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="resetSearchForm">清空</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>
        
        <div style="margin-left: 20px;">
            <!-- 数据表格 -->
            <el-table :data="tableData" style="width: 90%;">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="matter" label="占卜事项" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryName" label="事项分类" show-overflow-tooltip></el-table-column>
                <el-table-column prop="symbol" label="摇卦信息" width="500"></el-table-column>
                <el-table-column prop="used" label="用神" width="150">
                    <template #default="scope">
                        {{ getUseOptionLabel(scope.row.used) }}
                    </template>
                </el-table-column>
                <el-table-column prop="usedName" label="用神类型" width="150">
                    <template #default="scope">
                        {{ getUseTypeLabel(scope.row.usedName) }}
                    </template>
                </el-table-column>
                <el-table-column prop="startTime" label="起卦时间" width="180">
                    <template #default="scope">
                        {{ formatDate(scope.row.startTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="案例类型" width="100">
                    <template #default="scope">
                        {{ scope.row.type === 1 ? '案例' : '实测' }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="currentPage"
                :page-size="pageSize" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
        </div>
        <!-- 新增/修改对话框 -->
        <el-dialog :title="dialogTitle" v-model="dialogVisible" width="50%" center>
            <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="占卜事项" prop="matter">
                    <el-input type="textarea" v-model="formData.matter" placeholder="请输入占卜事项" :rows="4"  style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="起卦时间" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="datetime" placeholder="选择日期时间" style="width: 240px"></el-date-picker>
                </el-form-item>
                <el-form-item label="事项分类" prop="categoryName">
                    <tree-select-dropdown v-model="formData.category" :tree-select-props="treeSelectProps"
                        placeholder="请选择分类" @node-click="onNodeSelected" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" :rows="4" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item v-for="(l,i) in yaoLabels" :label=l :key="i">
                    <YaoSelector v-model="yaos[i]" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="formData.type" placeholder="请选择类型" style="width: 240px">
                        <el-option label="案例" :value="1"></el-option>
                        <el-option label="实测" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择用神" prop="used">
                    <el-select v-model="formData.used" placeholder="请选择用神" style="width: 240px">
                        <el-option v-for="item in useOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="用神类型" prop="usedName">
                    <el-select v-model="formData.usedName" placeholder="请选择用神类型" style="width: 240px" >
                        <el-option v-for="item in useTypes" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="结论" prop="conclusion">
                    <el-input type="textarea" v-model="formData.conclusion" placeholder="请输入结论"  :rows="6" style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="24" style="text-align: center;">
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getAllBLiuYaos, addBLiuYao, updateBLiuYao, deleteBLiuYao } from '@/api/liuyao';
import { BLiuYao } from '@/model/interfaces';
import TreeSelectDropdown from '@/components/TreeSelectDropdown.vue';
import YaoSelector from '@/components/YaoSelector.vue'; 

interface SearchForm {
    name: string;
}

export default defineComponent({
    components: {
        TreeSelectDropdown,
        YaoSelector
    },
    data() {
        const useOptions = [
                { value: 0, label: '初爻' },
                { value: 1, label: '二爻' },
                { value: 2, label: '三爻' },
                { value: 3, label: '四爻' },
                { value: 4, label: '五爻' },
                { value: 5, label: '上爻' }
            ];

        const useOptionsMap = new Map(useOptions.map(option => [option.value, option.label]));

        const useTypes = [
                { value: '0', label: '爻' },
                { value: '1', label: '日' },
                { value: '2', label: '月' },
                { value: '3', label: '伏爻' }
            ];

        const useTypesMap = new Map(useTypes.map(option => [option.value, option.label]));

        return {
            searchForm: {
                name: ''
            } as SearchForm,
            tableData: [] as Array<BLiuYao>,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            dialogTitle: '',
            formData: {
                name: '',
                matter: '',
                symbol: '',
                used: 0,
                usedName: '',
                startTime: new Date(),
                type: 1,
                remark: '',
                conclusion: '',
                category: 0,
                categoryName: ''
            },
            treeSelectProps: {
                value: 'id',
                label: 'categoryName',
                children: 'children',
                checkStrictly: true,
                isLeaf: 'isLeaf'
            },
            yaos: ['', '', '', '', '', ''],
            rules: {
                matter: [{ required: true, message: '请输入占卜事项', trigger: 'blur' }],
                startTime: [{ required: true, message: '请输入起卦时间', trigger: 'blur' }],
                categoryName: [{ required: true, message: '请选择事项分类', trigger: 'blur' }]
            },
            useOptions: useOptions,
            useTypes: useTypes,
            yaoLabels: ['上爻', '五爻', '四爻', '三爻', '二爻', '初爻'],
            useOptionsMap: useOptionsMap,
            useTypesMap: useTypesMap
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await getAllBLiuYaos(this.currentPage, this.pageSize, undefined, this.searchForm.name);
                this.tableData = response.list;
                this.total = response.total;
            } catch (error) {
                console.error(error);
                ElMessage.error('获取数据失败');
            }
        },
        getUseOptionLabel(key: number): string | undefined {
            return this.useOptionsMap.get(key);
        },
        getUseTypeLabel(key: string): string | undefined {
            return this.useTypesMap.get(key);
        },
        handleSizeChange(newPageSize: number) {
            this.pageSize = newPageSize;
            this.fetchData();
        },
        handleCurrentChange(newPage: number) {
            this.currentPage = newPage;
            this.fetchData();
        },
        handleAdd() {
            this.dialogTitle = '新增';
            this.formData = {
                name: '',
                matter: '',
                symbol: '',
                used: -1,
                usedName: '',
                startTime: new Date(),
                type: 1,
                remark: '',
                conclusion: '',
                category: 0,
                categoryName: ''
            };
            this.dialogVisible = true;
        },
        handleDetail(index: number, row: BLiuYao){
            this.$router.push({ name: 'Detail', params: { id: row.id } });
        },

        handleEdit(index: number, row: BLiuYao) {
            this.dialogTitle = '编辑';
            this.formData = { ...row };
            this.yaos = this.formData.symbol.split(',').reverse();
            this.dialogVisible = true;
        },
        handleDelete(index: number, row: BLiuYao) {
            ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await deleteBLiuYao(row.id!);
                    ElMessage.success('删除成功!');
                    this.fetchData();
                } catch (error) {
                    console.error(error);
                    ElMessage.error('删除失败!');
                }
            }).catch(() => {
                ElMessage.info('已取消删除');
            });
        },
        submitForm(formName: string) {
            (this.$refs[formName] as any).validate(async (valid: boolean) => {
                if (valid) {
                    try {
                        for (let i = this.yaos.length-1; i >= 0; i--) {
                            if (this.yaos[i] === '') {
                                ElMessage.warning(`请为第`+ this.yaoLabels[i]+`选择一个值`);
                                return;
                            }
                        }
                        this.formData.symbol = this.yaos.reverse().join();
                        if (this.formData.id) {
                            // 更新操作
                            await updateBLiuYao(this.formData);
                            ElMessage.success('更新成功!');
                        } else {
                            // 新增操作
                            await addBLiuYao(this.formData);
                            ElMessage.success('新增成功!');
                        }
                        this.dialogVisible = false;
                        this.fetchData();
                    } catch (error) {
                        console.error(error);
                        ElMessage.error('操作失败!');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        formatDate(date: Date): string {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        resetSearchForm() {
            this.searchForm.name = '';
            this.fetchData(); // 清空后重新获取数据
        },
        onNodeSelected(node: any) {
            this.formData.category = node.id;
            this.formData.categoryName = node.categoryName;
        }
    },
    created() {
        this.fetchData();
    }
});
</script>