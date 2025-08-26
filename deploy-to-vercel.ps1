# 施小雅网站 Vercel 部署脚本 (PowerShell)
# 使用方法: powershell -ExecutionPolicy Bypass -File deploy-to-vercel.ps1

Write-Host "🚀 开始部署施小雅网站到 Vercel..." -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "shixiaoya-website\package.json")) {
    Write-Host "❌ 错误: 请在项目根目录运行此脚本" -ForegroundColor Red
    exit 1
}

# 进入前端项目目录
Set-Location "shixiaoya-website"

Write-Host "📦 安装依赖..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}

# 检查是否已登录 Vercel
Write-Host "🔐 检查 Vercel 登录状态..." -ForegroundColor Yellow
$vercelWhoami = npx vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 未登录 Vercel，请先登录..." -ForegroundColor Red
    npx vercel login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 登录失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 登录成功" -ForegroundColor Green
}

# 构建项目
Write-Host "🔨 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败，请检查代码" -ForegroundColor Red
    exit 1
}

# 部署到 Vercel
Write-Host "🌐 部署到 Vercel..." -ForegroundColor Yellow
npx vercel --prod --yes

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 部署失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🔗 网站地址: https://shixiaoya.asia" -ForegroundColor Cyan
Write-Host "📊 Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 接下来需要验证：" -ForegroundColor Yellow
Write-Host "1. 访问网站确认正常加载" -ForegroundColor White
Write-Host "2. 检查 SSL 证书状态" -ForegroundColor White
Write-Host "3. 测试 API 功能" -ForegroundColor White
Write-Host ""
Write-Host "🎉 域名迁移配置完成！" -ForegroundColor Green

# 返回项目根目录
Set-Location ".."