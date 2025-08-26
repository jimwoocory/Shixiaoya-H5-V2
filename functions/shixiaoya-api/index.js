const tcb = require('@cloudbase/node-sdk');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// 初始化云开发
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV
});

const db = app.database();
const auth = app.auth();

// 创建Express应用
const server = express();

// 中间件配置
server.use(helmet());
server.use(compression());
server.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 限流配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: '请求过于频繁，请稍后再试'
});
server.use('/api/', limiter);

// 认证中间件
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: '访问令牌缺失' });
    }

    const userInfo = await auth.getUserInfo({
      customUserId: token
    });
    
    req.user = userInfo;
    next();
  } catch (error) {
    return res.status(403).json({ error: '无效的访问令牌' });
  }
};

// API路由

// 产品分类相关
server.get('/api/categories', async (req, res) => {
  try {
    const result = await db.collection('categories')
      .where({ isActive: true })
      .orderBy('sort', 'asc')
      .get();
    
    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

server.post('/api/categories', authenticateToken, async (req, res) => {
  try {
    const { name, slug, description, image, sort } = req.body;
    
    const result = await db.collection('categories').add({
      name,
      slug,
      description,
      image,
      sort: sort || 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    res.json({
      success: true,
      data: { id: result.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 产品相关
server.get('/api/products', async (req, res) => {
  try {
    const { category, page = 1, limit = 12, search } = req.query;
    const skip = (page - 1) * limit;
    
    let query = db.collection('products').where({ isActive: true });
    
    if (category) {
      query = query.where({ categoryId: parseInt(category) });
    }
    
    if (search) {
      query = query.where({
        name: new RegExp(search, 'i')
      });
    }
    
    const result = await query
      .orderBy('sort', 'asc')
      .skip(skip)
      .limit(parseInt(limit))
      .get();
    
    const total = await query.count();
    
    res.json({
      success: true,
      data: result.data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.total,
        pages: Math.ceil(total.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

server.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('products').doc(id).get();
    
    if (!result.data.length) {
      return res.status(404).json({
        success: false,
        error: '产品不存在'
      });
    }
    
    res.json({
      success: true,
      data: result.data[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 询价相关
server.post('/api/inquiries', async (req, res) => {
  try {
    const { name, phone, email, company, message, products } = req.body;
    
    const inquiry = await db.collection('inquiries').add({
      name,
      phone,
      email,
      company,
      message,
      products: products || [],
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // 发送邮件通知（可选）
    // await sendInquiryNotification(inquiry.id, { name, phone, email, message });
    
    res.json({
      success: true,
      data: { id: inquiry.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

server.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const skip = (page - 1) * limit;
    
    let query = db.collection('inquiries');
    
    if (status) {
      query = query.where({ status });
    }
    
    const result = await query
      .orderBy('createdAt', 'desc')
      .skip(skip)
      .limit(parseInt(limit))
      .get();
    
    const total = await query.count();
    
    res.json({
      success: true,
      data: result.data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.total,
        pages: Math.ceil(total.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 案例相关
server.get('/api/cases', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;
    
    const result = await db.collection('cases')
      .where({ isActive: true })
      .orderBy('sort', 'asc')
      .skip(skip)
      .limit(parseInt(limit))
      .get();
    
    const total = await db.collection('cases')
      .where({ isActive: true })
      .count();
    
    res.json({
      success: true,
      data: result.data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.total,
        pages: Math.ceil(total.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 文件上传
server.post('/api/upload', authenticateToken, async (req, res) => {
  try {
    // 使用云开发存储
    const fileList = req.files;
    const uploadPromises = fileList.map(async (file) => {
      const result = await app.uploadFile({
        cloudPath: `uploads/${Date.now()}-${file.originalname}`,
        fileContent: file.buffer
      });
      return result.fileID;
    });
    
    const fileIds = await Promise.all(uploadPromises);
    
    res.json({
      success: true,
      data: { files: fileIds }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 统计数据
server.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const [productsCount, inquiriesCount, casesCount] = await Promise.all([
      db.collection('products').where({ isActive: true }).count(),
      db.collection('inquiries').count(),
      db.collection('cases').where({ isActive: true }).count()
    ]);
    
    res.json({
      success: true,
      data: {
        products: productsCount.total,
        inquiries: inquiriesCount.total,
        cases: casesCount.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 健康检查
server.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 错误处理中间件
server.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({
    success: false,
    error: '服务器内部错误'
  });
});

// 404处理
server.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在'
  });
});

// 云函数入口
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    const handler = server(event, context, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};