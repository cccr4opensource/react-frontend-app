import './css/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 회사 정보 */}
        <div className="footer-section">
          <div className="footer-logo">
            <span className="footer-logo-icon">💻</span>
            <span className="footer-logo-text">서버팜</span>
          </div>
          <p className="footer-description">
            중고 IT 장비 전문 가격비교 플랫폼<br/>
            신뢰할 수 있는 거래를 위한 최고의 선택
          </p>
        </div>

        {/* 서비스 링크 */}
        <div className="footer-section">
          <h4 className="footer-title">서비스</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">가격비교</a></li>
            <li><a href="#" className="footer-link">카테고리</a></li>
            <li><a href="#" className="footer-link">판매자 등록</a></li>
            <li><a href="#" className="footer-link">구매 가이드</a></li>
          </ul>
        </div>

        {/* 고객지원 */}
        <div className="footer-section">
          <h4 className="footer-title">고객지원</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">자주 묻는 질문</a></li>
            <li><a href="#" className="footer-link">1:1 문의</a></li>
            <li><a href="#" className="footer-link">신고하기</a></li>
            <li><a href="#" className="footer-link">공지사항</a></li>
          </ul>
        </div>

        {/* 회사 정보 */}
        <div className="footer-section">
          <h4 className="footer-title">회사정보</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">회사소개</a></li>
            <li><a href="#" className="footer-link">이용약관</a></li>
            <li><a href="#" className="footer-link">개인정보처리방침</a></li>
            <li><a href="#" className="footer-link">채용정보</a></li>
          </ul>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-copyright">
            <p>&copy; 2025 서버팜. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">🌐</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer