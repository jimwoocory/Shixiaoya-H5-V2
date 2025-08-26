# Vercel 环境变量配置指南

## 🔧 在 Vercel Dashboard 中配置环境变量

### 1. 访问项目设置
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的 `shixiaoya-website` 项目
3. 点击 **Settings** 标签
4. 选择 **Environment Variables** 选项

### 2. 添加以下环境变量

#### 云开发配置
```
VITE_TCB_ENV_ID = your-actual-env-id
VITE_TCB_REGION = ap-shanghai
VITE_API_BASE_URL = https://shixiaoya.asia/api
```

#### 应用配置
```
VITE_APP_TITLE = 施小雅板材
VITE_APP_DESCRIPTION = 专业板材供应商
VITE_APP_URL = https://shixiaoya.asia
```

#### 功能开关
```
VITE_ENABLE_ANALYTICS = true
VITE_ENABLE_PWA = true
```

#### Vercel 部署配置
```
VITE_VERCEL_ENV = production
VITE_VERCEL_URL = shixiaoya.asia
```

### 3. 环境设置
- **Environment**: 选择 `Production`
- **Git Branch**: 选择 `main` 或你的主分支

### 4. 保存并重新部署
配置完环境变量后，点击项目的 **Deployments** 标签，然后点击最新部署旁边的 **Redeploy** 按钮。

## 🔍 验证配置

### 检查环境变量是否生效
1. 部署完成后访问 https://shixiaoya.asia
2. 打开浏览器开发者工具
3. 在 Console 中输入: `console.log(import.meta.env)`
4. 确认环境变量已正确加载

### API 测试
访问 https://shixiaoya.asia/api/hello 测试 Serverless 函数是否正常工作。

## 📋 配置清单

- [ ] 配置云开发环境变量
- [ ] 配置应用基本信息
- [ ] 配置功能开关
- [ ] 配置 Vercel 部署参数
- [ ] 重新部署项目
- [ ] 验证网站访问
- [ ] 测试 API 功能

## 🆘 故障排除

### 环境变量未生效
1. 确认变量名前缀为 `VITE_`
2. 检查是否选择了正确的环境 (Production)
3. 重新部署项目

### 网站无法访问
1. 检查域名 DNS 解析
2. 确认 Vercel 项目部署状态
3. 查看部署日志中的错误信息