# 施小雅板材 - CloudBase 部署完整指南

## 🎯 项目概述

已成功整合施小雅板材项目到腾讯云CloudBase平台：

- ✅ **前端**: React + Vite + Tailwind CSS
- ✅ **后端**: CloudBase云函数 + 数据库
- ✅ **配置**: 完整的环境配置和API封装
- ✅ **页面**: 首页、产品页、询价页等核心功能

## 🚀 快速部署步骤

### 1. 创建CloudBase环境

1. 访问腾讯云CloudBase控制台：https://tcb.cloud.tencent.com/dev
2. 点击"创建环境"
3. 选择环境名称和计费方式
4. 记录环境ID（如：shixiaoya-xxx）

### 2. 安装CloudBase CLI

```bash
npm install -g @cloudbase/cli
```

### 3. 登录CloudBase

```bash
cloudbase login
```

### 4. 配置环境变量

编辑 `.env` 文件，替换为您的环境ID：

```bash
VITE_TCB_ENV_ID=your-env-id-here
VITE_TCB_REGION=ap-shanghai
VITE_API_BASE_URL=https://your-env-id-here.service.tcloudbase.com
```

### 5. 初始化数据库

使用TCB工具创建数据库集合：

```bash
# 创建产品分类集合
cloudbase db:createCollection categories

# 创建产品集合
cloudbase db:createCollection products

# 创建询价集合
cloudbase db:createCollection inquiries

# 创建案例集合
cloudbase db:createCollection cases

# 创建用户集合
cloudbase db:createCollection users
```

### 6. 部署云函数

```bash
# 进入云函数目录
cd cloudfunctions/shixiaoya-api

# 安装依赖
npm install

# 返回项目根目录
cd ../..

# 部署云函数
cloudbase functions:deploy shixiaoya-api --dir ./cloudfunctions/shixiaoya-api
```

### 7. 构建并部署前端

```bash
# 构建前端项目
npm run build

# 部署到静态网站托管
cloudbase hosting:deploy dist -e production
```

### 8. 配置HTTP访问服务

在CloudBase控制台中：
1. 进入"云函数" -> "HTTP访问服务"
2. 创建HTTP服务，绑定shixiaoya-api函数
3. 记录访问域名

## 📊 数据库初始化

### 创建示例数据

可以使用以下脚本初始化一些示例数据：

```javascript
// 在CloudBase控制台的数据库管理中执行

// 创建产品分类
db.collection('categories').add({
  name: '实木板材',
  slug: 'solid-wood',
  description: '优质实木板材，环保健康',
  sort: 1,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// 创建示例产品
db.collection('products').add({
  name: '优质橡木板',
  slug: 'oak-board',
  description: '进口橡木制作，质地坚硬，纹理美观',
  price: 299.00,
  originalPrice: 399.00,
  images: ['/images/oak-board.jpg'],
  categoryId: 'category-id-here',
  isHot: true,
  isNew: false,
  stock: 100,
  sort: 1,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## 🔧 本地开发

### 启动开发服务器

```bash
npm run dev
```

### 本地测试云函数

```bash
# 安装云函数依赖
cd cloudfunctions/shixiaoya-api
npm install

# 本地调试云函数
cloudbase functions:invoke shixiaoya-api --params '{"httpMethod":"GET","path":"/api/health"}'
```

## 🔒 安全配置

### 数据库安全规则

在CloudBase控制台设置数据库安全规则：

```javascript
// 产品和分类 - 公开读取，认证写入
{
  "read": true,
  "write": "auth.uid != null"
}

// 询价 - 公开写入，认证读取
{
  "read": "auth.uid != null",
  "write": true
}
```

### 云函数环境变量

在云函数配置中添加环境变量：
- `NODE_ENV`: production
- `TCB_ENV_ID`: 您的环境ID

## 📈 性能优化

### 1. 静态资源CDN

CloudBase自动为静态资源提供CDN加速。

### 2. 数据库索引

为常用查询字段创建索引：
- products: categoryId, isActive, sort
- inquiries: status, createdAt
- cases: isActive, sort

### 3. 云函数优化

- 内存配置：512MB
- 超时时间：60秒
- 并发限制：100

## 🛠️ 运维管理

### 查看日志

```bash
# 查看云函数日志
cloudbase functions:log shixiaoya-api

# 查看访问日志
cloudbase hosting:detail
```

### 数据备份

```bash
# 导出数据库
cloudbase db:export --collection-name products --file products.json
```

### 监控告警

在CloudBase控制台配置：
- 函数执行时间告警
- 数据库连接数告警
- 静态资源访问量监控

## 🌐 域名配置

### 绑定自定义域名

1. 在CloudBase控制台进入"静态网站托管"
2. 点击"设置" -> "域名管理"
3. 添加自定义域名
4. 配置DNS解析
5. 申请SSL证书

## 📞 技术支持

### 常见问题

1. **云函数调用失败**
   - 检查环境ID配置
   - 确认函数部署成功
   - 查看函数日志

2. **数据库连接失败**
   - 检查安全规则配置
   - 确认集合已创建
   - 验证数据格式

3. **静态资源加载失败**
   - 检查构建输出目录
   - 确认部署成功
   - 验证CDN配置

### 联系方式

- CloudBase官方文档：https://docs.cloudbase.net/
- 技术支持QQ群：601134960
- GitHub Issues：https://github.com/TencentCloudBase

---

## 🎉 部署完成

部署成功后，您可以通过以下地址访问：

- **网站地址**: https://your-env-id.tcloudbaseapp.com
- **API地址**: https://your-env-id.service.tcloudbase.com/shixiaoya-api
- **管理控制台**: https://console.cloud.tencent.com/tcb

恭喜！您的施小雅板材网站已成功部署到腾讯云CloudBase平台！