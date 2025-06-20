import { useState } from 'react';
import api from '../utils/api';
import Button from '@mui/material/Button';

export default function TaskCard({ task, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    assignedTo: '',
  });
   const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const priorityColors = {
    low: '#8bc34a',
    medium: '#ffc107',
    high: '#f44336',
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await api.delete(`/tasks/${task._id}`);
      onUpdate();
    }
  };



  const handleEdit = async () => {
    await api.put(`/tasks/${task._id}`, editedTask);
    setIsEditing(false);
    onUpdate();
  };

    const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await api.put(`/tasks/${task._id}`, { status: newStatus });
    onUpdate();
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem' }}>
      {!isEditing ? (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div
            style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              backgroundColor: priorityColors[task.priority.toLowerCase()],
              color: 'white',
              marginTop: '4px',
            }}
          >
            {task.priority}
          </div>
    
         
          <div>
            <small>Assigned to: {task.assignedTo}</small>
            </div>
          <Button onClick={() => setIsEditing(true)} style={{ marginRight: '8px' }}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Title"
          />
          <br />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder="Description"
          />
          <br />
          <select
            className='bg-stone-500'
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
          >
            <option>low</option>
            <option>medium</option>
            <option>high</option>
          </select>
          <br />
           <div style={{ marginTop: '8px' }}>
            <label>Status: </label>
            <select className='bg-stone-500' value={task.status} onChange={handleStatusChange}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <br />
          <input
            type="text"
            value={editedTask.assignedTo}
            onChange={(e) => setEditedTask({ ...editedTask, assignedTo: e.target.value })}
            placeholder="Assigned To"
          />
          <br />
          <Button onClick={handleEdit}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      )}
    </div>
  );
}
