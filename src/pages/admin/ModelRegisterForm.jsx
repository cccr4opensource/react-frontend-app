import { useState, useEffect } from 'react'
import axios from 'axios'
import './css/admin-form.css'

function ModelRegisterForm() {
  const [form, setForm] = useState({
    modelName: '',
    brandId: '',
    categoryId: '',
    modelImage: '',
    releasedAt: ''
  })
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // 브랜드와 카테고리 목록을 미리 불러옴
    const fetchOptions = async () => {
      try {
        const [brandRes, categoryRes] = await Promise.all([
          axios.get('/api/brands'),
          axios.get('/api/categories')
        ])
        setBrands(brandRes.data)
        setCategories(categoryRes.data)
      } catch {
        setMessage('브랜드/카테고리 목록 불러오기 실패')
      }
    }
    fetchOptions()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/models', {
        modelName: form.modelName,
        modelImage: form.modelImage,
        releasedAt: form.releasedAt,
        brand: { id: form.brandId },
        category: { id: form.categoryId }
      })
      setMessage('모델이 등록되었습니다!')
      setForm({
        modelName: '',
        brandId: '',
        categoryId: '',
        modelImage: '',
        releasedAt: ''
      })
    } catch {
      setMessage('등록 실패')
    }
  }

  return (
    <div className="admin-form-page">
      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>모델 등록</h3>
          <label>
            모델명
            <input
              name="modelName"
              value={form.modelName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            브랜드
            <select
              name="brandId"
              value={form.brandId}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            카테고리
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            모델 이미지 URL
            <input
              name="modelImage"
              value={form.modelImage}
              onChange={handleChange}
            />
          </label>
          <label>
            출시일
            <input
              name="releasedAt"
              type="date"
              value={form.releasedAt}
              onChange={handleChange}
            />
          </label>
          <button type="submit">등록</button>
          {message && <div className="admin-form-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default ModelRegisterForm
