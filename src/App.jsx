import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage'
import ProductPage from './pages/productPage/ProductPage'
import ProductDetailPage from './pages/productDetailPage/ProductDetailPage'

import BrandRegisterForm from './pages/admin/BrandRegisterForm'
import ModelRegisterForm from './pages/admin/ModelRegisterForm'
import ProductRegisterForm from './pages/admin/ProductRegisterForm'
import CategoryRegisterForm from './pages/admin/CategoryRegisterForm'


import './App.css'
import CpuRegisterForm from './pages/admin/CpuRegisterForm'
import MemoryRegisterForm from './pages/admin/MemoryRegisterForm'
import DiskRegisterForm from './pages/admin/DiskRegisterForm'

import AdminMainPage from './pages/admin/AdminMainPage'

import Header from './common/Header'
import Footer from './common/Footer'

function App() {
  return (
    <Router>
      {/* 모든 페이지에 공통 */}
      <Header />  
        {/* main : HTML 시맨틱 태그, 웹 페이지의 주요 콘텐츠를 나타냄 */}
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminMainPage />} />
            
            {/* 상품 관련 페이지 */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            <Route path="/admin/category" element={<CategoryRegisterForm />} />
            <Route path="/admin/brand" element={<BrandRegisterForm />} />
            <Route path="/admin/model" element={<ModelRegisterForm />} />
            <Route path="/admin/product" element={<ProductRegisterForm />} />

            <Route path="/admin/cpu" element={<CpuRegisterForm />} />
            <Route path="/admin/memory" element={<MemoryRegisterForm />} />
            <Route path="/admin/disk" element={<DiskRegisterForm />} />
          </Routes>
        </main>
        {/* 모든 페이지에 공통 */}
      <Footer />     
    </Router>
  )
}

export default App