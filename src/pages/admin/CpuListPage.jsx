import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/admin-list.css'

function CpuListPage() {
  const [cpus, setCpus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    modelName: '', manufacturer: '', cores: '', threads: '',
    baseClock: '', maxTurboClock: '', cacheMb: '', socketType: '',
    tdpWatts: '', description: ''
  })

  useEffect(() => {
    fetchCpus()
  }, [])

  const fetchCpus = () => {
    axios.get('/api/cpus')
      .then(res => setCpus(res.data))
      .catch(() => setError('CPU 목록 조회 실패'))
      .finally(() => setLoading(false))
  }

  const handleEdit = (cpu) => {
    setEditingId(cpu.id)
    setEditForm({
      modelName: cpu.modelName || '',
      manufacturer: cpu.manufacturer || '',
      cores: cpu.cores || '',
      threads: cpu.threads || '',
      baseClock: cpu.baseClock || '',
      maxTurboClock: cpu.maxTurboClock || '',
      cacheMb: cpu.cacheMb || '',
      socketType: cpu.socketType || '',
      tdpWatts: cpu.tdpWatts || '',
      description: cpu.description || ''
    })
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleEditSave = async (id) => {
    try {
      await axios.put(`/api/cpus/${id}`, {
        ...editForm,
        cores: Number(editForm.cores),
        threads: Number(editForm.threads),
        baseClock: Number(editForm.baseClock),
        maxTurboClock: Number(editForm.maxTurboClock),
        cacheMb: Number(editForm.cacheMb),
        tdpWatts: Number(editForm.tdpWatts)
      })
      fetchCpus()
      setEditingId(null)
    } catch {
      alert('수정 실패')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await axios.delete(`/api/cpus/${id}`)
      setCpus(cpus.filter(cpu => cpu.id !== id))
    } catch {
      alert('삭제 실패')
    }
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="parts-list-page">
      <h2>CPU 목록</h2>
      <table className="parts-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>모델명</th>
            <th>제조사</th>
            <th>코어</th>
            <th>스레드</th>
            <th>베이스 클럭</th>
            <th>최대 터보</th>
            <th>캐시(MB)</th>
            <th>소켓</th>
            <th>TDP(W)</th>
            <th>설명</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {cpus.length === 0 ? (
            <tr><td colSpan={12}>등록된 CPU가 없습니다.</td></tr>
          ) : (
            cpus.map(cpu => (
              <tr key={cpu.id}>
                <td>{cpu.id}</td>
                {editingId === cpu.id ? (
                  <>
                    <td><input name="modelName" value={editForm.modelName} onChange={handleEditChange} /></td>
                    <td><input name="manufacturer" value={editForm.manufacturer} onChange={handleEditChange} /></td>
                    <td><input name="cores" type="number" value={editForm.cores} onChange={handleEditChange} /></td>
                    <td><input name="threads" type="number" value={editForm.threads} onChange={handleEditChange} /></td>
                    <td><input name="baseClock" type="number" step="0.01" value={editForm.baseClock} onChange={handleEditChange} /></td>
                    <td><input name="maxTurboClock" type="number" step="0.01" value={editForm.maxTurboClock} onChange={handleEditChange} /></td>
                    <td><input name="cacheMb" type="number" value={editForm.cacheMb} onChange={handleEditChange} /></td>
                    <td><input name="socketType" value={editForm.socketType} onChange={handleEditChange} /></td>
                    <td><input name="tdpWatts" type="number" value={editForm.tdpWatts} onChange={handleEditChange} /></td>
                    <td><input name="description" value={editForm.description} onChange={handleEditChange} /></td>
                    <td>
                      <button onClick={() => handleEditSave(cpu.id)}>저장</button>
                      <button onClick={() => setEditingId(null)}>취소</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{cpu.modelName}</td>
                    <td>{cpu.manufacturer}</td>
                    <td>{cpu.cores}</td>
                    <td>{cpu.threads}</td>
                    <td>{cpu.baseClock}</td>
                    <td>{cpu.maxTurboClock}</td>
                    <td>{cpu.cacheMb}</td>
                    <td>{cpu.socketType}</td>
                    <td>{cpu.tdpWatts}</td>
                    <td>{cpu.description}</td>
                    <td>
                      <button onClick={() => handleEdit(cpu)}>수정</button>
                      <button onClick={() => handleDelete(cpu.id)}>삭제</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CpuListPage
