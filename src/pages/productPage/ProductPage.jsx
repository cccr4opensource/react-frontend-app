import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './css/ProductPage.css'

function ProductPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')

  // 필터 상태
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    category: 'all',
    brand: 'all',
    priceRange: 'all',
    memory: 'all',
    diskCount: 'all',
    hasSsd: 'all',
    cpu: 'all'
  })

  // URL에서 검색어 가져오기
  const searchTerm = searchParams.get('search') || ''

  useEffect(() => {
    if (searchTerm) {
      setSearchInput(searchTerm) // 검색어를 입력창에 설정
      performSearch(searchTerm)
    }
  }, [searchTerm])

  const performSearch = (term) => {
    console.log('검색 실행:', term)
    setIsLoading(true)
    
    // 가짜 검색 결과 생성 (실제로는 API 호출)
    setTimeout(() => {
      const fakeResults = [
        {
          id: 1,
          title: 'Dell PowerEdge R730 서버',
          model: 'R730',
          category: '서버',
          brand: 'Dell',
          memory: 32,
          disk_count: 2,
          has_ssd: true,
          cpu: 'Intel Xeon E5-2620 v4',
          spec_description: '32GB DDR4, 1TB SSD',
          price: 2800000,
          original_price: 3500000,
          discount: 20,
          condition: '중고 A급',
          seller: '중고나라',
          location: '서울 강남구',
          image_url: 'https://via.placeholder.com/300x200?text=Dell+R730',
          rating: 4.8,
          review_count: 23
        },
        {
          id: 2,
          title: 'HP ProLiant DL380 Gen9',
          model: 'DL380 Gen9',
          category: '서버',
          brand: 'HP',
          memory: 64,
          disk_count: 4,
          has_ssd: false,
          cpu: 'Intel Xeon E5-2690 v3',
          spec_description: '64GB DDR4, 2TB HDD',
          price: 3200000,
          original_price: 4000000,
          discount: 20,
          condition: '중고 B급',
          seller: '당근마켓',
          location: '경기 성남시',
          image_url: 'https://via.placeholder.com/300x200?text=HP+DL380',
          rating: 4.5,
          review_count: 18
        },
        {
          id: 3,
          title: 'Cisco 2960-X 48포트 스위치',
          model: '2960-X',
          category: '네트워크',
          brand: 'Cisco',
          memory: 0,
          disk_count: 0,
          has_ssd: false,
          cpu: 'ARM Cortex-A9',
          spec_description: '48x 1GB 포트, 4x 10GB SFP+ 업링크',
          price: 850000,
          original_price: 1200000,
          discount: 29,
          condition: '중고 A급',
          seller: '서버마트',
          location: '서울 영등포구',
          image_url: 'https://via.placeholder.com/300x200?text=Cisco+2960',
          rating: 4.9,
          review_count: 31
        },
        {
          id: 4,
          title: 'Synology DS920+ NAS',
          model: 'DS920+',
          category: '스토리지',
          brand: 'Synology',
          memory: 4,
          disk_count: 4,
          has_ssd: true,
          cpu: 'Intel Celeron J4125',
          spec_description: '4베이 NAS, 4GB RAM',
          price: 520000,
          original_price: 650000,
          discount: 20,
          condition: '새상품',
          seller: 'IT마켓',
          location: '서울 송파구',
          image_url: 'https://via.placeholder.com/300x200?text=Synology+DS920',
          rating: 4.7,
          review_count: 42
        },
        {
          id: 5,
          title: 'Dell EMC PowerVault MD1220',
          model: 'MD1220',
          category: '스토리지',
          brand: 'Dell',
          memory: 0,
          disk_count: 24,
          has_ssd: true,
          cpu: 'SAS Controller',
          spec_description: '24베이 SAS 스토리지 어레이',
          price: 1800000,
          original_price: 2500000,
          discount: 28,
          condition: '중고 A급',
          seller: '전문업체',
          location: '경기 안양시',
          image_url: 'https://via.placeholder.com/300x200?text=Dell+MD1220',
          rating: 4.6,
          review_count: 15
        },
        {
          id: 6,
          title: 'HPE Aruba 2930F 48포트',
          model: '2930F',
          category: '네트워크',
          brand: 'HP',
          memory: 1,
          disk_count: 0,
          has_ssd: false,
          cpu: 'ARM Cortex-A15',
          spec_description: '48x 1GbE + 4x SFP+ 포트, L3 스위치',
          price: 1200000,
          original_price: 1800000,
          discount: 33,
          condition: '중고 B급',
          seller: '네트워크샵',
          location: '서울 마포구',
          image_url: 'https://via.placeholder.com/300x200?text=HPE+2930F',
          rating: 4.4,
          review_count: 12
        }
      ]
      
      // 카테고리와 브랜드 목록 추출
      const uniqueCategories = [...new Set(fakeResults.map(p => p.category))]
      const uniqueBrands = [...new Set(fakeResults.map(p => p.brand))]
      
      setProducts(fakeResults)
      setCategories(uniqueCategories)
      setBrands(uniqueBrands)
      setIsLoading(false)

      localStorage.setItem('productList', JSON.stringify(fakeResults));
      setIsLoading(false);
    }, 1300)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      // URL 업데이트하여 새로운 검색 실행
      navigate(`/product?search=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const clearAllFilters = () => {
    setFilters({
      sortBy: 'relevance',
      category: 'all',
      brand: 'all',
      priceRange: 'all',
      memory: 'all',
      diskCount: 'all',
      hasSsd: 'all',
      cpu: 'all'
    })
  }

  const goToHome = () => {
    navigate('/')
  }

  const formatPrice = (price) => {
    return price.toLocaleString() + '원'
  }

  const filteredAndSortedProducts = products
    .filter(product => {
      // 카테고리 필터
      if (filters.category !== 'all' && product.category !== filters.category) return false
      
      // 브랜드 필터
      if (filters.brand !== 'all' && product.brand !== filters.brand) return false
      
      // 가격대 필터
      if (filters.priceRange !== 'all') {
        const price = product.price
        switch (filters.priceRange) {
          case 'under1m': if (price >= 1000000) return false; break
          case '1m-2m': if (price < 1000000 || price >= 2000000) return false; break
          case '2m-3m': if (price < 2000000 || price >= 3000000) return false; break
          case 'over3m': if (price < 3000000) return false; break
        }
      }
      
      // 메모리 필터
      if (filters.memory !== 'all') {
        const memory = product.memory
        switch (filters.memory) {
          case 'under8': if (memory >= 8) return false; break
          case '8-32': if (memory < 8 || memory > 32) return false; break
          case '32-64': if (memory < 32 || memory > 64) return false; break
          case 'over64': if (memory <= 64) return false; break
          case 'none': if (memory > 0) return false; break
        }
      }
      
      // 디스크 개수 필터
      if (filters.diskCount !== 'all') {
        const diskCount = product.disk_count
        switch (filters.diskCount) {
          case 'none': if (diskCount > 0) return false; break
          case '1-2': if (diskCount < 1 || diskCount > 2) return false; break
          case '3-8': if (diskCount < 3 || diskCount > 8) return false; break
          case 'over8': if (diskCount <= 8) return false; break
        }
      }
      
      // SSD 유무 필터
      if (filters.hasSsd !== 'all') {
        if (filters.hasSsd === 'true' && !product.has_ssd) return false
        if (filters.hasSsd === 'false' && product.has_ssd) return false
      }
      
      // CPU 브랜드 필터
      if (filters.cpu !== 'all') {
        const cpu = product.cpu.toLowerCase()
        switch (filters.cpu) {
          case 'intel': if (!cpu.includes('intel')) return false; break
          case 'amd': if (!cpu.includes('amd')) return false; break
          case 'arm': if (!cpu.includes('arm')) return false; break
          case 'other': if (cpu.includes('intel') || cpu.includes('amd') || cpu.includes('arm')) return false; break
        }
      }
      
      return true
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'discount': return b.discount - a.discount
        case 'memory': return b.memory - a.memory
        default: return 0 // relevance
      }
    })

  return (
    <div className="product-page">
      <div className="product-container">
        {/* 헤더 영역 */}
        <div className="search-header">
          <button className="back-button" onClick={goToHome}>
            ← 메인으로 돌아가기
          </button>
          
          <div className="search-info-section">
            
            {/* 검색 바 */}
            <div className="search-form-wrapper">
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="IT 장비를 검색하세요..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    🔍 검색
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-section">
            <div className="loading-spinner">🔄</div>
            <p>검색 중입니다...</p>
          </div>
        ) : (
          <div className="results-container">

            {/* 오른쪽 상품 목록 */}
            <div className="products-section">

              {/* 필터 영역 */}
              <div className="filter-dropdown-box">
                <div className="filter-dropdown-group">
                  <label htmlFor="category">카테고리</label>
                  <select id="category" value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
                    <option value="all">전체</option>
                    {categories.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="filter-dropdown-group">
                  <label htmlFor="brand">브랜드</label>
                  <select id="brand" value={filters.brand} onChange={(e) => handleFilterChange('brand', e.target.value)}>
                    <option value="all">전체</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="filter-dropdown-group">
                  <label htmlFor="priceRange">가격대</label>
                  <select id="priceRange" value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
                    <option value="all">전체</option>
                    <option value="under1m">100만원 미만</option>
                    <option value="1m-2m">100만원 - 200만원</option>
                    <option value="2m-3m">200만원 - 300만원</option>
                    <option value="over3m">300만원 이상</option>
                  </select>
                </div>

                <div className="filter-dropdown-group">
                  <label htmlFor="memory">메모리</label>
                  <select id="memory" value={filters.memory} onChange={(e) => handleFilterChange('memory', e.target.value)}>
                    <option value="all">전체</option>
                    <option value="none">없음</option>
                    <option value="under8">8GB 미만</option>
                    <option value="8-32">8GB - 32GB</option>
                    <option value="32-64">32GB - 64GB</option>
                    <option value="over64">64GB 이상</option>
                  </select>
                </div>

                <div className="filter-dropdown-group">
                  <label htmlFor="diskCount">디스크 수</label>
                  <select id="diskCount" value={filters.diskCount} onChange={(e) => handleFilterChange('diskCount', e.target.value)}>
                    <option value="all">전체</option>
                    <option value="none">없음</option>
                    <option value="1-2">1-2개</option>
                    <option value="3-8">3-8개</option>
                    <option value="over8">8개 이상</option>
                  </select>
                </div>

                <div className="filter-dropdown-group">
                  <label htmlFor="hasSsd">SSD</label>
                  <select id="hasSsd" value={filters.hasSsd} onChange={(e) => handleFilterChange('hasSsd', e.target.value)}>
                    <option value="all">전체</option>
                    <option value="true">있음</option>
                    <option value="false">없음</option>
                  </select>
                </div>

                <div className="filter-dropdown-group">
                  <label htmlFor="cpu">CPU 종류</label>
                  <select id="cpu" value={filters.cpu} onChange={(e) => handleFilterChange('cpu', e.target.value)}>
                    <option value="all">전체</option>
                    <option value="intel">Intel</option>
                    <option value="amd">AMD</option>
                    <option value="arm">ARM</option>
                    <option value="other">기타</option>
                  </select>
                </div>
              </div>
              


              <div className="products-grid">
                {filteredAndSortedProducts.map(product => (
                  <div key={product.id} className="product-card">
                    {product.discount > 0 && (
                      <div className="discount-badge">-{product.discount}%</div>
                    )}
                    
                    <div className="product-image">
                      <img src={product.image_url} alt={product.title} />
                    </div>
                    
                    <div className="product-info">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-name">{product.title}</h3>
                      <p className="product-model">모델: {product.model}</p>
                      <p className="product-description">{product.spec_description}</p>
                      
                      <div className="product-specs">
                        {product.memory > 0 && <span className="spec">메모리: {product.memory}GB</span>}
                        {product.disk_count > 0 && <span className="spec">디스크: {product.disk_count}개</span>}
                        {product.has_ssd && <span className="spec ssd">SSD</span>}
                      </div>

                      <div className="product-details">
                        <div className="condition-badge">{product.condition}</div>
                        <div className="rating">
                          ⭐ {product.rating} ({product.review_count})
                        </div>
                      </div>

                      <div className="price-section">
                        {product.original_price > product.price && (
                          <span className="original-price">{formatPrice(product.original_price)}</span>
                        )}
                        <span className="current-price">{formatPrice(product.price)}</span>
                      </div>

                      <div className="seller-info">
                        <span className="seller">📍 {product.seller}</span>
                        <span className="location">{product.location}</span>
                      </div>

                      <button className="contact-button" onClick={() => navigate(`/product/${product.id}`)}>상세보기</button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedProducts.length === 0 && (
                <div className="no-results">
                  <h3>검색 결과가 없습니다</h3>
                  <p>다른 검색어를 시도하거나 필터를 조정해보세요.</p>
                  <button onClick={clearAllFilters}>필터 초기화</button>
                  <button onClick={goToHome}>메인으로 돌아가기</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage