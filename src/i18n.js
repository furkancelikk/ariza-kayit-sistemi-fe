import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {register} from "timeago.js";

const storageLang = localStorage.getItem("lang");
const fallBackLang = storageLang !== "en" && storageLang !== "tr" ? "en" : storageLang;

i18n.use(initReactI18next).init({
    resources:{
        en: {
            translations: {
                USERNAME: "Username",
                DISPLAYNAME: "Display Name",
                PASSWORD: "Password",
                PASSWORDREPEAT: "Password Repeat",
                SIGNUP: "Sign Up",
                LOGIN: "Login",
                LOGIN_UPPERCASE: "LOGIN"
            }
        },
        tr: {
            translations: {
                USERNAME: "Kullanıcı Adı",
                DISPLAYNAME: "Görünen Ad",
                PASSWORD: "Şifre",
                PASSWORDREPEAT: "Şifre Tekrar",
                SIGNUP: "Kaydol",
                LOGIN: "Giriş Yap",
                LOGIN_UPPERCASE: "GİRİŞ YAP"
            }
        }
    },
    fallbackLng: fallBackLang,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true
    }
});

const timeagoTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}

register("tr", timeagoTR);

export default i18n;