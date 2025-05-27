import http from '@/utils/http';

/**
 * 分类管理 API 基础路径
 * @type {string}
 */
const CATEGORY_API_BASE_URL = '/categories';

/**
 * 分类数据结构
 * @typedef {Object} Category
 * @property {number} id - 分类ID
 * @property {string} name - 分类名称
 * @property {number} parentId - 父分类ID
 * @property {number} sort - 排序值
 * @property {string} description - 分类描述
 */

/**
 * 获取分类数据
 * @param {number} [parentId] - 父分类ID，不传则获取顶级分类
 * @returns {Promise<Category[]>} 分类数据列表
 */
export const getCategoryData = async (parentId) => {
    try {
        const params = parentId ? { parentId } : {};
        const { data } = await http.get(`${CATEGORY_API_BASE_URL}/data`, { params });
        return data;
    } catch (error) {
        console.error('获取分类数据失败:', error);
        throw new Error('获取分类数据失败，请稍后重试');
    }
};

/**
 * 添加分类
 * @param {Category} category - 分类信息
 * @returns {Promise<Category>} 新创建的分类
 */
export const addCategory = async (category) => {
    try {
        const { data } = await http.post(`${CATEGORY_API_BASE_URL}/add`, category);
        return data;
    } catch (error) {
        console.error('添加分类失败:', error);
        throw new Error('添加分类失败，请稍后重试');
    }
};

/**
 * 更新分类
 * @param {Category} category - 要更新的分类信息
 * @returns {Promise<Category>} 更新后的分类
 */
export const updateCategory = async (category) => {
    try {
        const { data } = await http.put(`${CATEGORY_API_BASE_URL}/update`, category);
        return data;
    } catch (error) {
        console.error('更新分类失败:', error);
        throw new Error('更新分类失败，请稍后重试');
    }
};

/**
 * 删除分类
 * @param {number} id - 要删除的分类ID
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id) => {
    try {
        await http.delete(`${CATEGORY_API_BASE_URL}/delete/${id}`);
    } catch (error) {
        console.error('删除分类失败:', error);
        throw new Error('删除分类失败，请稍后重试');
    }
};

/**
 * 根据ID获取分类详情
 * @param {number} id - 分类ID
 * @returns {Promise<Category>} 分类详情
 */
export const getCategoryById = async (id) => {
    try {
        const { data } = await http.get(`${CATEGORY_API_BASE_URL}/getById/${id}`);
        return data;
    } catch (error) {
        console.error('获取分类详情失败:', error);
        throw new Error('获取分类详情失败，请稍后重试');
    }
};