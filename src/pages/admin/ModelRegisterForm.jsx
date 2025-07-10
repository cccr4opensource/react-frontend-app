import { useState, useEffect } from 'react'
import './css/admin-form.css'

function ModelRegisterForm() {
  const [form, setForm] = useState({
    model_name: '',
    brand_id: '',
    category_id: '',
    released_at: '',
    model_image: '',
  })
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // 브랜드, 카테고리 목록 fetch (API 경로는 프로젝트에 맞게 수정)
    fetch('/api/brands').then(r => r.json()).then(setBrands)
    fetch('/api/categories').then(r => r.json()).then(setCategories)
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('모델이 등록되었습니다!')
        setForm({ model_name: '', brand_id: '', category_id: '', released_at: '', model_image: '' })
      } else {
        setMessage('등록 실패')
      }
    } catch {
      setMessage('서버 오류')
    }
  }

return (
  <div className="admin-form-page">
    <div className="admin-form-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>모델 등록</h3>
        <label>
          모델명
          <input name="model_name" value={form.model_name} onChange={handleChange} required />
        </label>
        <label>
          브랜드
          <select name="brand_id" value={form.brand_id} onChange={handleChange} required>
            <option value="">선택</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.category_name}</option>)}
          </select>
        </label>
        <label>
          카테고리
          <select name="category_id" value={form.category_id} onChange={handleChange} required>
            <option value="">선택</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.category_id}</option>)}
          </select>
        </label>
        <label>
          출시일
          <input type="date" name="released_at" value={form.released_at} onChange={handleChange} />
        </label>
        <label>
          모델 이미지 URL
          <input name="model_image" value={form.model_image} onChange={handleChange} />
        </label>
        <button type="submit">등록</button>
        {message && <div className="admin-form-message">{message}</div>}
      </form>
    </div>
  </div>
)

}

export default ModelRegisterForm
