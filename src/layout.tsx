import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navigation = [
    { name: '首页', href: '/' },
    { name: '产品中心', href: '/products' },
    { name: '案例展示', href: '/cases' },
    { name: '关于我们', href: '/about' },
    { name: '资质认证', href: '/certifications' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">施</span>
              </div>
              <span className="text-xl font-bold text-gray-900">施小雅板材</span>
            </Link>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-brand-green transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* 联系按钮 */}
            <div className="hidden md:flex items-center space-x-4">
              <Button className="bg-brand-gradient hover:shadow-brand-lg text-white">
                <Phone className="h-4 w-4 mr-2" />
                联系我们
              </Button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* 移动端菜单 */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-brand-green transition-colors duration-200 font-medium px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 pt-4">
                  <Button className="w-full bg-brand-gradient hover:shadow-brand-lg text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    联系我们
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="pt-16">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">施</span>
                </div>
                <span className="text-xl font-bold">施小雅板材</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                专业环保板材供应商，致力于为客户提供优质的板材产品和服务。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">产品中心</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors">生态板</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">多层板</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">颗粒板</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">公司信息</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">关于我们</Link></li>
                <li><Link to="/cases" className="hover:text-white transition-colors">案例展示</Link></li>
                <li><Link to="/certifications" className="hover:text-white transition-colors">资质认证</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <div className="space-y-2 text-gray-400">
                <p>地址：广西柳州市鹿寨县鹿寨镇建中东路116号办公楼</p>
                <p>电话：400-888-8888</p>
                <p>邮箱：info@shixiaoya.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 施小雅板材. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout