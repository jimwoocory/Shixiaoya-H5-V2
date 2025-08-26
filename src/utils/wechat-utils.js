// 微信浏览器工具函数
export const isWeChat = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

// 检测微信版本
export const getWeChatVersion = () => {
  const ua = navigator.userAgent.toLowerCase()
  const match = ua.match(/micromessenger\/(\d+\.\d+\.\d+)/)
  return match ? match[1] : null
}

// 微信分享配置
export const configWeChatShare = (config) => {
  if (typeof WeixinJSBridge !== 'undefined') {
    WeixinJSBridge.on('menu:share:timeline', () => {
      WeixinJSBridge.invoke('shareTimeline', {
        title: config.title || '施小雅板材 - 专业环保板材供应商',
        link: config.link || window.location.href,
        desc: config.desc || '专注于为客户提供优质环保的板材产品',
        img_url: config.imgUrl || `${window.location.origin}/logo.png`
      })
    })

    WeixinJSBridge.on('menu:share:appmessage', () => {
      WeixinJSBridge.invoke('sendAppMessage', {
        title: config.title || '施小雅板材',
        desc: config.desc || '专业环保板材供应商，E0级环保标准',
        link: config.link || window.location.href,
        img_url: config.imgUrl || `${window.location.origin}/logo.png`
      })
    })
  }
}

// 微信浏览器性能优化
export const optimizeForWeChat = () => {
  if (isWeChat()) {
    // 禁用微信浏览器的下拉刷新
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }, { passive: false })

    // 防止微信浏览器字体缩放
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault()
    })

    // 优化微信浏览器滚动
    document.body.style.webkitOverflowScrolling = 'touch'
    
    console.log('微信浏览器优化已启用')
  }
}

// 检测是否被微信屏蔽
export const checkWeChatBlocked = () => {
  return new Promise((resolve) => {
    if (!isWeChat()) {
      resolve(false)
      return
    }

    const testImg = new Image()
    const timeout = setTimeout(() => {
      resolve(true) // 超时认为被屏蔽
    }, 5000)

    testImg.onload = () => {
      clearTimeout(timeout)
      resolve(false)
    }

    testImg.onerror = () => {
      clearTimeout(timeout)
      resolve(true)
    }

    testImg.src = `${window.location.origin}/vite.svg?t=${Date.now()}`
  })
}