import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 施小雅板材 CloudBase 自动配置工具\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    console.log('📋 请按照以下步骤操作：');
    console.log('1. 已为您打开腾讯云控制台');
    console.log('2. 请在控制台创建CloudBase环境');
    console.log('3. 创建完成后，请输入环境ID\n');
    
    const envId = await askQuestion('请输入您的CloudBase环境ID: ');
    
    if (!envId || envId.trim() === '') {
      console.log('❌ 环境ID不能为空');
      process.exit(1);
    }
    
    // 更新 .env 文件
    const envContent = `# CloudBase 环境配置
VITE_TCB_ENV_ID=${envId.trim()}
VITE_TCB_REGION=ap-shanghai
VITE_API_BASE_URL=https://${envId.trim()}.service.tcloudbase.com/shixiaoya-api

# 应用配置
VITE_APP_TITLE=施小雅板材
VITE_APP_DESCRIPTION=专业板材供应商
VITE_APP_URL=https://${envId.trim()}.tcloudbaseapp.com

# 功能开关
VITE_ENABLE_ANALYTICS=true`;

    fs.writeFileSync('.env', envContent);
    console.log('✅ .env 文件已更新');
    
    // 更新 cloudbaserc.json
    const cloudbaseConfig = JSON.parse(fs.readFileSync('cloudbaserc.json', 'utf8'));
    cloudbaseConfig.envId = envId.trim();
    fs.writeFileSync('cloudbaserc.json', JSON.stringify(cloudbaseConfig, null, 2));
    console.log('✅ cloudbaserc.json 已更新');
    
    console.log('\n🎉 配置完成！');
    console.log(`\n📊 您的环境信息：`);
    console.log(`- 环境ID: ${envId.trim()}`);
    console.log(`- 网站地址: https://${envId.trim()}.tcloudbaseapp.com`);
    console.log(`- API地址: https://${envId.trim()}.service.tcloudbase.com/shixiaoya-api`);
    console.log(`- 控制台: https://console.cloud.tencent.com/tcb/env/overview?envId=${envId.trim()}`);
    
    console.log('\n🚀 下一步操作：');
    console.log('1. 运行: npm run build');
    console.log('2. 运行: cloudbase framework:deploy');
    console.log('3. 访问您的网站！');
    
  } catch (error) {
    console.error('❌ 配置失败:', error.message);
  } finally {
    rl.close();
  }
}

main();