# 🚀 快速创建CloudBase环境指南

## 方法一：控制台创建（推荐）

1. **访问控制台**
   ```
   https://tcb.cloud.tencent.com/dev?from=AIToolkit
   ```

2. **创建环境**
   - 点击"创建环境"
   - 环境名称：`shixiaoya-board`
   - 地域：`上海`
   - 计费方式：`按量付费`（适合开发测试）

3. **记录环境ID**
   - 创建完成后会显示环境ID（如：shixiaoya-xxx）
   - 复制这个ID

## 方法二：一键创建脚本

```bash
# 安装CloudBase CLI
npm install -g @cloudbase/cli

# 登录
cloudbase login

# 创建环境（需要在控制台确认）
cloudbase env:create shixiaoya-board --region ap-shanghai
```

## 创建完成后的配置

1. **更新环境变量**
   编辑 `.env` 文件：
   ```bash
   VITE_TCB_ENV_ID=你的环境ID
   VITE_TCB_REGION=ap-shanghai
   VITE_API_BASE_URL=https://你的环境ID.service.tcloudbase.com/shixiaoya-api
   ```

2. **初始化数据库**
   ```bash
   # 创建数据库集合
   cloudbase db:createCollection categories
   cloudbase db:createCollection products
   cloudbase db:createCollection inquiries
   cloudbase db:createCollection cases
   cloudbase db:createCollection users
   ```

3. **部署项目**
   ```bash
   # 设置环境变量
   export ENV_ID=你的环境ID
   
   # 执行部署
   ./deploy.sh
   ```

## 🎯 创建成功标志

创建成功后，您会看到：
- ✅ 环境ID（如：shixiaoya-xxx）
- ✅ 控制台访问地址
- ✅ 数据库、云函数、静态托管等服务已开通

## 🆘 需要帮助？

如果遇到问题，请：
1. 检查腾讯云账户余额
2. 确认已完成实名认证
3. 联系技术支持：QQ群 601134960