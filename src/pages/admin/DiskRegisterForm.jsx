import { useState } from 'react'
import './css/admin-form.css'

function DiskRegisterForm() {
  const [form, setForm] = useState({
    model_name: '',
    manufacturer: '',
    capacity_gb: '',
    capacity_unit: '',
    type: '',
    interface_type: '',
    form_factor: '',
    rpm: '',
    read_speed_mbps: '',
    write_speed_mbps: '',
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
      const res = await fetch('/api/disks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('디스크가 등록되었습니다!')
        setForm({
          model_name: '', manufacturer: '', capacity_gb: '', capacity_unit: '',
          type: '', interface_type: '', form_factor: '', rpm: '',
          read_speed_mbps: '', write_speed_mbps: '', description: ''
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
          <h3>디스크 등록</h3>
          <label>모델명<input name="model_name" value={form.model_name} onChange={handleChange} required /></label>
          <label>제조사<input name="manufacturer" value={form.manufacturer} onChange={handleChange} /></label>
          <label>용량<input type="number" name="capacity_gb" value={form.capacity_gb} onChange={handleChange} /></label>
          <label>용량 단위<input name="capacity_unit" value={form.capacity_unit} onChange={handleChange} placeholder="GB 또는 TB" /></label>
          <label>타입<input name="type" value={form.type} onChange={handleChange} placeholder="HDD, SSD 등" /></label>
          <label>인터페이스 타입<input name="interface_type" value={form.interface_type} onChange={handleChange} /></label>
          <label>폼팩터<input name="form_factor" value={form.form_factor} onChange={handleChange} /></label>
          <label>RPM<input type="number" name="rpm" value={form.rpm} onChange={handleChange} /></label>
          <label>읽기 속도(MB/s)<input type="number" name="read_speed_mbps" value={form.read_speed_mbps} onChange={handleChange} /></label>
          <label>쓰기 속도(MB/s)<input type="number" name="write_speed_mbps" value={form.write_speed_mbps} onChange={handleChange} /></label>
          <label>상세 설명<input name="description" value={form.description} onChange={handleChange} /></label>
          <button type="submit">등록</button>
          {message && <div className="admin-form-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default DiskRegisterForm
