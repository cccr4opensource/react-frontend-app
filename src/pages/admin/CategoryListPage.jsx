
// 카테고리의 RUD를 담당! //
import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/admin-list.css'

function CategoryListTable() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [editName, setEditName] = useState('')
  const [editImageUrl, setEditImageUrl] = useState('')

  // 컴포넌트가 처음 화면에 마운트(렌더링)될 때 한 번만 fetchCategories()를 호출해서 데이터를 불러오게 합니다.
  useEffect(() => {
    fetchCategories()
  }, [])

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch {
      setError('카테고리 목록 조회 실패')
    } finally {
      setLoading(false)
    }
  }

  // 삭제 기능
  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await axios.delete(`/api/categories/${id}`)
      setCategories(categories.filter(cat => cat.id !== id))
    } catch {
      alert('삭제 실패')
    }
  }

  // 수정 버튼 클릭 시
  const handleEdit = (cat) => {
    setEditing(cat.id)
    setEditName(cat.name)
    setEditImageUrl(cat.imageUrl || '')
  }

  // 수정 저장
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/categories/${id}`, {
        name: editName,
        imageUrl: editImageUrl,
      })
      setCategories(categories.map(cat =>
        cat.id === id ? { ...cat, name: editName, imageUrl: editImageUrl } : cat
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
      <h2>카테고리 목록</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이미지</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                {editing === cat.id ? (
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editing === cat.id ? (
                  <input
                    value={editImageUrl}
                    onChange={e => setEditImageUrl(e.target.value)}
                  />
                ) : (
                  cat.imageUrl && (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      width={40}
                      style={{ borderRadius: 6, background: '#f4f4f4' }}
                    />
                  )
                )}
              </td>
              <td>
                {editing === cat.id ? (
                  <>
                    <button onClick={() => handleSave(cat.id)}>저장</button>
                    <button onClick={() => setEditing(null)}>취소</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(cat)}>수정</button>
                    <button onClick={() => handleDelete(cat.id)}>삭제</button>
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

export default CategoryListTable
