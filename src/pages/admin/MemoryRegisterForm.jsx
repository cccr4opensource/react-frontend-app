import { useState } from 'react'
import './css/admin-form.css'

function MemoryRegisterForm() {
  const [form, setForm] = useState({
    model_name: '',
    manufacturer: '',
    capacity_gb: '',
    type: '',
    speed_mhz: '',
    form_factor: '',
    description: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('메모리가 등록되었습니다!')
        setForm({
          model_name: '', manufacturer: '', capacity_gb: '', type: '',
          speed_mhz: '', form_factor: '', description: ''
        })
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
          <h3>메모리 등록</h3>
          <label>모델명<input name="model_name" value={form.model_name} onChange={handleChange} required /></label>
          <label>제조사<input name="manufacturer" value={form.manufacturer} onChange={handleChange} /></label>
          <label>용량(GB)<input type="number" name="capacity_gb" value={form.capacity_gb} onChange={handleChange} /></label>
          <label>타입<input name="type" value={form.type} onChange={handleChange} /></label>
          <label>속도(MHz)<input type="number" name="speed_mhz" value={form.speed_mhz} onChange={handleChange} /></label>
          <label>폼팩터<input name="form_factor" value={form.form_factor} onChange={handleChange} /></label>
          <label>상세 설명<input name="description" value={form.description} onChange={handleChange} /></label>
          <button type="submit">등록</button>
          {message && <div className="admin-form-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default MemoryRegisterForm
