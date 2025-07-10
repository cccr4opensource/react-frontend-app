import { useState, useEffect } from 'react'
import './css/admin-form.css'

function ProductRegisterForm() {
  const [form, setForm] = useState({
    model_id: '',
    title: '',
    original_price: '',
    discount_price: '',
    currency: 'KRW',
    status: '',
    location: '',
    has_os: false,
    os_version: '',
    os_architecture: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [models, setModels] = useState([])
  const [message, setMessage] = useState('')

  // 부품(컴포넌트) 매핑 상태
  const [components, setComponents] = useState([
    { component_type: '', component_id: '', quantity: 1, additional_specs: '' }
  ])
  const [cpuList, setCpuList] = useState([])
  const [memoryList, setMemoryList] = useState([])
  const [diskList, setDiskList] = useState([])

  useEffect(() => {
    fetch('/api/models').then(r => r.json()).then(setModels)
    fetch('/api/cpus').then(r => r.json()).then(setCpuList)
    fetch('/api/memories').then(r => r.json()).then(setMemoryList)
    fetch('/api/disks').then(r => r.json()).then(setDiskList)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') {
      setImageFile(files[0])
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }
  }

  // 부품 매핑 핸들러
  const handleComponentChange = (idx, e) => {
    const { name, value } = e.target
    setComponents(prev =>
      prev.map((comp, i) =>
        i === idx ? { ...comp, [name]: value } : comp
      )
    )
  }
  const addComponent = () =>
    setComponents([...components, { component_type: '', component_id: '', quantity: 1, additional_specs: '' }])
  const removeComponent = idx =>
    setComponents(components.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(form).forEach(([key, value]) => data.append(key, value))
    if (imageFile) data.append('image', imageFile)
    data.append('components', JSON.stringify(components))

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: data,
      })
      if (res.ok) {
        setMessage('제품이 등록되었습니다!')
        setForm({
          model_id: '', title: '', original_price: '', discount_price: '',
          currency: 'KRW', status: '', location: '', has_os: false, os_version: '', os_architecture: ''
        })
        setImageFile(null)
        setComponents([{ component_type: '', component_id: '', quantity: 1, additional_specs: '' }])
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
          <h3>제품 등록</h3>
          <label>
            모델
            <select name="model_id" value={form.model_id} onChange={handleChange} required>
              <option value="">선택</option>
              {models.map(m => <option key={m.id} value={m.id}>{m.model_name}</option>)}
            </select>
          </label>
          <label>
            상품 이미지
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            상품명
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="예: Dell PowerEdge R730"
              autoComplete="off"
            />
          </label>
          <label>
            원래 가격
            <input
              type="number"
              name="original_price"
              value={form.original_price}
              onChange={handleChange}
              required
              min="0"
            />
          </label>
          <label>
            할인 가격
            <input
              type="number"
              name="discount_price"
              value={form.discount_price}
              onChange={handleChange}
              min="0"
            />
          </label>
          <label>
            통화
            <select name="currency" value={form.currency} onChange={handleChange}>
              <option value="KRW">KRW</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <label>
            상태
            <select name="status" value={form.status} onChange={handleChange} required>
              <option value="">선택</option>
              <option value="판매중">판매중</option>
              <option value="품절">품절</option>
            </select>
          </label>
          <label>
            위치
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="예: 서울 강남구"
              autoComplete="off"
            />
          </label>
          <label>
            OS 포함 여부
            <input
              type="checkbox"
              name="has_os"
              checked={form.has_os}
              onChange={handleChange}
            />
          </label>
          <label>
            OS 버전
            <input
              type="text"
              name="os_version"
              value={form.os_version}
              onChange={handleChange}
              placeholder="예: Windows Server 2019"
              autoComplete="off"
            />
          </label>
          <label>
            OS 아키텍처
            <input
              type="text"
              name="os_architecture"
              value={form.os_architecture}
              onChange={handleChange}
              placeholder="예: x86_64"
              autoComplete="off"
            />
          </label>
          <hr style={{ margin: '18px 0' }} />
          <h4>부품(컴포넌트) 구성</h4>
          {components.map((comp, idx) => (
            <div key={idx} style={{ marginBottom: 14, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
              <label>
                부품 타입
                <select
                  name="component_type"
                  value={comp.component_type}
                  onChange={e => handleComponentChange(idx, e)}
                  required
                >
                  <option value="">선택</option>
                  <option value="cpu">CPU</option>
                  <option value="memory">메모리</option>
                  <option value="disk">디스크</option>
                </select>
              </label>
              <label>
                부품 선택
                <select
                  name="component_id"
                  value={comp.component_id}
                  onChange={e => handleComponentChange(idx, e)}
                  required
                >
                  <option value="">모델 선택</option>
                  {comp.component_type === 'cpu' && cpuList.map(c => (
                    <option key={c.id} value={c.id}>{c.model_name}</option>
                  ))}
                  {comp.component_type === 'memory' && memoryList.map(m => (
                    <option key={m.id} value={m.id}>{m.model_name}</option>
                  ))}
                  {comp.component_type === 'disk' && diskList.map(d => (
                    <option key={d.id} value={d.id}>{d.model_name}</option>
                  ))}
                </select>
              </label>
              <label>
                수량
                <input
                  type="number"
                  name="quantity"
                  value={comp.quantity}
                  min="1"
                  onChange={e => handleComponentChange(idx, e)}
                  required
                />
              </label>
              <label>
                추가 사양
                <input
                  type="text"
                  name="additional_specs"
                  value={comp.additional_specs}
                  onChange={e => handleComponentChange(idx, e)}
                  placeholder="(선택)"
                />
              </label>
              {components.length > 1 && (
                <button type="button" onClick={() => removeComponent(idx)} style={{ marginTop: 6 }}>
                  삭제
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addComponent}>+ 부품 추가</button>
          <button type="submit" style={{ marginTop: 16 }}>등록</button>
          {message && <div className="admin-form-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default ProductRegisterForm
