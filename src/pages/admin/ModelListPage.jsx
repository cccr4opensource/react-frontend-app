import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/model-list-large.css'

function ModelListTable() {
  const [models, setModels] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [editModelName, setEditModelName] = useState('')
  const [editBrandId, setEditBrandId] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [editModelImage, setEditModelImage] = useState('')
  const [editReleasedAt, setEditReleasedAt] = useState('')

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [modelRes, brandRes, categoryRes] = await Promise.all([
        axios.get('/api/models'),
        axios.get('/api/brands'),
        axios.get('/api/categories')
      ])
      setModels(modelRes.data)
      setBrands(brandRes.data)
      setCategories(categoryRes.data)
    } catch {
      setError('목록 조회 실패')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await axios.delete(`/api/models/${id}`)
      setModels(models.filter(model => model.id !== id))
    } catch {
      alert('삭제 실패')
    }
  }

  const handleEdit = (model) => {
    setEditing(model.id)
    setEditModelName(model.modelName)
    setEditBrandId(model.brand?.id || '')
    setEditCategoryId(model.category?.id || '')
    setEditModelImage(model.modelImage || '')
    setEditReleasedAt(model.releasedAt || '')
  }

  const handleSave = async (id) => {
    try {
      await axios.put(`/api/models/${id}`, {
        modelName: editModelName,
        modelImage: editModelImage,
        releasedAt: editReleasedAt,
        brand: { id: editBrandId },
        category: { id: editCategoryId }
      })
      setModels(models.map(model =>
        model.id === id
          ? {
              ...model,
              modelName: editModelName,
              modelImage: editModelImage,
              releasedAt: editReleasedAt,
              brand: brands.find(b => b.id === +editBrandId) || null,
              category: categories.find(c => c.id === +editCategoryId) || null
            }
          : model
      ))
      setEditing(null)
    } catch {
      alert('수정 실패')
    }
  }

  if (loading) return <div style={{ fontSize: '2rem', textAlign: 'center', margin: '40px 0' }}>로딩 중...</div>
  if (error) return <div style={{ fontSize: '2rem', textAlign: 'center', margin: '40px 0' }}>{error}</div>

  return (
    <div className="admin-list-page large">
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>모델 목록</h2>
      <table className="model-list-table large">
        <thead>
          <tr>
            <th>ID</th>
            <th>모델명</th>
            <th>브랜드</th>
            <th>카테고리</th>
            <th>이미지</th>
            <th>출시일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => (
            <tr key={model.id}>
              <td>{model.id}</td>
              <td>
                {editing === model.id ? (
                  <input
                    style={{ fontSize: '1.2rem', width: 160 }}
                    value={editModelName}
                    onChange={e => setEditModelName(e.target.value)}
                  />
                ) : (
                  <span style={{ fontSize: '1.2rem' }}>{model.modelName}</span>
                )}
              </td>
              <td>
                {editing === model.id ? (
                  <select
                    style={{ fontSize: '1.1rem', width: 130 }}
                    value={editBrandId}
                    onChange={e => setEditBrandId(e.target.value)}
                  >
                    <option value="">선택</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span style={{ fontSize: '1.1rem' }}>{model.brand?.name || '-'}</span>
                )}
              </td>
              <td>
                {editing === model.id ? (
                  <select
                    style={{ fontSize: '1.1rem', width: 130 }}
                    value={editCategoryId}
                    onChange={e => setEditCategoryId(e.target.value)}
                  >
                    <option value="">선택</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span style={{ fontSize: '1.1rem' }}>{model.category?.name || '-'}</span>
                )}
              </td>
              <td>
                {editing === model.id ? (
                  <input
                    style={{ fontSize: '1.1rem', width: 200 }}
                    value={editModelImage}
                    onChange={e => setEditModelImage(e.target.value)}
                  />
                ) : (
                  model.modelImage && (
                    <img
                      src={model.modelImage}
                      alt={model.modelName}
                      width={80}
                      height={80}
                      style={{ borderRadius: 10, background: '#f4f4f4', objectFit: 'contain' }}
                    />
                  )
                )}
              </td>
              <td>
                {editing === model.id ? (
                  <input
                    type="date"
                    style={{ fontSize: '1.1rem', width: 160 }}
                    value={editReleasedAt}
                    onChange={e => setEditReleasedAt(e.target.value)}
                  />
                ) : (
                  <span style={{ fontSize: '1.1rem' }}>{model.releasedAt || '-'}</span>
                )}
              </td>
              <td>
                {editing === model.id ? (
                  <>
                    <button style={{ fontSize: '1.1rem', padding: '8px 18px' }} onClick={() => handleSave(model.id)}>저장</button>
                    <button style={{ fontSize: '1.1rem', padding: '8px 18px', marginLeft: 8 }} onClick={() => setEditing(null)}>취소</button>
                  </>
                ) : (
                  <>
                    <button style={{ fontSize: '1.1rem', padding: '8px 18px' }} onClick={() => handleEdit(model)}>수정</button>
                    <button style={{ fontSize: '1.1rem', padding: '8px 18px', marginLeft: 8 }} onClick={() => handleDelete(model.id)}>삭제</button>
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

export default ModelListTable
