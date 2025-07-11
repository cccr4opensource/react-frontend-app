import { useState } from 'react'
import axios from 'axios'
import './css/admin-form.css'

function CpuRegisterForm() {
  const [form, setForm] = useState({
    modelName: '', manufacturer: '', cores: '', threads: '',
    baseClock: '', maxTurboClock: '', cacheMb: '', socketType: '',
    tdpWatts: '', description: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/cpus', {
        ...form,
        cores: Number(form.cores),
        threads: Number(form.threads),
        baseClock: Number(form.baseClock),
        maxTurboClock: Number(form.maxTurboClock),
        cacheMb: Number(form.cacheMb),
        tdpWatts: Number(form.tdpWatts)
      })
      setMessage('CPU가 등록되었습니다!')
      setForm({
        modelName: '', manufacturer: '', cores: '', threads: '',
        baseClock: '', maxTurboClock: '', cacheMb: '', socketType: '',
        tdpWatts: '', description: ''
      })
    } catch {
      setMessage('등록 실패')
    }
  }

  return (
    <div className="parts-form-page">
      <form className="parts-form" onSubmit={handleSubmit}>
        <h3>CPU 등록</h3>
        <label>모델명<input name="modelName" value={form.modelName} onChange={handleChange} required /></label>
        <label>제조사<input name="manufacturer" value={form.manufacturer} onChange={handleChange} /></label>
        <label>코어<input name="cores" type="number" value={form.cores} onChange={handleChange} required /></label>
        <label>스레드<input name="threads" type="number" value={form.threads} onChange={handleChange} /></label>
        <label>베이스 클럭(GHz)<input name="baseClock" type="number" step="0.01" value={form.baseClock} onChange={handleChange} /></label>
        <label>최대 터보(GHz)<input name="maxTurboClock" type="number" step="0.01" value={form.maxTurboClock} onChange={handleChange} /></label>
        <label>캐시(MB)<input name="cacheMb" type="number" value={form.cacheMb} onChange={handleChange} /></label>
        <label>소켓<input name="socketType" value={form.socketType} onChange={handleChange} /></label>
        <label>TDP(W)<input name="tdpWatts" type="number" value={form.tdpWatts} onChange={handleChange} /></label>
        <label>설명<input name="description" value={form.description} onChange={handleChange} /></label>
        <button type="submit">등록</button>
        {message && <div className="parts-form-message">{message}</div>}
      </form>
    </div>
  )
}

export default CpuRegisterForm
