import { useState, useEffect } from 'react'
import axios from 'axios'
import './css/admin-form.css' // 위 CSS를 이 파일에 저장하세요

function ProductRegisterForm() {
  const [form, setForm] = useState({
    modelId: '',
    title: '',
    imageUrl: '',
    originalPrice: '',
    discountPrice: '',
    currency: 'KRW',
    status: '신품',
    location: '',
    hasOs: false,
    osVersion: '',
    osArchitecture: '',
    description: ''
  })
  const [models, setModels] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('/api/models')
      .then(res => setModels(res.data))
      .catch(() => setModels([]))
  }, [])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/products', {
        ...form,
        modelId: Number(form.modelId),
        originalPrice: Number(form.originalPrice),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null
      })
      setMessage('상품이 등록되었습니다!')
      setForm({
        modelId: '',
        title: '',
        imageUrl: '',
        originalPrice: '',
        discountPrice: '',
        currency: 'KRW',
        status: '신품',
        location: '',
        hasOs: false,
        osVersion: '',
        osArchitecture: '',
        description: ''
      })
    } catch {
      setMessage('등록 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '32px 24px' }}>
      <h2 style={{ textAlign: 'center', color: '#1a237e', marginBottom: 24 }}>상품 등록</h2>
      <div className="form-row">
        <label>모델 선택<span className="required">*</span></label>
        <select
          name="modelId"
          value={form.modelId}
          onChange={handleChange}
          required
        >
          <option value="">모델을 선택하세요</option>
          {models.map(m => (
            <option key={m.id} value={m.id}>
              {m.modelName} ({m.brand?.brandName} / {m.category?.categoryName})
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>상품명<span className="required">*</span></label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>이미지 URL</label>
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>정가<span className="required">*</span></label>
        <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>할인가</label>
        <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>통화</label>
        <input name="currency" value={form.currency} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>상태</label>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="신품">신품</option>
          <option value="중고">중고</option>
          <option value="리퍼비시">리퍼비시</option>
        </select>
      </div>
      <div className="form-row">
        <label>위치</label>
        <input name="location" value={form.location} onChange={handleChange} />
      </div>
      <div className="form-row checkbox-row">
        <label>OS 포함</label>
        <input name="hasOs" type="checkbox" checked={form.hasOs} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>OS 버전</label>
        <input name="osVersion" value={form.osVersion} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>OS 아키텍처</label>
        <input name="osArchitecture" value={form.osArchitecture} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>설명</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">상품 등록</button>
      </div>
      {message && <div className="form-message">{message}</div>}
    </form>
  )
}

export default ProductRegisterForm
