import { useEffect, useState } from 'react'

const WeChatCompatibility = ({ children }) => {
  const [isWeChat, setIsWeChat] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    // 检测是否在微信浏览器中
    const ua = navigator.userAgent.toLowerCase()
    const isWeChatBrowser = ua.includes('micromessenger')
    setIsWeChat(isWeChatBrowser)

    if (isWeChatBrowser) {
      // 微信浏览器特殊处理
      console.log('检测到微信浏览器环境')
      
      // 检查是否被屏蔽
      const checkBlocked = () => {
        const testImg = new Image()
        testImg.onload = () => {
          console.log('网站可正常访问')
          setIsBlocked(false)
        }
        testImg.onerror = () => {
          console.log('可能被微信屏蔽')
          setIsBlocked(true)
        }
        testImg.src = window.location.origin + '/vite.svg?' + Date.now()
      }

      setTimeout(checkBlocked, 1000)

      // 微信浏览器优化
      document.addEventListener('WeixinJSBridgeReady', () => {
        console.log('微信JS桥接准备就绪')
      })

      // 防止微信浏览器缓存问题
      if (window.WeixinJSBridge) {
        window.WeixinJSBridge.call('hideOptionMenu')
      }
    }
  }, [])

  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">访问受限</h3>
          <p className="text-gray-600 mb-4">
            当前链接在微信中可能无法正常访问，请尝试以下方式：
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>1. 点击右上角菜单选择"在浏览器中打开"</p>
            <p>2. 复制链接到其他浏览器访问</p>
            <p>3. 使用我们的备用域名访问</p>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('链接已复制到剪贴板')
            }}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            复制链接
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {isWeChat && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                您正在微信浏览器中访问，如遇到问题请尝试在外部浏览器中打开
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}

export default WeChatCompatibility