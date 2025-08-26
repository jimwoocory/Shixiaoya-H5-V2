#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始设置施小雅板材CloudBase环境...\n');

// 检查CloudBase CLI
function checkCloudbaseCLI() {
  try {
    execSync('cloudbase --version', { stdio: 'ignore' });
    console.log('✅ CloudBase CLI 已安装');
  } catch (error) {
    console.log('📦 正在安装 CloudBase CLI...');
    execSync('npm install -g @cloudbase/cli', { stdio: 'inherit' });
    console.log('✅ CloudBase CLI 安装完成');
  }
}

// 登录CloudBase
function loginCloudbase() {
  try {
    console.log('🔐 正在登录 CloudBase...');
    execSync('cloudbase login', { stdio: 'inherit' });
    console.log('✅ CloudBase 登录成功');
  } catch (error) {
    console.error('❌ CloudBase 登录失败，请手动执行: cloudbase login');
    process.exit(1);
  }
}

// 创建环境
function createEnvironment() {
  try {
    console.log('🏗️  正在创建 CloudBase 环境...');
    
    // 这里需要用户在控制台手动创建环境
    console.log('📋 请按照以下步骤创建环境：');
    console.log('1. 访问: https://tcb.cloud.tencent.com/dev');
    console.log('2. 点击"创建环境"');
    console.log('3. 环境名称: shixiaoya-board');
    console.log('4. 选择计费方式（建议选择按量付费）');
    console.log('5. 创建完成后，记录环境ID');
    console.log('\n⏳ 请创建完环境后，将环境ID输入到 .env 文件中');
    
  } catch (error) {
    console.error('❌ 环境创建失败:', error.message);
  }
}

// 初始化项目配置
function initializeProject() {
  console.log('⚙️  正在初始化项目配置...');
  
  // 创建 .env 文件
  const envContent = `# CloudBase 环境配置
VITE_TCB_ENV_ID=your-env-id-here
VITE_TCB_REGION=ap-shanghai
VITE_API_BASE_URL=https://your-env-id-here.service.tcloudbase.com/shixiaoya-api

# 应用配置
VITE_APP_TITLE=施小雅板材
VITE_APP_DESCRIPTION=专业板材供应商
VITE_APP_URL=https://your-domain.com

# 功能开关
VITE_ENABLE_ANALYTICS=true`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env 文件创建完成');
  
  // 更新 cloudbaserc.json
  const cloudbaseConfig = {
    "version": "2.0",
    "envId": "{{env.ENV_ID}}",
    "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
    "framework": {
      "name": "shixiaoya-board",
      "plugins": {
        "client": {
          "use": "@cloudbase/framework-plugin-website",
          "inputs": {
            "outputPath": "dist",
            "buildCommand": "npm run build"
          }
        },
        "server": {
          "use": "@cloudbase/framework-plugin-function",
          "inputs": {
            "functionRootPath": "cloudfunctions",
            "functions": [
              {
                "name": "shixiaoya-api",
                "timeout": 60,
                "envVariables": {
                  "NODE_ENV": "production"
                },
                "runtime": "Nodejs18.15"
              }
            ]
          }
        }
      }
    }
  };
  
  fs.writeFileSync('cloudbaserc.json', JSON.stringify(cloudbaseConfig, null, 2));
  console.log('✅ cloudbaserc.json 配置完成');
}

// 创建部署脚本
function createDeployScript() {
  const deployScript = `#!/bin/bash

echo "🚀 开始部署施小雅板材到CloudBase..."

# 检查环境ID
if [ -z "$ENV_ID" ]; then
  echo "❌ 请设置环境变量 ENV_ID"
  echo "例如: export ENV_ID=your-env-id"
  exit 1
fi

# 构建前端
echo "🏗️  构建前端项目..."
npm run build

# 部署云函数
echo "☁️  部署云函数..."
cd cloudfunctions/shixiaoya-api
npm install
cd ../..

# 使用Framework部署
echo "📦 部署到CloudBase..."
ENV_ID=$ENV_ID cloudbase framework:deploy

echo "✅ 部署完成！"
echo "🌐 访问地址: https://$ENV_ID.tcloudbaseapp.com"
`;

  fs.writeFileSync('deploy.sh', deployScript);
  fs.chmodSync('deploy.sh', '755');
  console.log('✅ 部署脚本创建完成');
}

// 主函数
async function main() {
  try {
    checkCloudbaseCLI();
    loginCloudbase();
    createEnvironment();
    initializeProject();
    createDeployScript();
    
    console.log('\n🎉 CloudBase 环境设置完成！');
    console.log('\n📋 下一步操作：');
    console.log('1. 在腾讯云控制台创建环境后，更新 .env 文件中的环境ID');
    console.log('2. 运行: export ENV_ID=your-env-id');
    console.log('3. 运行: ./deploy.sh');
    console.log('\n📞 如需帮助，请查看 DEPLOYMENT_GUIDE.md');
    
  } catch (error) {
    console.error('❌ 设置失败:', error.message);
    process.exit(1);
  }
}

main();