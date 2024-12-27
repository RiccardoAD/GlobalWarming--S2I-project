import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '../components/LineChart';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faSnowflake, faFlask, faHandsHelping, faExclamationTriangle, faCar, faIndustry, faLungs } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import Section from "../components/Section";

const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/nitrous-oxide-api');
    return response.data.nitrous;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};
const updateNo2Data = (prevData, data) => ({
  labels: data.map((item) => item.date.slice(0, 4)),
  datasets: [
    {
      ...prevData.datasets[0],
      data: data.map((item) => parseFloat(item.average))
    },
    {
      ...prevData.datasets[1],
      data: data.map((item) => parseFloat(item.trend))
    }
  ]
});
// const Impacts = () => (
//   <div>
//     <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-[#c0d6e4]'>Impatti</h2>
//     <ul className='list-none'>
//       <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Contributo all{"'"}effetto serra</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faCar} className='mr-2 text-sm' />Formazione di smog e piogge acide</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faLungs} className='mr-2 text-sm' />Effetti negativi sulla salute respiratoria</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faIndustry} className='mr-2 text-sm' />Danneggiamento della vegetazione e degli ecosistemi acquatici</li>
//     </ul>
//   </div>
// );
// const Solutions = () => (
//   <div>
//     <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-[#c0d6e4]'>Soluzioni</h2>
//     <ul className='list-none'>
//       <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limitare le emissioni di NO2 attraverso politiche ambientali</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faSnowflake} className='mr-2 text-sm' />Promuovere l{"'"}uso di veicoli a basse emissioni o elettrici</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Adottare tecnologie di filtraggio nelle industrie e nelle centrali elettriche</li>
//       <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Informare e sensibilizzare la popolazione sui rischi associati all{"'"}esposizione al NO2</li>
//     </ul>
//   </div>
// );
export const No2 = () => {
  const { t } = useTranslation();
  const [no2Data, setNo2Data] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average',
        backgroundColor: 'rgba(100, 170, 255, 0.5)', 
        borderColor: '#1E90FF', 
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 0,
        pointRadius: 0,
        lineTension: 0.4,
      },
      {
        label: 'Trend',
        backgroundColor: 'rgba(102, 255, 178, 0.5)', 
        borderColor: '#32CD32', 
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 0,
        pointRadius: 0,
        lineTension: 0.4, 
      }
    ]
  });
  useEffect(() => {
    fetchData().then(data => {
      setNo2Data(prevData => updateNo2Data(prevData, data));
    });
  }, []);
 
  const impactIcons = [faExclamationTriangle, faCar, faLungs, faIndustry];
  const solutionIcons = [faWind, faSnowflake, faFlask, faHandsHelping];
  
  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-[#5b7a92] rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-[#c0d6e4]"> {t("no2.title")} </h1>
      <ul className="prose max-w-screen-lg">
        <p>
        {t("no2.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* <Impacts />
          <Solutions /> */}
          <Section
            title={t("no2.impactsTitle")}
            items={t("no2.impacts", { returnObjects: true })}
            icons={impactIcons}
          />
          <Section
            title={t("no2.solutionsTitle")}
            items={t("no2.solutions", { returnObjects: true })}
            icons={solutionIcons}
          />


        </div>
      </ul>
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-md w-full max-w-4xl mt-5 p-5">
        <LineChart chartData={no2Data} />
      </div>
    </div>
  );
}