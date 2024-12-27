import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import enLang from './locales/en.json'
import itLang from './locales/it.json'


// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation:enLang
  
  },
  it: {
    translation:itLang
   
 
},
};

i18n
  .use(HttpBackend) // Aggiungi supporto per il caricamento delle traduzioni
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "it",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;