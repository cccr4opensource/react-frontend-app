import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage/MainPage'
import ProductPage from './pages/productPage/ProductPage'
import InfraBoardPage from './pages/infraBoardPage/InfraBoardPage'
import ProductDetailPage from './pages/productDetailPage/ProductDetailPage'

import Header from './common/Header'
import Footer from './common/Footer'


import './App.css'

function App() {
  return (
    <Router>
      {/* 모든 페이지에 공통 */}
      <Header />  
        {/* main : HTML 시맨틱 태그, 웹 페이지의 주요 콘텐츠를 나타냄 */}
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/infra-board" element={<InfraBoardPage />} />
          </Routes>
        </main>
        {/* 모든 페이지에 공통 */}
      <Footer />     
    </Router>
  )
}

export default App