const tcb = require('@cloudbase/node-sdk');

// 初始化云开发
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV
});

const db = app.database();

// 主函数入口
exports.main = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  
  try {
    // CORS 处理
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: ''
      };
    }

    // 路由处理
    const result = await handleRequest({
      method: httpMethod,
      path,
      query: queryStringParameters || {},
      body: body ? JSON.parse(body) : {},
      headers: headers || {}
    });
    
    return {
      statusCode: result.statusCode || 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(result.body)
    };
    
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message || '服务器内部错误'
      })
    };
  }
};

// 请求处理函数
async function handleRequest(request) {
  const { method, path, query, body } = request;
  
  // 产品相关API
  if (path === '/api/products' && method === 'GET') {
    return await getProducts(query);
  }
  
  if (path.startsWith('/api/products/') && method === 'GET') {
    const id = path.split('/')[3];
    return await getProduct(id);
  }
  
  if (path === '/api/products' && method === 'POST') {
    return await createProduct(body);
  }
  
  // 分类相关API
  if (path === '/api/categories' && method === 'GET') {
    return await getCategories();
  }
  
  if (path === '/api/categories' && method === 'POST') {
    return await createCategory(body);
  }
  
  // 询价相关API
  if (path === '/api/inquiries' && method === 'POST') {
    return await createInquiry(body);
  }
  
  if (path === '/api/inquiries' && method === 'GET') {
    return await getInquiries(query);
  }
  
  // 案例相关API
  if (path === '/api/cases' && method === 'GET') {
    return await getCases(query);
  }
  
  if (path.startsWith('/api/cases/') && method === 'GET') {
    const id = path.split('/')[3];
    return await getCase(id);
  }
  
  // 统计API
  if (path === '/api/stats' && method === 'GET') {
    return await getStats();
  }
  
  // 健康检查
  if (path === '/api/health' && method === 'GET') {
    return {
      statusCode: 200,
      body: {
        success: true,
        message: '服务运行正常',
        timestamp: new Date().toISOString()
      }
    };
  }
  
  // 404
  return {
    statusCode: 404,
    body: {
      success: false,
      error: '接口不存在'
    }
  };
}

// API处理函数

// 获取产品列表
async function getProducts(query) {
  try {
    const { category, page = 1, limit = 12, search, isHot } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let dbQuery = db.collection('products').where({ isActive: true });
    
    if (category) {
      dbQuery = dbQuery.where({ categoryId: category });
    }
    
    if (search) {
      dbQuery = dbQuery.where({
        name: db.RegExp({
          regexp: search,
          options: 'i'
        })
      });
    }
    
    if (isHot === 'true') {
      dbQuery = dbQuery.where({ isHot: true });
    }
    
    const result = await dbQuery
      .orderBy('sort', 'asc')
      .skip(skip)
      .limit(parseInt(limit))
      .get();
    
    const total = await dbQuery.count();
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: result.data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total.total,
          pages: Math.ceil(total.total / parseInt(limit))
        }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 获取产品详情
async function getProduct(id) {
  try {
    const result = await db.collection('products').doc(id).get();
    
    if (!result.data.length) {
      return {
        statusCode: 404,
        body: {
          success: false,
          error: '产品不存在'
        }
      };
    }
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: result.data[0]
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 创建产品
async function createProduct(data) {
  try {
    const productData = {
      ...data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').add(productData);
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: { id: result.id }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 获取分类列表
async function getCategories() {
  try {
    const result = await db.collection('categories')
      .where({ isActive: true })
      .orderBy('sort', 'asc')
      .get();
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: result.data
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 创建分类
async function createCategory(data) {
  try {
    const categoryData = {
      ...data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('categories').add(categoryData);
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: { id: result.id }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 创建询价
async function createInquiry(data) {
  try {
    const inquiryData = {
      ...data,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('inquiries').add(inquiryData);
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: { id: result.id }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 获取询价列表
async function getInquiries(query) {
  try {
    const { page = 1, limit = 20, status } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let dbQuery = db.collection('inquiries');
    
    if (status) {
      dbQuery = dbQuery.where({ status });
    }
    
    const result = await dbQuery
      .orderBy('createdAt', 'desc')
      .skip(skip)
      .limit(parseInt(limit))
      .get();
    
    const total = await dbQuery.count();
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: result.data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total.total,
          pages: Math.ceil(total.total / parseInt(limit))
        }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 获取案例列表
async function getCases(query) {
  try {
    const { page = 1, limit = 12 } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const result = await db.collection('cases')
      .where({ isActive: true })
      .orderBy('sort', 'asc')
      .skip(skip)
      .limit(parseInt(limit))
      .get();
    
    const total = await db.collection('cases')
      .where({ isActive: true })
      .count();
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: result.data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total.total,
          pages: Math.ceil(total.total / parseInt(limit))
        }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 获取案例详情
async function getCase(id) {
  try {
    const result = await db.collection('cases').doc(id).get();
    
    if (!result.data.length) {
      return {
        statusCode: 404,
        body: {
          success: false,
          error: '案例不存在'
        }
      };
    }
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: result.data[0]
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}

// 获取统计数据
async function getStats() {
  try {
    const [productsCount, inquiriesCount, casesCount] = await Promise.all([
      db.collection('products').where({ isActive: true }).count(),
      db.collection('inquiries').count(),
      db.collection('cases').where({ isActive: true }).count()
    ]);
    
    return {
      statusCode: 200,
      body: {
        success: true,
        data: {
          products: productsCount.total,
          inquiries: inquiriesCount.total,
          cases: casesCount.total
        }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
}