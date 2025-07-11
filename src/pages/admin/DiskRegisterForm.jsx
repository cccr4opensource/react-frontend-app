import { useState } from 'react'
import axios from 'axios'
import './css/admin-form.css'

function DiskRegisterForm() {
  const [form, setForm] = useState({
    modelName: '', manufacturer: '', capacity: '',
    type: '', interfaceType: '', formFactor: '', rpm: '', readSpeedMbps: '',
    writeSpeedMbps: '', description: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/disks', {
        ...form,
        capacity: Number(form.capacity),
        rpm: form.rpm ? Number(form.rpm) : null,
        readSpeedMbps: form.readSpeedMbps ? Number(form.readSpeedMbps) : null,
        writeSpeedMbps: form.writeSpeedMbps ? Number(form.writeSpeedMbps) : null
      })
      setMessage('디스크가 등록되었습니다!')
      setForm({
        modelName: '', manufacturer: '', capacity: '',
        type: '', interfaceType: '', formFactor: '', rpm: '', readSpeedMbps: '',
        writeSpeedMbps: '', description: ''
      })
    } catch {
      setMessage('등록 실패')
    }
  }

  return (
    <div className="parts-form-page">
      <form className="parts-form" onSubmit={handleSubmit}>
        <h3>디스크 등록</h3>
        <label>모델명<input name="modelName" value={form.modelName} onChange={handleChange} required /></label>
        <label>제조사<input name="manufacturer" value={form.manufacturer} onChange={handleChange} /></label>
        <label>용량(GB)<input name="capacity" type="number" value={form.capacity} onChange={handleChange} required /></label>
        <label>타입<input name="type" value={form.type} onChange={handleChange} /></label>
        <label>인터페이스<input name="interfaceType" value={form.interfaceType} onChange={handleChange} /></label>
        <label>폼팩터<input name="formFactor" value={form.formFactor} onChange={handleChange} /></label>
        <label>RPM<input name="rpm" type="number" value={form.rpm} onChange={handleChange} /></label>
        <label>읽기속도(MB/s)<input name="readSpeedMbps" type="number" value={form.readSpeedMbps} onChange={handleChange} /></label>
        <label>쓰기속도(MB/s)<input name="writeSpeedMbps" type="number" value={form.writeSpeedMbps} onChange={handleChange} /></label>
        <label>설명<input name="description" value={form.description} onChange={handleChange} /></label>
        <button type="submit">등록</button>
        {message && <div className="parts-form-message">{message}</div>}
      </form>
    </div>
  )
}

export default DiskRegisterForm
