import React, { useState, useEffect } from 'react';
import { inquiryApi, productApi } from '../config/cloudbase';

const InquiryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
    products: []
  });
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productApi.getProducts({ limit: 50 });
      setProducts(response.data || []);
    } catch (error) {
      console.error('加载产品失败:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (product) => {
    const isSelected = selectedProducts.find(p => p._id === product._id);
    if (isSelected) {
      setSelectedProducts(prev => prev.filter(p => p._id !== product._id));
    } else {
      setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev =>
      prev.map(p =>
        p._id === productId ? { ...p, quantity: Math.max(1, parseInt(quantity) || 1) } : p
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inquiryData = {
        ...formData,
        products: selectedProducts.map(p => ({
          productId: p._id,
          productName: p.name,
          quantity: p.quantity
        }))
      };

      await inquiryApi.createInquiry(inquiryData);
      setSubmitted(true);
    } catch (error) {
      console.error('提交询价失败:', error);
      alert('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">询价提交成功</h2>
          <p className="text-gray-600 mb-6">
            我们已收到您的询价信息，将在24小时内与您联系。
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                company: '',
                message: '',
                products: []
              });
              setSelectedProducts([]);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            继续询价
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">产品询价</h1>
          <p className="mt-2 text-gray-600">请填写您的需求信息，我们将为您提供专业报价</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本信息 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">联系信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手机号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的手机号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的邮箱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司名称
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的公司名称"
                />
              </div>
            </div>
          </div>

          {/* 产品选择 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">选择产品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {products.map((product) => {
                const isSelected = selectedProducts.find(p => p._id === product._id);
                return (
                  <div
                    key={product._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={!!isSelected}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">¥{product.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 已选产品 */}
            {selectedProducts.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">已选产品</h3>
                <div className="space-y-3">
                  {selectedProducts.map((product) => (
                    <div key={product._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">¥{product.price}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <label className="text-sm text-gray-700">数量:</label>
                        <input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedProducts(prev => prev.filter(p => p._id !== product._id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          移除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 需求描述 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">需求描述</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细需求 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请详细描述您的需求，包括用途、规格要求、数量、交期等信息..."
              />
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '提交中...' : '提交询价'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryPage;