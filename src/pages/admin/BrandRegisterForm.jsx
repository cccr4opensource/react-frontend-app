import { useState } from 'react'
import './css/admin-form.css'

function BrandRegisterForm() {
  const [form, setForm] = useState({
    name: '',
    logoUrl: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('브랜드가 등록되었습니다!')
        setForm({ name: '', logoUrl: '' })
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
          <h3>브랜드 등록</h3>
          <label>
            브랜드 이름
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            브랜드 이미지 URL
            <input
              name="logoUrl"
              value={form.logoUrl}
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

export default BrandRegisterForm
