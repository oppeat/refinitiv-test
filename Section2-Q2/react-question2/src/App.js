import './App.css';
import Datatable from './Component/Datatable';
import { useEffect, useState } from 'react';
import axios from "axios"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function App() {

  useEffect(() => {
    fetchData()
  }, []);

  const [categories,setCategories] = useState([]);
  const [filteredRows,setFilteredRows] = useState([]);
  const [keyword,setKeyword]= useState('');

  async function fetchData() {
    const result = await axios('https://api.publicapis.org/categories');
    setCategories(result.data?.categories);
    setFilteredRows(result.data?.categories);
  }

  const onKeywordChange = (word) =>{
    setKeyword(word);
    if(word){
      const filtered = categories.filter((x) => String(x).toLowerCase().includes(String(word).toLowerCase()))
      setFilteredRows(filtered);
    }
    else{
      setFilteredRows([...categories]);
    }
  }

  return (
    <div className="App">
      <Box sx={{ pt: "2rem" }}>
        <TextField fullWidth label="Search" id="search" value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />
        <Datatable rows={filteredRows || []}/>
      </Box>
    </div>
  );
}

export default App;
