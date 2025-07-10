import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/admin-list.css'

function CategoryListTable() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories', {
          headers: { 'Content-Type': 'application/json' }
        })
        setCategories(res.data)
      } catch (err) {
        setError('카테고리 목록 조회 실패')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

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
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                {cat.imageUrl && (
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    width={40}
                    style={{ borderRadius: 6, background: '#f4f4f4' }}
                  />
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
