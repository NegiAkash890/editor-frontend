import { createContext } from "react";

const LanguageContext = createContext(
    {
        language:"cpp",
        setLanguage:(lang) => {}
    }
);

const LanguageContextProvider = LanguageContext.Provider;
const LanguageContextConsumer = LanguageContext.Consumer;

export { LanguageContext, LanguageContextProvider, LanguageContextConsumer };