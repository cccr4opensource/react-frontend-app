import { useState } from 'react'
import './css/admin-form.css'

function CpuRegisterForm() {
  const [form, setForm] = useState({
    model_name: '',
    manufacturer: '',
    cores: '',
    threads: '',
    base_clock_ghz: '',
    max_turbo_ghz: '',
    cache_mb: '',
    socket_type: '',
    tdp_watts: '',
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
      const res = await fetch('/api/cpus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('CPU가 등록되었습니다!')
        setForm({
          model_name: '', manufacturer: '', cores: '', threads: '',
          base_clock_ghz: '', max_turbo_ghz: '', cache_mb: '',
          socket_type: '', tdp_watts: '', description: ''
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
          <h3>CPU 등록</h3>
          <label>모델명<input name="model_name" value={form.model_name} onChange={handleChange} required /></label>
          <label>제조사<input name="manufacturer" value={form.manufacturer} onChange={handleChange} /></label>
          <label>코어 수<input type="number" name="cores" value={form.cores} onChange={handleChange} /></label>
          <label>쓰레드 수<input type="number" name="threads" value={form.threads} onChange={handleChange} /></label>
          <label>기본 클럭(GHz)<input type="number" step="0.01" name="base_clock_ghz" value={form.base_clock_ghz} onChange={handleChange} /></label>
          <label>최대 터보(GHz)<input type="number" step="0.01" name="max_turbo_ghz" value={form.max_turbo_ghz} onChange={handleChange} /></label>
          <label>캐시(MB)<input type="number" name="cache_mb" value={form.cache_mb} onChange={handleChange} /></label>
          <label>소켓 타입<input name="socket_type" value={form.socket_type} onChange={handleChange} /></label>
          <label>TDP(W)<input type="number" name="tdp_watts" value={form.tdp_watts} onChange={handleChange} /></label>
          <label>상세 설명<input name="description" value={form.description} onChange={handleChange} /></label>
          <button type="submit">등록</button>
          {message && <div className="admin-form-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default CpuRegisterForm
