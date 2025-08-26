import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Layout from './layout';
import Home from './pages/home';
import Products from './pages/products';
import ProductDetail from './pages/product-detail';
import Cases from './pages/cases';
import CaseDetail from './pages/case-detail';
import About from './pages/about';
import Certifications from './pages/certifications';
import InquiryManagement from './pages/inquiry-management';
import { Toaster } from './components/ui/sonner';
import './globals.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="shixiaoya-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/inquiry-management" element={<InquiryManagement />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;