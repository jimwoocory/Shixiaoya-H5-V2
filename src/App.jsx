import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import Home from './pages/home'
import WeChatCompatibility from './components/wechat-compatibility'
import './globals.css'

function App() {
  return (
    <WeChatCompatibility>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold text-gray-900">产品中心 - 敬请期待</h1></div>} />
            <Route path="/cases" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold text-gray-900">案例展示 - 敬请期待</h1></div>} />
            <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold text-gray-900">关于我们 - 敬请期待</h1></div>} />
            <Route path="/certifications" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold text-gray-900">资质认证 - 敬请期待</h1></div>} />
          </Routes>
        </Layout>
      </Router>
    </WeChatCompatibility>
  )
}

export default App