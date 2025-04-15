import './App.css'
import GhpTable from './components/GhpTable.jsx';
import MrpTable from './components/MrpTable.jsx';
import { useState } from 'react';

function App() {
  const [produkcja, setProdukcja] = useState(Array(10).fill(0));
  const [czasRealizacji, setCzasRealizacji] = useState(1);

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
      />
      {/* <MrpTable 
      produkcja={produkcja} 
      czasRealizacji={0} 
      tableTitle={"Silnik"}
      zamowienia={zamowienia}
      setZamowienia={setZamowienia}
      /> */}
    </div>
  );
}

export default App
