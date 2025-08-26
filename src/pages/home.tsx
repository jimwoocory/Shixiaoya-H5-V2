import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Leaf, 
  Shield, 
  Award, 
  Phone, 
  ArrowRight,
  Star,
  Package
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "环保材质",
      description: "采用E0级环保标准，甲醛释放量≤0.5mg/L，守护家人健康"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "品质保证", 
      description: "严格质量控制体系，每批产品都经过专业检测认证"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "权威认证",
      description: "获得多项国家权威认证，产品质量值得信赖"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="relative min-h-screen flex items-center justify-center bg-brand-gradient-light overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 py-20">
          <div className="mb-8">
            <Badge 
              variant="outline" 
              className="text-brand-green border-brand-green bg-white/80 backdrop-blur-sm px-6 py-2 text-sm font-medium"
            >
              <Leaf className="w-4 h-4 mr-2" />
              专业环保板材供应商
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-gray-900 block mb-4">施小雅板材</span>
            <span className="text-gradient-brand block">环保品质 值得信赖</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            专注于为客户提供优质环保的板材产品，严格按照国家环保标准生产，
            让每一块板材都承载着对品质的坚持和对环保的责任。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-brand-gradient hover:shadow-brand-lg text-white px-10 py-4 text-lg font-semibold rounded-xl"
            >
              <Phone className="h-5 w-5 mr-3" />
              立即咨询
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-brand-green text-brand-green hover:bg-brand-gradient-soft px-10 py-4 text-lg font-semibold rounded-xl"
            >
              查看产品
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-green mb-2">10+</div>
              <div className="text-gray-600 font-medium">年专业经验</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-brand-green mb-2">1000+</div>
              <div className="text-gray-600 font-medium">客户信赖</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-gray-600 font-medium">优质服务</div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品特色 */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge 
              variant="outline" 
              className="mb-6 text-brand-green border-brand-green bg-white/80 backdrop-blur-sm px-6 py-2 text-sm font-medium"
            >
              <Shield className="w-4 h-4 mr-2" />
              产品优势
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              为什么选择
              <span className="text-gradient-brand block mt-2">施小雅板材？</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              我们始终坚持以质量为本，以环保为先，为客户提供最优质的板材产品和服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group text-center p-10 hover:shadow-brand-lg transition-all duration-500 border-0 bg-gradient-to-b from-white to-gray-50/50"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-8">
                    <div className="p-6 bg-brand-gradient rounded-2xl shadow-brand">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-brand-green transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-24 bg-brand-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              准备开始您的项目了吗？
            </h2>
            <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              联系我们获取专业的板材解决方案，我们的专家团队将为您提供最优质的服务
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-brand-green hover:bg-gray-50 px-10 py-4 text-lg font-semibold rounded-xl"
              >
                <Phone className="h-5 w-5 mr-3" />
                立即咨询
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-brand-green px-10 py-4 text-lg font-semibold rounded-xl"
              >
                查看案例
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home