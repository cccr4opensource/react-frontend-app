import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/admin-list.css'

function BrandListTable() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [editName, setEditName] = useState('')
  const [editLogoUrl, setEditLogoUrl] = useState('')

  // 컴포넌트 마운트 시 브랜드 목록 조회
  useEffect(() => {
    fetchBrands()
  }, [])

  // 브랜드 목록 조회
  const fetchBrands = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/brands')
      setBrands(res.data)
    } catch {
      setError('브랜드 목록 조회 실패')
    } finally {
      setLoading(false)
    }
  }

  // 삭제 기능
  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await axios.delete(`/api/brands/${id}`)
      setBrands(brands.filter(brand => brand.id !== id))
    } catch {
      alert('삭제 실패')
    }
  }

  // 수정 버튼 클릭 시
  const handleEdit = (brand) => {
    setEditing(brand.id)
    setEditName(brand.name)
    setEditLogoUrl(brand.logoUrl || '')
  }

  // 수정 저장
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/brands/${id}`, {
        name: editName,
        logoUrl: editLogoUrl,
      })
      setBrands(brands.map(brand =>
        brand.id === id ? { ...brand, name: editName, logoUrl: editLogoUrl } : brand
      ))
      setEditing(null)
    } catch {
      alert('수정 실패')
    }
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="admin-list-page">
      <h2>브랜드 목록</h2>
      <table className="brand-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>로고</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>
                {editing === brand.id ? (
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                ) : (
                  brand.name
                )}
              </td>
              <td>
                {editing === brand.id ? (
                  <input
                    value={editLogoUrl}
                    onChange={e => setEditLogoUrl(e.target.value)}
                  />
                ) : (
                  brand.logoUrl && (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      width={40}
                      style={{ borderRadius: 6, background: '#f4f4f4', objectFit: 'contain' }}
                    />
                  )
                )}
              </td>
              <td>
                {editing === brand.id ? (
                  <>
                    <button onClick={() => handleSave(brand.id)}>저장</button>
                    <button onClick={() => setEditing(null)}>취소</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(brand)}>수정</button>
                    <button onClick={() => handleDelete(brand.id)}>삭제</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BrandListTable
