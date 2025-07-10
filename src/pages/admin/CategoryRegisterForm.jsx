import { useState } from 'react'
import axios from 'axios'
import './css/admin-form.css'

function CategoryRegisterForm() {
  const [form, setForm] = useState({
    name: '',
    imageUrl: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/categories', form)
      if (res.status === 200 || res.status === 201) {
        setMessage('카테고리가 등록되었습니다!')
        setForm({ name: '', imageUrl: '' })
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
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            카테고리 이미지 URL
            <input
              name="imageUrl"
              value={form.imageUrl}
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
