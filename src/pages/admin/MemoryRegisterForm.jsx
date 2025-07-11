import { useState } from 'react'
import axios from 'axios'
import './css/admin-form.css'

function MemoryRegisterForm() {
  const [form, setForm] = useState({
    name: '', size: '', type: '', speed: '', formFactor: '', manufacturer: '', description: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/memories', {
        ...form,
        size: Number(form.size),
        speed: Number(form.speed)
      })
      setMessage('메모리가 등록되었습니다!')
      setForm({
        name: '', size: '', type: '', speed: '', formFactor: '', manufacturer: '', description: ''
      })
    } catch {
      setMessage('등록 실패')
    }
  }

  return (
    <div className="parts-form-page">
      <form className="parts-form" onSubmit={handleSubmit}>
        <h3>메모리 등록</h3>
        <label>
          이름
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          용량(GB)
          <input name="size" type="number" value={form.size} onChange={handleChange} required />
        </label>
        <label>
          타입
          <input name="type" value={form.type} onChange={handleChange} required />
        </label>
        <label>
          속도(MHz)
          <input name="speed" type="number" value={form.speed} onChange={handleChange} />
        </label>
        <label>
          폼팩터
          <input name="formFactor" value={form.formFactor} onChange={handleChange} />
        </label>
        <label>
          제조사
          <input name="manufacturer" value={form.manufacturer} onChange={handleChange} />
        </label>
        <label>
          설명
          <input name="description" value={form.description} onChange={handleChange} />
        </label>
        <button type="submit">등록</button>
        {message && <div className="parts-form-message">{message}</div>}
      </form>
    </div>
  )
}

export default MemoryRegisterForm
