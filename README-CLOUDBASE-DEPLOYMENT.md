# 施小雅板材 - 腾讯云CloudBase部署指南

## 📋 部署概览

本项目采用腾讯云CloudBase全栈解决方案，实现前后端一体化部署：

- **前端**: React + Vite + TypeScript，部署到CloudBase静态网站托管
- **后端**: Node.js + Express，部署为CloudBase云函数
- **数据库**: CloudBase数据库（NoSQL）
- **存储**: CloudBase云存储
- **认证**: CloudBase身份认证

## 🚀 快速部署

### 1. 环境准备

```bash
# 安装CloudBase CLI
npm install -g @cloudbase/cli

# 登录腾讯云
cloudbase login

# 创建环境（在控制台完成）
# 访问: https://tcb.cloud.tencent.com/dev
```

### 2. 配置环境变量

```bash
# 复制环境配置文件
cp shixiaoya-website/.env.production.example shixiaoya-website/.env.production

# 编辑配置文件，填入你的环境ID
# VITE_TCB_ENV_ID=your-env-id
# VITE_TCB_REGION=ap-shanghai
```

### 3. 一键部署

```bash
# 执行部署脚本
chmod +x deploy.sh
./deploy.sh
```

### 4. 数据迁移（可选）

如果从现有Supabase/PostgreSQL迁移：

```bash
# 安装依赖
npm install @cloudbase/node-sdk @prisma/client

# 设置环境变量
export TCB_ENV_ID=your-env-id
export DATABASE_URL=your-postgresql-url

# 执行迁移
node migrate-to-cloudbase.js
```

## 🏗️ 架构设计

### 前端架构
```
shixiaoya-website/
├── src/
│   ├── lib/cloudbase.ts      # CloudBase SDK配置
│   ├── components/           # React组件
│   ├── pages/               # 页面组件
│   └── hooks/               # 自定义Hooks
├── .env.production          # 生产环境配置
└── dist/                    # 构建输出
```

### 后端架构
```
functions/
└── shixiaoya-api/
    ├── index.js             # 云函数入口
    ├── package.json         # 依赖配置
    └── node_modules/        # 依赖包
```

### 数据库设计
```
CloudBase Database Collections:
├── categories               # 产品分类
├── products                # 产品信息
├── inquiries               # 询价记录
├── cases                   # 客户案例
├── users                   # 用户管理
├── settings                # 系统配置
└── analytics               # 访问统计
```

## 🔧 配置说明

### CloudBase配置 (cloudbase-config.json)
```json
{
  "envId": "your-env-id",
  "region": "ap-shanghai",
  "functions": [...],
  "hosting": {...},
  "database": {...}
}
```

### 环境变量配置
```bash
# 前端环境变量
VITE_TCB_ENV_ID=your-env-id
VITE_TCB_REGION=ap-shanghai
VITE_API_BASE_URL=https://your-env-id.service.tcloudbase.com/shixiaoya-api

# 云函数环境变量
NODE_ENV=production
TCB_ENV_ID=your-env-id
```

## 📊 性能优化

### 1. 缓存策略
- 静态资源: 1年缓存
- API接口: 无缓存
- 图片资源: CDN加速

### 2. 数据库优化
- 创建复合索引
- 查询结果分页
- 数据预加载

### 3. 云函数优化
- 内存配置: 512MB
- 超时时间: 60秒
- 并发限制: 100

## 🔒 安全配置

### 1. 数据库安全规则
```javascript
// 产品数据 - 公开读取，认证写入
{
  "read": true,
  "write": "auth.uid != null"
}

// 询价数据 - 认证读取，公开写入
{
  "read": "auth.uid != null", 
  "write": true
}
```

### 2. API安全
- CORS跨域限制
- 请求频率限制
- JWT身份验证
- 输入数据验证

### 3. 网络安全
- HTTPS强制
- 安全头设置
- XSS防护

## 📈 监控告警

### 1. 性能监控
- 函数执行时间
- 数据库响应时间
- 静态资源加载速度

### 2. 业务监控
- API调用量
- 错误率统计
- 用户访问量

### 3. 告警配置
- 邮件通知
- 短信告警
- 微信群通知

## 🛠️ 运维管理

### 1. 日志查看
```bash
# 查看云函数日志
cloudbase functions:log shixiaoya-api

# 查看访问日志
cloudbase hosting:detail
```

### 2. 数据备份
```bash
# 导出数据库
cloudbase db:export --collection-name products

# 备份静态文件
cloudbase storage:download
```

### 3. 版本管理
```bash
# 查看部署历史
cloudbase functions:list

# 回滚版本
cloudbase functions:deploy shixiaoya-api --code-secret previous-version
```

## 🔄 CI/CD集成

### GitHub Actions配置
```yaml
name: Deploy to CloudBase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build project
        run: npm run build
      - name: Deploy to CloudBase
        run: |
          npm install -g @cloudbase/cli
          cloudbase login --key ${{ secrets.TCB_SECRET_KEY }}
          ./deploy.sh
```

## 📞 技术支持

### 1. 官方文档
- [CloudBase官方文档](https://docs.cloudbase.net/)
- [云函数开发指南](https://docs.cloudbase.net/cloud-function/)
- [数据库使用指南](https://docs.cloudbase.net/database/)

### 2. 社区支持
- [CloudBase开发者社区](https://cloudbase.net/community)
- [GitHub Issues](https://github.com/TencentCloudBase)

### 3. 联系方式
- 技术支持QQ群: 601134960
- 官方微信群: 扫码加入

## 📝 更新日志

### v1.0.0 (2025-01-26)
- ✅ 完成CloudBase架构设计
- ✅ 实现前后端一体化部署
- ✅ 配置数据库和安全规则
- ✅ 添加性能优化和监控
- ✅ 提供完整部署文档

---

**部署完成后访问地址**: https://your-env-id.tcloudbaseapp.com
**管理控制台**: https://console.cloud.tencent.com/tcb