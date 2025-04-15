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
        czas={2}
        wielkosc={30}
        poziom={1}
        stan={15}
        ilosc={1}
        setZamowienia={setZamowieniaPierwszejTabeli}
      />
      <MrpTable 
        produkcja={zamowieniaPierwszejTabeli} 
        czasRealizacji={0} 
        tableTitle={"Silnik"}
        czas={2}
        wielkosc={40}
        poziom={2}
        stan={10}
        ilosc={1}
      />
      <MrpTable 
        produkcja={zamowieniaPierwszejTabeli} 
        czasRealizacji={0} 
        tableTitle={"Obudowa"}
        czas={1}
        wielkosc={40}
        poziom={2}
        stan={10}
        ilosc={1}
      />
      <MrpTable 
        produkcja={produkcja} 
        czasRealizacji={czasRealizacji} 
        tableTitle={"Mieszadla"}
        czas={1}
        wielkosc={80}
        poziom={1}
        stan={40}
        ilosc={2}
      />
      <MrpTable 
        produkcja={produkcja} 
        czasRealizacji={czasRealizacji} 
        tableTitle={"Miska"}
        czas={2}
        wielkosc={50}
        poziom={1}
        stan={15}
        ilosc={1}
      />
    </div>
  );
}

export default App
