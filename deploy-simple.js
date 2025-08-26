import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 开始部署施小雅板材到CloudBase...\n');

try {
  // 检查构建文件
  if (!fs.existsSync('dist')) {
    console.log('❌ 构建文件不存在，请先运行 npm run build');
    process.exit(1);
  }

  console.log('✅ 构建文件检查通过');

  // 读取环境配置
  const envContent = fs.readFileSync('.env', 'utf8');
  const envId = envContent.match(/VITE_TCB_ENV_ID=(.+)/)?.[1];
  
  if (!envId) {
    console.log('❌ 未找到环境ID，请检查 .env 文件');
    process.exit(1);
  }

  console.log(`📋 环境ID: ${envId}`);

  // 部署静态网站
  console.log('📦 部署静态网站...');
  execSync(`cloudbase hosting:deploy dist -e ${envId}`, { stdio: 'inherit' });
  console.log('✅ 静态网站部署完成');

  // 部署云函数
  console.log('☁️  部署云函数...');
  if (fs.existsSync('cloudfunctions/shixiaoya-api')) {
    execSync(`cloudbase functions:deploy shixiaoya-api --dir ./cloudfunctions/shixiaoya-api -e ${envId}`, { stdio: 'inherit' });
    console.log('✅ 云函数部署完成');
  }

  console.log('\n🎉 部署完成！');
  console.log(`🌐 网站地址: https://${envId}.tcloudbaseapp.com`);
  console.log(`📊 控制台: https://console.cloud.tencent.com/tcb/env/overview?envId=${envId}`);

} catch (error) {
  console.error('❌ 部署失败:', error.message);
  console.log('\n🔧 手动部署步骤：');
  console.log('1. cloudbase login');
  console.log('2. cloudbase hosting:deploy dist');
  console.log('3. cloudbase functions:deploy shixiaoya-api --dir ./cloudfunctions/shixiaoya-api');
}