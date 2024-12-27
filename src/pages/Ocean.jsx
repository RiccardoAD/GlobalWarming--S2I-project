import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '../components/LineChart';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faWater, faFlask, faHandsHelping, faExclamationTriangle, faFish, faShip, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
// Funzione per fetch dei dati dall'API Ocean Warming
const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/ocean-warming-api');
    const data = response.data.result;

    // Trasforma l'oggetto in un array di oggetti
    const parsedData = Object.entries(data).map(([year, variance]) => ({
      year, // Chiave (es. "1851")
      variance: parseFloat(variance) // Valore come numero
    }));
    
    // Log per verificare
    // console.log("Dati Fetchati e Parsati:", parsedData);
   
    return parsedData;

  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};


// Funzione per aggiornare i dati del grafico
const updateOceanData = (prevData, data) => ({
  labels: data.map((item) => item.year),
  datasets: [
    {
      ...prevData.datasets[0],
      data: data.map((item) => item.variance)
    },    
  ]
});

// Impatti del riscaldamento oceanico
// const Impacts = () => (
//   <div>
//     <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-[#c0d6e4]'>Impatti</h2>
//     <ul className='list-none'>
//       <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Aumento del livello del mare a causa della dilatazione termica</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faFish} className='mr-2 text-sm' />Perdita di biodiversità marina e migrazioni di specie</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Acidificazione degli oceani che danneggia i coralli e gli ecosistemi marini</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faTemperatureHigh} className='mr-2 text-sm' />Riduzione della capacità degli oceani di assorbire il calore in eccesso</li>
//     </ul>
//   </div>
// );

// Soluzioni per mitigare il riscaldamento oceanico
// const Solutions = () => (
//   <div>
//     <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-[#c0d6e4]'>Soluzioni</h2>
//     <ul className='list-none'>
//       <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Investire nella ricerca e sviluppo di tecnologie a basse emissioni</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faShip} className='mr-2 text-sm' />Ridurre l{"'"} impatto ambientale del trasporto marittimo</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Proteggere e ripristinare ecosistemi marini come mangrovie e barriere coralline</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Sensibilizzare l{"'"} opinione pubblica sull{"'"}  importanza degli oceani nel regolare il clima</li>
//     </ul>
//   </div>
// );

// Componente principale
export const Ocean = () => {
  const { t } = useTranslation();
 
  const [oceanData, setOceanData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Variazione di Temperatura',
        backgroundColor: 'rgba(54, 162, 235, 0.5)', 
        borderColor: '#36A2EB', 
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 0,
        pointRadius: 0,
        lineTension: 0.4,
      }
    ]
  });

  // Effetto per fetch dei dati
  useEffect(() => {
    fetchData().then(data => {
      setOceanData(prevData => updateOceanData(prevData, data));
    });
  }, []);

  const impactIcons = [faExclamationTriangle, faFish, faWater, faTemperatureHigh];
  const solutionIcons = [faFlask, faShip, faLeaf, faHandsHelping];


  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-[#5b7a92] rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-[#c0d6e4]">{t("ocean.title")}</h1>
      <ul className="prose max-w-screen-lg">
        <p>
        {t("ocean.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* <Impacts />
          <Solutions /> */}
           <Section
            title={t("ocean.impactsTitle")}
            items={t("ocean.impacts", { returnObjects: true })}
            icons={impactIcons}
          />
          <Section
            title={t("ocean.solutionsTitle")}
            items={t("ocean.solutions", { returnObjects: true })}
            icons={solutionIcons}
          />
        </div>
      </ul>
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-md w-full max-w-4xl mt-5 p-5">
        <LineChart chartData={oceanData} />
      </div>
    </div>
  );
};