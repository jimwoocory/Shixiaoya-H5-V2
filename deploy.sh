#!/bin/bash

# 施小雅板材 - CloudBase 部署脚本

set -e

echo "🚀 开始部署施小雅板材项目到腾讯云CloudBase..."

# 检查环境
if ! command -v cloudbase &> /dev/null; then
    echo "❌ CloudBase CLI 未安装，请先安装: npm install -g @cloudbase/cli"
    exit 1
fi

# 登录检查
echo "📋 检查登录状态..."
if ! cloudbase auth:list &> /dev/null; then
    echo "🔐 请先登录: cloudbase login"
    exit 1
fi

# 构建前端
echo "🏗️  构建前端项目..."
cd shixiaoya-website
npm install
npm run build
cd ..

# 部署云函数
echo "☁️  部署云函数..."
cd functions/shixiaoya-api
npm install
cd ../..

# 使用CloudBase CLI部署
echo "📦 部署到CloudBase..."

# 部署云函数
cloudbase functions:deploy shixiaoya-api --dir ./functions/shixiaoya-api

# 部署静态网站
cloudbase hosting:deploy ./shixiaoya-website/dist -e production

# 创建数据库集合
echo "🗄️  初始化数据库..."
cloudbase db:createCollection categories
cloudbase db:createCollection products  
cloudbase db:createCollection inquiries
cloudbase db:createCollection cases
cloudbase db:createCollection users
cloudbase db:createCollection settings
cloudbase db:createCollection analytics

# 设置安全规则
echo "🔒 配置安全规则..."
cloudbase db:updateCollection categories --rule '{"read": true, "write": "auth.uid != null"}'
cloudbase db:updateCollection products --rule '{"read": true, "write": "auth.uid != null"}'
cloudbase db:updateCollection inquiries --rule '{"read": "auth.uid != null", "write": true}'
cloudbase db:updateCollection cases --rule '{"read": true, "write": "auth.uid != null"}'
cloudbase db:updateCollection users --rule '{"read": "auth.uid != null", "write": "auth.uid != null"}'

echo "✅ 部署完成！"
echo "🌐 访问地址: https://your-env-id.tcloudbaseapp.com"
echo "📊 控制台: https://console.cloud.tencent.com/tcb"