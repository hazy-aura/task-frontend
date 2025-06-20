import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import TaskCard from '../../components/TaskCard';
import Sidebar from '../../components/Sidebar';
import Button from '@mui/material/Button';

export default function BoardPage() {
  const router = useRouter();
  const { id } = router.query;

  const [searchTerm, setSearchTerm] = useState('');
const [priorityFilter, setPriorityFilter] = useState('');

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    assignedTo: '',
  });

  const fetchTasks = async () => {
    const res = await api.get(`/boards/${id}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    if (id) fetchTasks();
  }, [id]);

  const grouped = {
    todo: [],
    'in-progress': [],
    done: [],
  };

  

 
  const handleCreateTask = async (e) => {
    e.preventDefault();
    await api.post(`/boards/${id}/tasks`, newTask);
    setNewTask({ title: '', description: '', priority: 'low', assignedTo: '' });
    fetchTasks();
  };

  
    const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchPriority =
      !priorityFilter || task.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchSearch && matchPriority;
  });



  filteredTasks.forEach((task) => {
    grouped[task.status].push(task);
  });

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
      

        <h2>Board ID: {id}</h2>


        <h2>CREATE TASK ON THIS BOARD</h2>
        <form onSubmit={handleCreateTask} className='border m-1 p-1' style={{ marginBottom: '1rem' }}>
          <input
            className='m-2 p-1'
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <br />
          <input 
            className='m-2 p-1'
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <br />
          <select
             className='m-2 p-1'
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <input
            className='m-2 p-1'
            type="text"
            placeholder="Assigned To"
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          />
          <br />
          <Button variant="contained" color="success" type="submit">Create Task</Button>
        </form>


         <h2>TASKS ON THIS BOARD</h2>

         {/* 🔍 Search & 🎯 Priority Filter */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <select
            className='bg-stone-500'
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
       
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['todo', 'in-progress', 'done'].map((status) => (
            <div key={status}>
              <h3>{status.toUpperCase()}</h3>
              {grouped[status].map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={() => fetchTasks()} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
