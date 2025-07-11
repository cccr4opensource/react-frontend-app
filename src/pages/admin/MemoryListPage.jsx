import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/admin-list.css'

function MemoryListPage() {
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '', size: '', type: '', speed: '', formFactor: '', manufacturer: '', description: ''
  })

  useEffect(() => {
    fetchMemories()
  }, [])

  const fetchMemories = () => {
    axios.get('/api/memories')
      .then(res => setMemories(res.data))
      .catch(() => setError('메모리 목록 조회 실패'))
      .finally(() => setLoading(false))
  }

  const handleEdit = (memory) => {
    setEditingId(memory.id)
    setEditForm({
      name: memory.name || '',
      size: memory.size || '',
      type: memory.type || '',
      speed: memory.speed || '',
      formFactor: memory.formFactor || '',
      manufacturer: memory.manufacturer || '',
      description: memory.description || ''
    })
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const handleEditSave = async (id) => {
    try {
      await axios.put(`/api/memories/${id}`, {
        ...editForm,
        size: Number(editForm.size),
        speed: Number(editForm.speed)
      })
      fetchMemories()
      setEditingId(null)
    } catch {
      alert('수정 실패')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await axios.delete(`/api/memories/${id}`)
      setMemories(memories.filter(m => m.id !== id))
    } catch {
      alert('삭제 실패')
    }
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="parts-list-page">
      <h2>메모리 목록</h2>
      <table className="parts-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>용량(GB)</th>
            <th>타입</th>
            <th>속도(MHz)</th>
            <th>폼팩터</th>
            <th>제조사</th>
            <th>설명</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {memories.length === 0 ? (
            <tr><td colSpan={9}>등록된 메모리가 없습니다.</td></tr>
          ) : (
            memories.map(memory => (
              <tr key={memory.id}>
                <td>{memory.id}</td>
                {editingId === memory.id ? (
                  <>
                    <td>
                      <input name="name" value={editForm.name} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="size" type="number" value={editForm.size} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="type" value={editForm.type} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="speed" type="number" value={editForm.speed} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="formFactor" value={editForm.formFactor} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="manufacturer" value={editForm.manufacturer} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input name="description" value={editForm.description} onChange={handleEditChange} />
                    </td>
                    <td>
                      <button onClick={() => handleEditSave(memory.id)}>저장</button>
                      <button onClick={() => setEditingId(null)}>취소</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{memory.name}</td>
                    <td>{memory.size}</td>
                    <td>{memory.type}</td>
                    <td>{memory.speed}</td>
                    <td>{memory.formFactor}</td>
                    <td>{memory.manufacturer}</td>
                    <td>{memory.description}</td>
                    <td>
                      <button onClick={() => handleEdit(memory)}>수정</button>
                      <button onClick={() => handleDelete(memory.id)}>삭제</button>
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

export default MemoryListPage
