import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './css/Header.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState('')

  // 현재 경로에 따라 activeMenu 자동 설정
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveMenu('') // 메인페이지에서는 활성 메뉴 없음
        break
      case '/product':
        setActiveMenu('제품 보러가기')
        break
      case '/compare':
        setActiveMenu('브랜드별 보기')
        break
      case '/infra-board':
        setActiveMenu('인프라 관련 문서')
        break
      default:
        setActiveMenu('')
    }
  }, [location.pathname])

  const goToHome = () => {
    navigate('/')
    // setActiveMenu는 useEffect에서 자동으로 처리됨
  }

  const handleMenuClick = (e, menu, path) => {
    e.preventDefault()
    setActiveMenu(menu)
    navigate(path)
    console.log(`${menu} 메뉴 클릭 - ${path}로 이동`)
  }

  const handleCategoryClick = (e, category) => {
    e.preventDefault()
    console.log(`${category} 카테고리 선택됨`)
    // 실제로는 navigate(`/product/${category}`) 등으로 페이지 이동
  }

  const handleSupportClick = (e, support) => {
    e.preventDefault()
    console.log(`${support} 선택됨`)
    // 실제로는 navigate(`/support/${support}`) 등으로 페이지 이동
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 */}
        <div className="logo" onClick={goToHome}>
          <span className="logo-icon">💻</span>
          <span className="logo-text">서버팜</span>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="nav-menu">
          <a href="/"
            className={`nav-item ${activeMenu === '홈' ? 'active' : ''}`}
            onClick={(e) => handleMenuClick(e, '홈', '/')}>
            홈
          </a>

          {/* 카테고리 드롭다운 */}
          <div className="dropdown">
            <div className="nav-item dropdown-toggle">
              카테고리
            </div>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item"
                onClick={(e) => handleCategoryClick(e, '서버')}>
                🖥️ 서버
              </a>
              <a href="#" className="dropdown-item"
                onClick={(e) => handleCategoryClick(e, '네트워크')}>
                📡 네트워크
              </a>
              <a href="#" className="dropdown-item"
                onClick={(e) => handleCategoryClick(e, '스토리지')}>
                💾 스토리지
              </a>
              <a href="#" className="dropdown-item"
                onClick={(e) => handleCategoryClick(e, '기타 인프라')}>
                🔧 기타 인프라
              </a>
            </div>
          </div>

          {/* 인프라 관련 문서 - nav-item 클래스 추가 */}
          <a
            href="#"
            className={`nav-item ${activeMenu === '인프라 관련 문서' ? 'active' : ''}`}
            onClick={(e) => handleMenuClick(e, '인프라 관련 문서', '/infra-board')}
          >
            인프라 관련 문서
          </a>

          {/* 고객지원 드롭다운 */}
          <div className="dropdown">
            <div className="nav-item dropdown-toggle">
              고객지원
            </div>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item"
                onClick={(e) => handleSupportClick(e, 'FAQ')}>
                ❓ 자주 묻는 질문
              </a>
              <a href="#" className="dropdown-item"
                onClick={(e) => handleSupportClick(e, '문의')}>
                💬 1:1 문의
              </a>
              <a href="#" className="dropdown-item"
                onClick={(e) => handleSupportClick(e, '신고')}>
                🚨 신고하기
              </a>
              <a href="#" className="dropdown-item"
                onClick={(e) => handleSupportClick(e, '공지사항')}>
                📢 공지사항
              </a>
            </div>
          </div>
        </nav>

        {/* 사용자 메뉴 */}
        <div className="user-menu">
          <button className="user-btn">로그인</button>
          <button className="user-btn primary">회원가입</button>
        </div>
      </div>
    </header>
  )
}

export default Header