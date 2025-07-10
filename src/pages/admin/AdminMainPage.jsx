import { Link } from 'react-router-dom'
import './css/admin-form.css'

function AdminMainPage() {
  return (
    <div className="admin-form-page">
      <div className="admin-form-container" style={{ maxWidth: 600 }}>
        <h2 style={{ textAlign: 'center', color: '#4285f4', marginBottom: 32 }}>관리자 등록 메뉴</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <li>
            <Link to="/admin/category" className="admin-menu-link">카테고리 등록</Link>
          </li>
          <li>
            <Link to="/admin/brand" className="admin-menu-link">브랜드 등록</Link>
          </li>
          <li>
            <Link to="/admin/model" className="admin-menu-link">모델 등록</Link>
          </li>
          <li>
            <Link to="/admin/cpu" className="admin-menu-link">CPU 등록</Link>
          </li>
          <li>
            <Link to="/admin/memory" className="admin-menu-link">메모리 등록</Link>
          </li>
          <li>
            <Link to="/admin/disk" className="admin-menu-link">디스크 등록</Link>
          </li>
          <li>
            <Link to="/admin/product" className="admin-menu-link">제품 등록</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminMainPage
