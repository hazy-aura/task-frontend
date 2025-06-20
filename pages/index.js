import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    api.get('/boards').then((res) => {
      setBoards(res.data);
      if (res.data.length > 0) router.push(`/boards/${res.data[0]._id}`);
    });
  }, []);

  return <div>Loading...</div>;
}
