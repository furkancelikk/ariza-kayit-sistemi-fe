import Input from "../components/Input";
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {useDispatch} from "react-redux";
import {loginHandler} from "../redux/AuthActions";
import {useEffect, useState} from "react";

const LoginPage = (props) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [isApiCall, setIsApiCall] = useState(null);

    const {t} = useTranslation();
    const disableBtn = username && password;
    const dispatch = useDispatch();

    // const onChange = event => {
    //     const {name, value} = event.target;
    //     if (name == "username")
    //         setUsername(value);
    //     else if (name == "password")
    //         setPassword(value);
    // }

    useEffect(() => {
       setError(null);
    }, [username, password])

    const onClick = async event => {
        event.preventDefault();
        setError(null);
        setIsApiCall(true);

        const creds = {
            username,
            password
        }
        try {
            await dispatch(loginHandler(creds));
            props.history.push("/");
        } catch (apiError) {
            setError(apiError.response.data.message)
        }
        setIsApiCall(false);
    }

    return (
        <div>
            <h2 className="text-center text-uppercase">{t("LOGIN_UPPERCASE")}</h2>
            <form>
                <Input label={t("USERNAME")} onChange={(event) => setUsername(event.target.value)} defaultValue={username}/>
                <Input label={t("PASSWORD")} onChange={(event) => setPassword(event.target.value)} defaultValue={password}
                       type="password"/>
                <ButtonWithProgress onClick={onClick} disabled={!disableBtn || isApiCall} isApiCall={isApiCall}
                                    text={t("LOGIN")}/>
            </form>
            {
                error &&
                <div className="alert alert-danger my-3" role="alert">
                    {error}
                </div>
            }
        </div>
    );

}

// const LoginPageWithApiProgress = withApiProgress(LoginPage, "/api/1.0/auth");

// const LoginPageWithTranslations = withTranslation()(LoginPage);

export default LoginPage;