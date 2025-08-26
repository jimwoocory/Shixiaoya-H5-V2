// 初始化示例数据脚本
import tcb from '@cloudbase/js-sdk';

// 从环境变量读取配置
const envId = 'shixiaoya-h5-v1-6g5yuo5c2842bfb3';

const app = tcb.init({
  env: envId
});

const db = app.database();

async function initData() {
  console.log('🗄️  开始初始化示例数据...\n');

  try {
    // 初始化分类数据
    console.log('📂 创建产品分类...');
    const categories = [
      {
        name: '实木板材',
        slug: 'solid-wood',
        description: '优质实木板材，环保健康，纹理自然',
        image: '/images/solid-wood.jpg',
        sort: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '人造板材',
        slug: 'engineered-wood',
        description: '高品质人造板材，性能稳定，用途广泛',
        image: '/images/engineered-wood.jpg',
        sort: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '装饰板材',
        slug: 'decorative-board',
        description: '精美装饰板材，美观实用，装修首选',
        image: '/images/decorative-board.jpg',
        sort: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const category of categories) {
      await db.collection('categories').add(category);
    }
    console.log('✅ 分类数据创建完成');

    // 初始化产品数据
    console.log('📦 创建产品数据...');
    const products = [
      {
        name: '优质橡木板',
        slug: 'premium-oak-board',
        description: '进口橡木制作，质地坚硬，纹理美观，适用于高端家具制作',
        price: 299.00,
        originalPrice: 399.00,
        images: ['/images/oak-board-1.jpg', '/images/oak-board-2.jpg'],
        specifications: {
          thickness: '18mm',
          size: '1220x2440mm',
          grade: 'E0级',
          moisture: '8-12%'
        },
        features: ['环保E0级', '防潮处理', '纹理清晰', '质地坚硬'],
        categoryId: 'solid-wood',
        isHot: true,
        isNew: false,
        stock: 100,
        sort: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '多层实木板',
        slug: 'multi-layer-plywood',
        description: '多层实木胶合板，结构稳定，不易变形，适合各种装修需求',
        price: 189.00,
        originalPrice: 229.00,
        images: ['/images/plywood-1.jpg', '/images/plywood-2.jpg'],
        specifications: {
          thickness: '15mm',
          size: '1220x2440mm',
          grade: 'E1级',
          layers: '9层'
        },
        features: ['结构稳定', '不易变形', '握钉力强', '防潮性好'],
        categoryId: 'engineered-wood',
        isHot: true,
        isNew: true,
        stock: 200,
        sort: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '免漆生态板',
        slug: 'melamine-board',
        description: '免漆生态板，表面光滑，色彩丰富，免油漆处理，环保便捷',
        price: 158.00,
        images: ['/images/melamine-board-1.jpg'],
        specifications: {
          thickness: '17mm',
          size: '1220x2440mm',
          grade: 'E0级',
          surface: '三聚氰胺贴面'
        },
        features: ['免油漆', '色彩丰富', '表面光滑', '环保健康'],
        categoryId: 'decorative-board',
        isHot: false,
        isNew: true,
        stock: 150,
        sort: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '阻燃板材',
        slug: 'fire-retardant-board',
        description: '阻燃板材，防火等级B1级，安全可靠，适用于公共场所装修',
        price: 268.00,
        images: ['/images/fire-retardant-board.jpg'],
        specifications: {
          thickness: '18mm',
          size: '1220x2440mm',
          fireRating: 'B1级',
          grade: 'E1级'
        },
        features: ['阻燃防火', '安全可靠', '质量稳定', '符合标准'],
        categoryId: 'engineered-wood',
        isHot: false,
        isNew: false,
        stock: 80,
        sort: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const product of products) {
      await db.collection('products').add(product);
    }
    console.log('✅ 产品数据创建完成');

    // 初始化案例数据
    console.log('🏗️  创建案例数据...');
    const cases = [
      {
        title: '上海某高端住宅项目',
        slug: 'shanghai-luxury-residence',
        description: '采用优质橡木板材，打造高端住宅空间，展现自然木质纹理的魅力',
        location: '上海市浦东新区',
        area: '300㎡',
        projectType: '住宅装修',
        images: ['/images/case-1-1.jpg', '/images/case-1-2.jpg', '/images/case-1-3.jpg'],
        materials: ['优质橡木板', '多层实木板'],
        clientName: '张先生',
        completedAt: new Date('2024-10-15'),
        isActive: true,
        sort: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '杭州办公楼装修项目',
        slug: 'hangzhou-office-building',
        description: '使用阻燃板材，确保办公环境安全，同时兼顾美观和实用性',
        location: '杭州市西湖区',
        area: '1200㎡',
        projectType: '办公装修',
        images: ['/images/case-2-1.jpg', '/images/case-2-2.jpg'],
        materials: ['阻燃板材', '免漆生态板'],
        clientName: '某科技公司',
        completedAt: new Date('2024-11-20'),
        isActive: true,
        sort: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '苏州别墅定制项目',
        slug: 'suzhou-villa-custom',
        description: '全屋定制项目，使用多种板材组合，打造独特的居住空间',
        location: '苏州市工业园区',
        area: '500㎡',
        projectType: '别墅装修',
        images: ['/images/case-3-1.jpg'],
        materials: ['优质橡木板', '多层实木板', '免漆生态板'],
        clientName: '李女士',
        completedAt: new Date('2024-12-10'),
        isActive: true,
        sort: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const caseItem of cases) {
      await db.collection('cases').add(caseItem);
    }
    console.log('✅ 案例数据创建完成');

    console.log('\n🎉 示例数据初始化完成！');
    console.log('📊 数据统计：');
    console.log(`- 产品分类: ${categories.length} 个`);
    console.log(`- 产品: ${products.length} 个`);
    console.log(`- 案例: ${cases.length} 个`);

  } catch (error) {
    console.error('❌ 数据初始化失败:', error);
  }
}

// 运行初始化
initData();