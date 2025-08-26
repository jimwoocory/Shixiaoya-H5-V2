#!/bin/bash

# 施小雅网站 Vercel 部署脚本
# 使用方法: ./deploy-to-vercel.sh

set -e

echo "🚀 开始部署施小雅网站到 Vercel..."

# 检查是否在正确的目录
if [ ! -f "shixiaoya-website/package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 进入前端项目目录
cd shixiaoya-website

echo "📦 安装依赖..."
npm install

# 检查是否已登录 Vercel
echo "🔐 检查 Vercel 登录状态..."
if ! npx vercel whoami > /dev/null 2>&1; then
    echo "❌ 未登录 Vercel，请先登录..."
    npx vercel login
    echo "✅ 登录成功"
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
npx vercel --prod --yes

echo ""
echo "✅ 部署完成！"
echo "🔗 网站地址: https://shixiaoya.asia"
echo "📊 Vercel Dashboard: https://vercel.com/dashboard"
echo ""
echo "📝 接下来需要手动操作："
echo "1. 在 Vercel Dashboard 中配置环境变量"
echo "2. 确认域名 DNS 解析正确"
echo "3. 等待 SSL 证书自动配置完成"
echo ""
echo "🎉 域名迁移配置完成！"