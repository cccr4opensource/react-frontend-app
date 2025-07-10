import { useState } from 'react'
import './css/admin-form.css'

function CategoryRegisterForm() {
  const [form, setForm] = useState({
    category_id: '',
    image_url: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('카테고리가 등록되었습니다!')
        setForm({ category_id: '', image_url: '' })
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
          <h3>카테고리 등록</h3>
          <label>
            카테고리 이름(서버, 네트워크, 스토리지등)
            <input
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            카테고리 이미지 URL
            <input
              name="image_url"
              value={form.image_url}
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

export default CategoryRegisterForm
