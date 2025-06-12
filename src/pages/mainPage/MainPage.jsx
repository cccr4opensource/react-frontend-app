import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ServerIcon,
  ServerStackIcon, 
  WifiIcon,
  CircleStackIcon 
} from '@heroicons/react/24/outline'
import './css/MainPage.css'

function MainPage() {
  const navigate = useNavigate() // 페이지 이동을 위한 hook

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  
  // 토스트 메시지 상태 추가
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 3000)
  }

  const handleSearch = () => {
    console.log('검색 버튼 클릭됨!')
    console.log('현재 검색어:', searchTerm)
    
    if (searchTerm.trim()) {
      // /product 페이지로 이동하면서 검색어 전달
      navigate(`/product?search=${encodeURIComponent(searchTerm)}`)
      showToast('검색을 시작합니다! 🔍', 'success')
    } else {
      // alert() 대신 토스트 메시지
      showToast('검색어를 입력해주세요! 💭')
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    console.log("선택된 카테고리:", category)
  }

  const handleQuickSearch = (term) => {
    setSearchTerm(term)
    console.log("빠른 검색", term)
    
    // 빠른 검색 버튼 클릭 시 바로 검색 페이지로 이동
    setTimeout(() => {
      navigate(`/product?search=${encodeURIComponent(term)}`)
      showToast(`"${term}" 검색을 시작합니다! 🚀`, 'success')
    }, 100)
  }

  return (
    <div className="main-page">
      <div className="main-container">
        <h1 className="main-title">중고 IT 장비 가격 검색</h1>
        <p className="main-subtitle">
          서버, 네트워크, 스토리지 장비의 실시간 가격을 각 플랫폼별로 비교하고<br/>
          최적의 거래처를 찾아보세요
        </p>

        <div className="search-section">
          <input 
            type="text"
            className="search-input"
            placeholder="제품명, 모델명을 입력하세요. (ex: Dell R730, Cisco 2960)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <button className="search-button" onClick={handleSearch}>검색 →</button>
        </div>

        <div className="category-section">
          <h3 className="category-title">또는 카테고리로 찾기</h3>
          
          <div className="category-buttons">
            <div className="category-card" onClick={() => handleCategoryClick('전체')}>
              <div className="category-icon">
                <ServerStackIcon className="icon-svg" />
              </div>
              <span className="category-name">전체</span>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('서버')}>
              <div className="category-icon">
                <ServerIcon className="icon-svg" />
              </div>
              <span className="category-name">서버</span>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('네트워크')}>
              <div className="category-icon">
                <WifiIcon className="icon-svg" />
              </div>
              <span className="category-name">네트워크</span>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('스토리지')}>
              <div className="category-icon">
                <CircleStackIcon className="icon-svg" />
              </div>
              <span className="category-name">스토리지</span>
            </div>
          </div>

          {selectedCategory && (
            <div className="selected-category">
              선택된 카테고리: {selectedCategory}
            </div>
          )}
        </div>

        <div className="quick-search-section">
          <h4 className="quick-search-title">빠른 검색 예시</h4>
          <div className="quick-search-buttons">
            <button className="quick-search-button" onClick={() => handleQuickSearch('Dell')}>Dell</button>
            <button className="quick-search-button" onClick={() => handleQuickSearch('HP ProLiant')}>HP ProLiant</button>
            <button className="quick-search-button" onClick={() => handleQuickSearch('Cisco 2960')}>Cisco 2960</button>
            <button className="quick-search-button" onClick={() => handleQuickSearch('Synology NAS')}>Synology NAS</button>
          </div>
        </div>

        {/* 서비스 소개 섹션 */}
        <div className="service-intro">
          <h2 className="service-title">왜 우리 서비스인가요?</h2>
          
          <div className="service-grid">
            {/* 실시간 가격 비교 */}
            <div className="service-item">
              <div className="service-icon price-compare">📈</div>
              <h3 className="service-name">실시간 가격 비교</h3>
              <p className="service-description">
                여러 플랫폼의 가격을 실시간으로 비교하여 최저가를 찾아드립니다.
              </p>
            </div>

            {/* 합리적인 가격 */}
            <div className="service-item">
              <div className="service-icon reasonable-price">💲</div>
              <h3 className="service-name">합리적인 가격</h3>
              <p className="service-description">
                시장 가격 동향을 분석하여 적정 가격을 제시해드립니다.
              </p>
            </div>

            {/* 검증된 판매자 */}
            <div className="service-item">
              <div className="service-icon verified-seller">👥</div>
              <h3 className="service-name">검증된 판매자</h3>
              <p className="service-description">
                신뢰할 수 있는 판매자들과 안전한 거래를 보장합니다.
              </p>
            </div>

            {/* 품질 보증 */}
            <div className="service-item">
              <div className="service-icon quality-guarantee">🛡️</div>
              <h3 className="service-name">품질 보증</h3>
              <p className="service-description">
                모든 장비의 상태와 품질을 철저히 검증합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'success' ? '✅' : '⚠️'} {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage