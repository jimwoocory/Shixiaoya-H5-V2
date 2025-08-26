# 🚀 施小雅板材 - 5分钟快速部署指南

## 第一步：创建CloudBase环境

1. **访问控制台**（已为您打开）
   ```
   https://tcb.cloud.tencent.com/dev?from=AIToolkit
   ```

2. **创建环境**
   - 点击"创建环境"
   - 环境名称：`shixiaoya-board`
   - 地域：`上海`
   - 计费方式：`按量付费`
   - 点击"立即开通"

3. **获取环境ID**
   - 创建完成后，复制环境ID（格式如：shixiaoya-xxx）

## 第二步：配置项目

**手动配置 .env 文件：**
```bash
# 编辑 .env 文件，替换 your-env-id 为您的实际环境ID
VITE_TCB_ENV_ID=your-env-id
VITE_TCB_REGION=ap-shanghai
VITE_API_BASE_URL=https://your-env-id.service.tcloudbase.com/shixiaoya-api
VITE_APP_TITLE=施小雅板材
VITE_APP_DESCRIPTION=专业板材供应商
VITE_APP_URL=https://your-env-id.tcloudbaseapp.com
VITE_ENABLE_ANALYTICS=true
```

## 第三步：部署项目

```bash
# 1. 安装CloudBase CLI（如果还没安装）
npm install -g @cloudbase/cli

# 2. 登录CloudBase
cloudbase login

# 3. 构建项目
npm run build

# 4. 部署项目
cloudbase framework:deploy
```

## 第四步：初始化数据库

```bash
# 创建数据库集合
cloudbase db:createCollection categories
cloudbase db:createCollection products
cloudbase db:createCollection inquiries
cloudbase db:createCollection cases
cloudbase db:createCollection users
```

## 🎉 完成！

部署成功后，您可以访问：
- **网站**: https://your-env-id.tcloudbaseapp.com
- **控制台**: https://console.cloud.tencent.com/tcb

## 🆘 遇到问题？

1. **环境创建失败**
   - 检查腾讯云账户余额
   - 确认已完成实名认证

2. **部署失败**
   - 检查环境ID是否正确
   - 确认已登录CloudBase CLI

3. **网站无法访问**
   - 等待1-2分钟让部署生效
   - 检查控制台部署状态

## 📞 技术支持

- 官方文档：https://docs.cloudbase.net/
- QQ群：601134960