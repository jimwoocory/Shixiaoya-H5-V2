#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 微信域名访问修复工具');
console.log('================================');

// 检查项目结构
function checkProjectStructure() {
    console.log('📁 检查项目结构...');
    
    const requiredFiles = [
        'shixiaoya-website/package.json',
        'shixiaoya-website/src/App.tsx',
        'shixiaoya-website/vercel.json'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
        console.log('❌ 缺少必要文件：', missingFiles);
        return false;
    }
    
    console.log('✅ 项目结构检查通过');
    return true;
}

// 添加微信兼容性配置
function addWechatCompatibility() {
    console.log('📱 添加微信兼容性配置...');
    
    const indexHtmlPath = 'shixiaoya-website/index.html';
    
    if (fs.existsSync(indexHtmlPath)) {
        let content = fs.readFileSync(indexHtmlPath, 'utf8');
        
        // 添加微信兼容性meta标签
        const metaTags = `
    <meta name="referrer" content="never">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta property="og:type" content="website">
    <meta property="og:title" content="施小雅板材 - 专业板材供应商">
    <meta property="og:description" content="施小雅板材，提供优质板材产品和专业服务">`;
        
        if (!content.includes('name="referrer"')) {
            content = content.replace('</head>', `${metaTags}\n  </head>`);
            fs.writeFileSync(indexHtmlPath, content);
            console.log('✅ 已添加微信兼容性配置');
        } else {
            console.log('✅ 微信兼容性配置已存在');
        }
    }
}

// 更新Vercel配置
function updateVercelConfig() {
    console.log('🚀 更新Vercel配置...');
    
    const vercelConfigPath = 'shixiaoya-website/vercel.json';
    const config = {
        "version": 2,
        "builds": [
            {
                "src": "package.json",
                "use": "@vercel/static-build",
                "config": {
                    "distDir": "dist"
                }
            }
        ],
        "routes": [
            {
                "src": "/(.*)",
                "dest": "/index.html"
            }
        ],
        "headers": [
            {
                "source": "/(.*)",
                "headers": [
                    {
                        "key": "X-Content-Type-Options",
                        "value": "nosniff"
                    },
                    {
                        "key": "X-Frame-Options",
                        "value": "DENY"
                    },
                    {
                        "key": "X-XSS-Protection",
                        "value": "1; mode=block"
                    },
                    {
                        "key": "Referrer-Policy",
                        "value": "strict-origin-when-cross-origin"
                    }
                ]
            }
        ]
    };
    
    fs.writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2));
    console.log('✅ Vercel配置已更新');
}

// 生成域名检测报告
function generateDomainReport() {
    console.log('📊 生成域名状态报告...');
    
    const domains = [
        {
            name: 'CloudBase域名',
            url: 'https://shixiaoya-h5-v1-6g5yuo5c2842bfb3-1308520983.tcloudbaseapp.com',
            status: '推荐使用',
            note: '腾讯云服务，微信兼容性好'
        },
        {
            name: 'Vercel域名',
            url: 'https://shixiaoya-website.vercel.app',
            status: '备用方案',
            note: '可能需要短链接访问'
        }
    ];
    
    const report = `
# 域名状态报告
生成时间：${new Date().toLocaleString()}

## 可用域名列表

${domains.map(domain => `
### ${domain.name}
- URL: ${domain.url}
- 状态: ${domain.status}
- 说明: ${domain.note}
`).join('')}

## 使用建议

1. **主要使用**: CloudBase域名
2. **备用方案**: 生成短链接
3. **长期规划**: 申请自有域名并备案

## 测试方法

1. 在微信中直接访问域名
2. 使用短链接服务测试
3. 检查微信开发者工具

## 问题反馈

如果域名仍然无法访问，请：
1. 检查网络连接
2. 尝试清除微信缓存
3. 联系技术支持
`;
    
    fs.writeFileSync('domain-status-report.md', report);
    console.log('✅ 域名状态报告已生成');
}

// 主函数
function main() {
    try {
        if (!checkProjectStructure()) {
            process.exit(1);
        }
        
        addWechatCompatibility();
        updateVercelConfig();
        generateDomainReport();
        
        console.log('\n🎉 修复完成！');
        console.log('\n📋 下一步操作：');
        console.log('1. 测试CloudBase域名：https://shixiaoya-h5-v1-6g5yuo5c2842bfb3-1308520983.tcloudbaseapp.com');
        console.log('2. 如需短链接，访问：https://t.cn');
        console.log('3. 查看详细报告：domain-status-report.md');
        
    } catch (error) {
        console.error('❌ 修复过程中出现错误：', error.message);
        process.exit(1);
    }
}

main();