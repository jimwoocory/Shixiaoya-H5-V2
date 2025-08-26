import tcb from '@cloudbase/js-sdk';

// CloudBase 配置
const cloudbaseConfig = {
  env: import.meta.env.VITE_TCB_ENV_ID || 'your-env-id',
  region: import.meta.env.VITE_TCB_REGION || 'ap-shanghai'
};

// 初始化 CloudBase
const app = tcb.init(cloudbaseConfig);

// 获取服务实例
export const db = app.database();
export const auth = app.auth();
export const storage = app.storage();

// API 基础配置
export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || `https://${cloudbaseConfig.env}.service.tcloudbase.com`,
  timeout: 10000
};

// 统一的 API 请求封装
class ApiClient {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    // 添加认证 token
    const loginState = auth.hasLoginState();
    if (loginState) {
      config.headers.Authorization = `Bearer ${loginState.uid}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '请求失败');
      }

      return data.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  get(endpoint, params) {
    const url = params 
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;
    return this.request(url, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// 导出 API 客户端实例
export const api = new ApiClient(apiConfig);

// 业务 API 封装
export const productApi = {
  getProducts: (params) => api.get('/api/products', params),
  getProduct: (id) => api.get(`/api/products/${id}`),
  createProduct: (data) => api.post('/api/products', data),
  updateProduct: (id, data) => api.put(`/api/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/api/products/${id}`)
};

export const categoryApi = {
  getCategories: () => api.get('/api/categories'),
  createCategory: (data) => api.post('/api/categories', data)
};

export const inquiryApi = {
  createInquiry: (data) => api.post('/api/inquiries', data),
  getInquiries: (params) => api.get('/api/inquiries', params)
};

export const caseApi = {
  getCases: (params) => api.get('/api/cases', params),
  getCase: (id) => api.get(`/api/cases/${id}`)
};

export default app;