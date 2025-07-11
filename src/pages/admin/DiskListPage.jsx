import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/admin-list.css'

function DiskListPage() {
  const [disks, setDisks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    modelName: '', manufacturer: '', capacity: '',
    type: '', interfaceType: '', formFactor: '', rpm: '', readSpeedMbps: '',
    writeSpeedMbps: '', description: ''
  })

  useEffect(() => {
    fetchDisks()
  }, [])

  const fetchDisks = () => {
    axios.get('/api/disks')
      .then(res => setDisks(res.data))
      .catch(() => setError('디스크 목록 조회 실패'))
      .finally(() => setLoading(false))
  }

  const handleEdit = (disk) => {
    setEditingId(disk.id)
    setEditForm({
      modelName: disk.modelName || '',
      manufacturer: disk.manufacturer || '',
      capacity: disk.capacity || '',
      type: disk.type || '',
      interfaceType: disk.interfaceType || '',
      formFactor: disk.formFactor || '',
      rpm: disk.rpm || '',
      readSpeedMbps: disk.readSpeedMbps || '',
      writeSpeedMbps: disk.writeSpeedMbps || '',
      description: disk.description || ''
    })
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleEditSave = async (id) => {
    try {
      await axios.put(`/api/disks/${id}`, {
        ...editForm,
        capacity: Number(editForm.capacity),
        rpm: editForm.rpm ? Number(editForm.rpm) : null,
        readSpeedMbps: editForm.readSpeedMbps ? Number(editForm.readSpeedMbps) : null,
        writeSpeedMbps: editForm.writeSpeedMbps ? Number(editForm.writeSpeedMbps) : null
      })
      fetchDisks()
      setEditingId(null)
    } catch {
      alert('수정 실패')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await axios.delete(`/api/disks/${id}`)
      setDisks(disks.filter(disk => disk.id !== id))
    } catch {
      alert('삭제 실패')
    }
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="parts-list-page">
      <h2>디스크 목록</h2>
      <table className="parts-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>모델명</th>
            <th>제조사</th>
            <th>용량(GB)</th>
            <th>타입</th>
            <th>인터페이스</th>
            <th>폼팩터</th>
            <th>RPM</th>
            <th>읽기속도(MB/s)</th>
            <th>쓰기속도(MB/s)</th>
            <th>설명</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {disks.length === 0 ? (
            <tr><td colSpan={13}>등록된 디스크가 없습니다.</td></tr>
          ) : (
            disks.map(disk => (
              <tr key={disk.id}>
                <td>{disk.id}</td>
                {editingId === disk.id ? (
                  <>
                    <td><input name="modelName" value={editForm.modelName} onChange={handleEditChange} /></td>
                    <td><input name="manufacturer" value={editForm.manufacturer} onChange={handleEditChange} /></td>
                    <td><input name="capacity" type="number" value={editForm.capacity} onChange={handleEditChange} /></td>
                    <td><input name="type" value={editForm.type} onChange={handleEditChange} /></td>
                    <td><input name="interfaceType" value={editForm.interfaceType} onChange={handleEditChange} /></td>
                    <td><input name="formFactor" value={editForm.formFactor} onChange={handleEditChange} /></td>
                    <td><input name="rpm" type="number" value={editForm.rpm} onChange={handleEditChange} /></td>
                    <td><input name="readSpeedMbps" type="number" value={editForm.readSpeedMbps} onChange={handleEditChange} /></td>
                    <td><input name="writeSpeedMbps" type="number" value={editForm.writeSpeedMbps} onChange={handleEditChange} /></td>
                    <td><input name="description" value={editForm.description} onChange={handleEditChange} /></td>
                    <td>
                      <button onClick={() => handleEditSave(disk.id)}>저장</button>
                      <button onClick={() => setEditingId(null)}>취소</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{disk.modelName}</td>
                    <td>{disk.manufacturer}</td>
                    <td>{disk.capacity}</td>
                    <td>{disk.type}</td>
                    <td>{disk.interfaceType}</td>
                    <td>{disk.formFactor}</td>
                    <td>{disk.rpm}</td>
                    <td>{disk.readSpeedMbps}</td>
                    <td>{disk.writeSpeedMbps}</td>
                    <td>{disk.description}</td>
                    <td>
                      <button onClick={() => handleEdit(disk)}>수정</button>
                      <button onClick={() => handleDelete(disk.id)}>삭제</button>
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

export default DiskListPage
