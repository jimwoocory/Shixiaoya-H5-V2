# Vercel DNS 配置指南

## 🌐 域名：shixiaoya.asia

### 方案一：添加A记录（推荐）
在您的DNS提供商（DNSPod）中添加以下记录：

```
类型: A
主机记录: @
记录值: 76.76.21.21
TTL: 600
```

```
类型: A  
主机记录: www
记录值: 76.76.21.21
TTL: 600
```

```
类型: A
主机记录: api
记录值: 76.76.21.21  
TTL: 600
```

### 方案二：更换域名服务器
将域名服务器更换为：
- ns1.vercel-dns.com
- ns2.vercel-dns.com

## 🚀 配置完成后

1. **等待DNS生效**（通常5-30分钟）
2. **Vercel会自动验证**并发送邮件通知
3. **自动配置SSL证书**
4. **域名即可正常访问**

## 📱 微信访问测试

配置完成后，您可以：
1. 直接在微信中访问 `https://shixiaoya.asia`
2. 分享链接给用户测试
3. 确认在微信内置浏览器中正常显示

## 🔗 相关链接

- [Vercel域名配置](https://vercel.com/jimwoocorys-projects/shixiaoya-website/settings/domains)
- [后端域名配置](https://vercel.com/jimwoocorys-projects/shixiaoya-backend/settings/domains)