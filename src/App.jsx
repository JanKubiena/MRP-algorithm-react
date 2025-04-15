import './App.css'
import GhpTable from './components/GhpTable.jsx';
import MrpTable from './components/MrpTable.jsx';
import { useState } from 'react';

function App() {
  const [produkcja, setProdukcja] = useState(Array(10).fill(0));
  const [czasRealizacji, setCzasRealizacji] = useState(1);
  const [zamowieniaPierwszejTabeli, setZamowieniaPierwszejTabeli] = useState(Array(10).fill(0));

  return (
    <div style={{ padding: '2rem' }}>
      <GhpTable 
        produkcja={produkcja}
        setProdukcja={setProdukcja}
        czasRealizacji={czasRealizacji}
        setCzasRealizacji={setCzasRealizacji}
      />
      <MrpTable 
        produkcja={produkcja} 
        czasRealizacji={czasRealizacji} 
        tableTitle={"Urządzenie"}
        setZamowienia={setZamowieniaPierwszejTabeli}
      />
      <MrpTable 
        produkcja={zamowieniaPierwszejTabeli} 
        czasRealizacji={0} 
        tableTitle={"Silnik"}
      />
    </div>
  );
}

export default App
