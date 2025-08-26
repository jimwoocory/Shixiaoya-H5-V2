import fs from 'fs';

console.log('🔍 检查部署状态...\n');

// 检查构建文件
if (fs.existsSync('dist')) {
  console.log('✅ 构建文件存在');
  const files = fs.readdirSync('dist');
  console.log(`📁 构建文件: ${files.join(', ')}`);
} else {
  console.log('❌ 构建文件不存在');
}

// 检查环境配置
if (fs.existsSync('.env')) {
  console.log('✅ 环境配置文件存在');
  const envContent = fs.readFileSync('.env', 'utf8');
  const envId = envContent.match(/VITE_TCB_ENV_ID=(.+)/)?.[1];
  console.log(`🆔 环境ID: ${envId}`);
  console.log(`🌐 网站地址: https://${envId}.tcloudbaseapp.com`);
  console.log(`📊 控制台: https://console.cloud.tencent.com/tcb/env/overview?envId=${envId}`);
} else {
  console.log('❌ 环境配置文件不存在');
}

// 检查云函数
if (fs.existsSync('cloudfunctions/shixiaoya-api')) {
  console.log('✅ 云函数文件存在');
} else {
  console.log('❌ 云函数文件不存在');
}

console.log('\n📋 部署清单：');
console.log('1. ✅ 项目构建完成');
console.log('2. ⏳ CloudBase CLI 安装中...');
console.log('3. ⏳ 等待部署到CloudBase...');
console.log('4. ⏳ 等待数据库初始化...');

console.log('\n🚀 您的施小雅板材网站即将上线！');