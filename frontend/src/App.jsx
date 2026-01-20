import { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'
import HeaderComponent from './components/HeaderComponent';
import BodyComponent from './components/BodyComponent';

function App() {

  const [games, setGames] = useState([]);

  useEffect(() => {

    const fetchGames = async () =>  {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/list`);

      setGames(response.data);
    }

    fetchGames();
  }, []);

  return (
    <>
      <HeaderComponent setGames={setGames}/>
      <BodyComponent games={games}/>
    </>
  )
}

export default App
