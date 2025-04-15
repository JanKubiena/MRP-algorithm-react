import React, { useState, useEffect } from 'react';

const tygodnie = Array.from({ length: 10 }, (_, i) => i + 1);

function GhpTable({ produkcja, setProdukcja, czasRealizacji, setCzasRealizacji }) {
  const [naStanie, setNaStanie] = useState(5);
  const [popyt, setPopyt] = useState(Array(10).fill(0));
  const [dostepne, setDostepne] = useState(Array(10).fill(0));

  useEffect(() => {
    const noweDostepne = Array(10).fill(0);

    for (let i = 0; i < 10; i++) {
      noweDostepne[i] += naStanie
    }

    for (let i = 0; i < 10; i++) {
        if (i === 0){
            noweDostepne[i] = noweDostepne[i] - popyt[i] + produkcja[i];
        } else {
            noweDostepne[i] = noweDostepne[i-1] - popyt[i] + produkcja[i];
        } 
    }

    setDostepne(noweDostepne);
  }, [naStanie, popyt, produkcja]);

  const handleChange = (setter, index, value) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = parseInt(value, 10);
      return copy;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">GHP (Mikser)</h2>
      <table className="border-collapse border border-gray-300 w-full text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Tydzień:</th>
            {tygodnie.map((tydzien) => (
              <th key={tydzien} className="border border-gray-300 p-2">
                {tydzien}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Przewidywany popyt</td>
            {popyt.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleChange(setPopyt, i, e.target.value)}
                  className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Produkcja</td>
            {produkcja.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleChange(setProdukcja, i, e.target.value)}
                  className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Dostępne</td>
            {dostepne.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">{val}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <label className="block mb-2">
          Na stanie:
          <input
            type="number"
            value={naStanie}
            onChange={(e) => setNaStanie(parseInt(e.target.value, 10))}
            className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          Czas realizacji:
          <input
            type="number"
            value={czasRealizacji}
            onChange={(e) => setCzasRealizacji(parseInt(e.target.value, 10))}
            className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  );
}

export default GhpTable;
