# DNS配置详细指南

## 🎯 目标
让 `shixiaoya.asia` 指向您的Vercel部署

## 📋 配置步骤

### 1. 登录DNSPod管理后台
- 访问：https://console.dnspod.cn/
- 找到域名：shixiaoya.asia

### 2. 添加A记录
```
记录类型：A
主机记录：@
记录值：76.76.21.21
TTL：600秒
```

### 3. 添加WWW记录
```
记录类型：A
主机记录：www
记录值：76.76.21.21
TTL：600秒
```

### 4. 删除冲突记录
如果存在其他A记录或CNAME记录指向@和www，请先删除

## ⏰ 生效时间
- 通常5-30分钟
- 最长可能需要24小时

## 🧪 测试方法
```bash
# 测试域名解析
nslookup shixiaoya.asia
ping shixiaoya.asia
```

## 📱 微信测试
DNS生效后：
1. 在微信中访问 https://shixiaoya.asia
2. 确认页面正常显示
3. 测试所有功能

## 🔗 相关链接
- [Vercel域名设置](https://vercel.com/jimwoocorys-projects/shixiaoya-website/settings/domains)
- [DNSPod控制台](https://console.dnspod.cn/)