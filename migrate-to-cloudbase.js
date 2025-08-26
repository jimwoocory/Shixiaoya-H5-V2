const tcb = require('@cloudbase/node-sdk');
const { PrismaClient } = require('@prisma/client');

// 初始化
const app = tcb.init({
  env: process.env.TCB_ENV_ID
});
const db = app.database();
const prisma = new PrismaClient();

async function migrateData() {
  console.log('🔄 开始数据迁移...');

  try {
    // 迁移分类数据
    console.log('📂 迁移分类数据...');
    const categories = await prisma.category.findMany({
      where: { isActive: true }
    });

    for (const category of categories) {
      await db.collection('categories').add({
        _id: category.id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        sort: category.sort,
        isActive: category.isActive,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      });
    }
    console.log(`✅ 已迁移 ${categories.length} 个分类`);

    // 迁移产品数据
    console.log('📦 迁移产品数据...');
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true }
    });

    for (const product of products) {
      await db.collection('products').add({
        _id: product.id.toString(),
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price.toNumber(),
        originalPrice: product.originalPrice?.toNumber(),
        images: product.images,
        specifications: product.specifications,
        features: product.features,
        categoryId: product.categoryId.toString(),
        categoryName: product.category.name,
        isHot: product.isHot,
        isNew: product.isNew,
        stock: product.stock,
        sort: product.sort,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      });
    }
    console.log(`✅ 已迁移 ${products.length} 个产品`);

    // 迁移询价数据
    console.log('📋 迁移询价数据...');
    const inquiries = await prisma.inquiry.findMany({
      include: {
        products: {
          include: { product: true }
        }
      }
    });

    for (const inquiry of inquiries) {
      await db.collection('inquiries').add({
        _id: inquiry.id.toString(),
        name: inquiry.name,
        phone: inquiry.phone,
        email: inquiry.email,
        company: inquiry.company,
        message: inquiry.message,
        status: inquiry.status,
        adminReply: inquiry.adminReply,
        repliedAt: inquiry.repliedAt,
        products: inquiry.products.map(p => ({
          productId: p.productId.toString(),
          productName: p.product.name,
          quantity: p.quantity
        })),
        createdAt: inquiry.createdAt,
        updatedAt: inquiry.updatedAt
      });
    }
    console.log(`✅ 已迁移 ${inquiries.length} 个询价`);

    // 迁移案例数据
    console.log('🏗️  迁移案例数据...');
    const cases = await prisma.case.findMany({
      where: { isActive: true }
    });

    for (const caseItem of cases) {
      await db.collection('cases').add({
        _id: caseItem.id.toString(),
        title: caseItem.title,
        slug: caseItem.slug,
        description: caseItem.description,
        location: caseItem.location,
        area: caseItem.area,
        projectType: caseItem.projectType,
        images: caseItem.images,
        materials: caseItem.materials,
        clientName: caseItem.clientName,
        completedAt: caseItem.completedAt,
        isActive: caseItem.isActive,
        sort: caseItem.sort,
        createdAt: caseItem.createdAt,
        updatedAt: caseItem.updatedAt
      });
    }
    console.log(`✅ 已迁移 ${cases.length} 个案例`);

    // 迁移用户数据
    console.log('👥 迁移用户数据...');
    const users = await prisma.user.findMany({
      where: { isActive: true }
    });

    for (const user of users) {
      await db.collection('users').add({
        _id: user.id.toString(),
        username: user.username,
        email: user.email,
        password: user.password, // 注意：生产环境中应重新设置密码
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    }
    console.log(`✅ 已迁移 ${users.length} 个用户`);

    console.log('🎉 数据迁移完成！');

  } catch (error) {
    console.error('❌ 迁移失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行迁移
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };