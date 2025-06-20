import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../utils/api';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export default function Sidebar() {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchBoards = async () => {
    const res = await api.get('/boards');
    setBoards(res.data);
    setFilteredBoards(res.data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    const filtered = boards.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBoards(filtered);
  }, [search, boards]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!boardName.trim()) return;
    const res = await api.post('/boards', { name: boardName });
    setBoardName('');
    fetchBoards();
    router.push(`/boards/${res.data._id}`);
  };

  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h3>Boards</h3>

      <input
        type="text"
        placeholder="Search boards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />

      <ul>
        {filteredBoards.map((board) => (
          <li className='m-2 p-1 border' key={board._id}>
            <Link href={`/boards/${board._id}`}>{board.name}</Link>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateBoard} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="New board name"
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}
