import http from '@/utils/http';

const BLIU_YAO_API_BASE_URL = '/liuyao'; // 注意这里不需要再包含 `/api`，因为已经在 `http.js` 中配置了

// 获取所有 BLiuYao 记录（支持分页和查询参数）
export const getAllBLiuYaos = async (pageNum, pageSize, seq, name) => {
    const params = { pageNum, pageSize, seq, name };
    const response = await http.get(`${BLIU_YAO_API_BASE_URL}/getAll`, { params });
    return response;
};

// 根据 ID 获取单个 BLiuYao 记录
export const getBLiuYaoById = async (id) => {
    const response = await http.get(`${BLIU_YAO_API_BASE_URL}/getById/${id}`);
    return response;
};

// 新增一个 BLiuYao 记录
export const addBLiuYao = async (bLiuYao) => {
    const response = await http.post(`${BLIU_YAO_API_BASE_URL}/add`, bLiuYao);
    return response;
};

// 更新一个 BLiuYao 记录
export const updateBLiuYao = async (bLiuYao) => {
    const response = await http.put(`${BLIU_YAO_API_BASE_URL}/update`, bLiuYao);
    return response;
};

// 根据 ID 删除一个 BLiuYao 记录
export const deleteBLiuYao = async (id) => {
    const response = await http.delete(`${BLIU_YAO_API_BASE_URL}/deleteById/${id}`);
    return response;
};



