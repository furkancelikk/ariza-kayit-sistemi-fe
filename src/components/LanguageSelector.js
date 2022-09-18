// import i18n from "i18next";
import {useState} from "react";
import {useTranslation} from "react-i18next";

function LanguageSelector(){

    const {i18n} = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    const changeLanguage = language => {
        i18n.changeLanguage(language);
        localStorage.setItem("lang", language);
        setLang(language);
    }

    return(
        <div>
            {
                lang === "tr" &&
                <div onClick={() => changeLanguage("en")} style={{cursor: "pointer"}}>
                    <img src="https://flagcdn.com/24x18/tr.png" alt="Türkçe" style={{marginRight: "5px"}}/>
                    TR
                </div>
            }
            {
                lang === "en" &&
                <div onClick={() => changeLanguage("tr")} style={{cursor: "pointer"}}>
                    <img src="https://flagcdn.com/24x18/us.png" alt="English" style={{marginRight: "5px"}}/>
                    US
                </div>
            }
        </div>
    )
}

export default LanguageSelector;