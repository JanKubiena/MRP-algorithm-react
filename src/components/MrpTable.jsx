import React, { useState, useEffect } from 'react';

const tygodnie = Array.from({ length: 10 }, (_, i) => i + 1);

function MrpTable({ produkcja, czasRealizacji, tableTitle, czas, wielkosc, poziom, stan,setZamowienia}) {
  const [mrpCzasRealizacji, setmrpCzasRealizacji] = useState(czas);
  const [wielkoscPartii, setWielkoscPartii] = useState(wielkosc);
  const [poziomBOM, setPoziomBOM] = useState(poziom);
  const [naStanie, setNaStanie] = useState(stan);
  const [zapotrzebowanie, setZapotrzebowanie] = useState(Array(10).fill(0));
  const [planowanePrzyjecia, setPlanowanePrzyjecia] = useState(Array(10).fill(0));
  const [przewidywaneNaStanie, setPrzewidywaneNaStanie] = useState(Array(10).fill(0));
  const [netto, setNetto] = useState(Array(10).fill(0));
  const [zamowienia, setZamowieniaLokalne] = useState(Array(10).fill(0));
  const [przyjecieZamowien, setPrzyjecieZamowien] = useState(Array(10).fill(0));

    useEffect(() => {
        const noweZapotrzebowanie = Array(10).fill(0);

        for (let i = 0; i < 10; i++) {
            noweZapotrzebowanie[i] += produkcja[i + czasRealizacji] || 0;
        }

        let noweNaStanie = naStanie

        const nowePrzewidywaneNaStanie = Array(10).fill(0);
        const noweNetto = Array(10).fill(0);
        const noweZamowienia = Array(10).fill(0);
        const nowePrzyjecieZamowien = Array(10).fill(0);

        for (let i = 0; i < 10; i++) {
            if (noweZapotrzebowanie[i] !== 0){
                if(nowePrzewidywaneNaStanie[i-1] - noweZapotrzebowanie[i] + planowanePrzyjecia[i] < 0) {
                    noweNetto[i] = Math.abs(nowePrzewidywaneNaStanie[i-1] - noweZapotrzebowanie[i] + planowanePrzyjecia[i]);
                    nowePrzyjecieZamowien[i] = wielkoscPartii
                    noweNaStanie = nowePrzyjecieZamowien[i] - noweNetto[i];
                } else {
                    noweNaStanie = nowePrzewidywaneNaStanie[i-1] - noweZapotrzebowanie[i] + planowanePrzyjecia[i];
                }
                nowePrzewidywaneNaStanie[i] = noweNaStanie
            } else {
                if(noweNaStanie < 0){
                    noweNaStanie = noweNaStanie + planowanePrzyjecia[i];
                }
                noweNaStanie = noweNaStanie + planowanePrzyjecia[i];
                nowePrzewidywaneNaStanie[i] = noweNaStanie;
            }
        }
        for (let i = 0; i < 10; i++) {
            noweZamowienia[i] += nowePrzyjecieZamowien[i + mrpCzasRealizacji] || 0;
        }

        setZapotrzebowanie(noweZapotrzebowanie);
        setPrzewidywaneNaStanie(nowePrzewidywaneNaStanie);
        setNetto(noweNetto);
        setZamowieniaLokalne(noweZamowienia);
        setPrzyjecieZamowien(nowePrzyjecieZamowien);

        if (setZamowienia) {
            setZamowienia(noweZamowienia);
          }

    }, [mrpCzasRealizacji, wielkoscPartii, naStanie, produkcja, czasRealizacji, planowanePrzyjecia, setZamowienia]);

  const handleChange = (setter, index, value) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = parseInt(value, 10);
      return copy;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{tableTitle}</h2>
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
            <td className="border border-gray-300 p-2">Całkowite Zapotrzebowanie</td>
            {zapotrzebowanie.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">{val}</td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Planowane przyjęcia</td>
            {planowanePrzyjecia.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleChange(setPlanowanePrzyjecia, i, e.target.value)}
                  className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Przewidywane na stanie</td>
            {przewidywaneNaStanie.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">{val}</td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Zapotrzebowanie netto</td>
            {netto.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">{val}</td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Planowane zamówienia</td>
            {zamowienia.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">{val}</td>
            ))}
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Planowane przyjęcie zamówień</td>
            {przyjecieZamowien.map((val, i) => (
              <td key={i} className="border border-gray-300 p-2">{val}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <label className="block">
          Czas realizacji:
          <input
            type="number"
            value={mrpCzasRealizacji}
            onChange={(e) => setmrpCzasRealizacji(parseInt(e.target.value, 10) || 0)}
            className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          Wielkość partii:
          <input
            type="number"
            value={wielkoscPartii}
            onChange={(e) => setWielkoscPartii(parseInt(e.target.value, 10) || 0)}
            className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          Poziom BOM:
          <input
            type="number"
            value={poziomBOM}
            onChange={(e) => setPoziomBOM(parseInt(e.target.value, 10) || 0)}
            className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          Na stanie:
          <input
            type="number"
            value={naStanie}
            onChange={(e) => setNaStanie(parseInt(e.target.value, 10) || 0)}
            className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  );
}

export default MrpTable;