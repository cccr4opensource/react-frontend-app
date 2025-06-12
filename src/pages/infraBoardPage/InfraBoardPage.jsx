import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ServerIcon,
  ServerStackIcon, 
  WifiIcon,
  CircleStackIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import './css/InfraBoardPage.css'

function InfraBoardPage() {
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 목록
  const categories = [
    { id: 'all', name: '전체', icon: CircleStackIcon, color: '#6c757d' },
    { id: 'server', name: '서버', icon: ServerIcon, color: '#4285f4' },
    { id: 'network', name: '네트워크', icon: WifiIcon, color: '#28a745' },
    { id: 'storage', name: '스토리지', icon: ServerStackIcon, color: '#fd7e14' }
  ]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    setIsLoading(true)
    
    // 가짜 게시글 데이터 (실제로는 API 호출)
    setTimeout(() => {
      const fakePosts = [
        {
          id: 1,
          title: 'Dell PowerEdge R730 서버 구축 가이드',
          content: 'Dell PowerEdge R730 서버의 초기 설정부터 운영까지 완벽 가이드입니다.',
          category: 'server',
          author: '서버관리자',
          createdAt: '2024-03-15',
          views: 1247,
          comments: 23,
          tags: ['Dell', 'PowerEdge', 'R730', '서버구축'],
          isHot: true
        },
        {
          id: 2,
          title: 'Cisco 스위치 VLAN 설정 방법',
          content: 'Cisco 스위치에서 VLAN을 설정하는 방법과 트러블슈팅 가이드',
          category: 'network',
          author: '네트워크엔지니어',
          createdAt: '2024-03-14',
          views: 892,
          comments: 15,
          tags: ['Cisco', 'VLAN', '네트워크', '스위치'],
          isHot: false
        },
        {
          id: 3,
          title: 'HP ProLiant DL380 성능 최적화 팁',
          content: 'HP ProLiant DL380 서버의 성능을 최대한 끌어올리는 최적화 방법들',
          category: 'server',
          author: 'HPE전문가',
          createdAt: '2024-03-13',
          views: 1563,
          comments: 31,
          tags: ['HP', 'ProLiant', 'DL380', '성능최적화'],
          isHot: true
        },
        {
          id: 4,
          title: 'SAN 스토리지 구축 사례 연구',
          content: '대용량 SAN 스토리지 구축 프로젝트의 실제 사례와 경험담',
          category: 'storage',
          author: '스토리지전문가',
          createdAt: '2024-03-12',
          views: 674,
          comments: 8,
          tags: ['SAN', '스토리지', '구축사례'],
          isHot: false
        },
        {
          id: 5,
          title: 'VMware vSphere 7.0 설치 및 설정',
          content: 'VMware vSphere 7.0의 설치부터 클러스터 구성까지',
          category: 'server',
          author: '가상화전문가',
          createdAt: '2024-03-11',
          views: 2156,
          comments: 45,
          tags: ['VMware', 'vSphere', '가상화', '클러스터'],
          isHot: true
        },
        {
          id: 6,
          title: 'Juniper 방화벽 정책 설정 가이드',
          content: 'Juniper SRX 시리즈 방화벽의 보안 정책 설정 방법',
          category: 'network',
          author: '보안관리자',
          createdAt: '2024-03-10',
          views: 445,
          comments: 12,
          tags: ['Juniper', '방화벽', 'SRX', '보안정책'],
          isHot: false
        }
      ]
      
      setPosts(fakePosts)
      setIsLoading(false)
    }, 800)
  }

  const goToHome = () => {
    navigate('/')
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // 검색 로직 구현
    console.log('검색어:', searchTerm)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '오늘'
    if (diffDays === 2) return '어제'
    if (diffDays <= 7) return `${diffDays-1}일 전`
    return dateString
  }

  const filteredAndSortedPosts = posts
    .filter(post => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false
      if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views': return b.views - a.views
        case 'comments': return b.comments - a.comments
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        default: return new Date(b.createdAt) - new Date(a.createdAt) // latest
      }
    })

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0]
  }

  return (
    <div className="infra-board-page">
      <div className="board-container">
        {/* 헤더 영역 */}
        <div className="board-header">
          <button className="back-button" onClick={goToHome}>
            ← 메인으로 돌아가기
          </button>
          
          <div className="board-title-section">
            <h1>인프라 관련 문서</h1>
            <p>서버, 네트워크, 스토리지 인프라 관련 기술 문서와 경험을 공유하세요</p>
          </div>

          <button className="write-button">
            <PlusIcon className="write-icon" />
            글쓰기
          </button>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="search-filter-section">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-container">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                type="text"
                placeholder="제목, 내용, 태그로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          <div className="filter-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="latest">최신순</option>
              <option value="views">조회순</option>
              <option value="comments">댓글순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="category-tabs">
          {categories.map(category => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                style={{ '--category-color': category.color }}
              >
                <IconComponent className="category-icon" />
                <span>{category.name}</span>
                <span className="post-count">
                  ({category.id === 'all' ? posts.length : posts.filter(p => p.category === category.id).length})
                </span>
              </button>
            )
          })}
        </div>

        {/* 게시글 목록 */}
        {isLoading ? (
          <div className="loading-section">
            <div className="loading-spinner">🔄</div>
            <p>게시글을 불러오는 중...</p>
          </div>
        ) : (
          <div className="posts-section">
            <div className="posts-header">
              <h2>게시글 목록 ({filteredAndSortedPosts.length})</h2>
            </div>

            <div className="posts-list">
              {filteredAndSortedPosts.map(post => {
                const categoryInfo = getCategoryInfo(post.category)
                const IconComponent = categoryInfo.icon
                
                return (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="post-category" style={{ color: categoryInfo.color }}>
                        <IconComponent className="category-small-icon" />
                        {categoryInfo.name}
                      </div>
                      {post.isHot && <span className="hot-badge">🔥 HOT</span>}
                    </div>

                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{post.content}</p>

                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>

                    <div className="post-meta">
                      <div className="post-author">
                        <span>작성자: {post.author}</span>
                      </div>
                      
                      <div className="post-stats">
                        <span className="stat">
                          <CalendarIcon className="stat-icon" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="stat">
                          <EyeIcon className="stat-icon" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="stat">
                          <ChatBubbleLeftIcon className="stat-icon" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredAndSortedPosts.length === 0 && (
              <div className="no-posts">
                <h3>게시글이 없습니다</h3>
                <p>첫 번째 게시글을 작성해보세요!</p>
                <button className="write-button-secondary">
                  <PlusIcon className="write-icon" />
                  글쓰기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default InfraBoardPage