import {useEffect, useState} from "react";
import Input from "../components/Input";
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {useDispatch} from "react-redux";
import {signupHandler} from "../redux/AuthActions";

const UserSignupPage = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    });
    const [errors, setErrors] = useState({});
    const [isApiCall, setIsApiCall] = useState(null);

    useEffect(() => {
        if (user.password !== user.passwordRepeat)
            setErrors(err => ({...err, passwordRepeat: "Password mismatch"}));
        else
            setErrors(err => ({...err, passwordRepeat: undefined}));
    }, [user.password, user.passwordRepeat])

    const onChange = event => {
        const {name, value} = event.target;
        setErrors(err => ({...err, [name]: undefined}));
        setUser(usr => ({...usr, [name]: value}));
    };

    const onClick = async event => {
        event.preventDefault();
        setIsApiCall(true);

        const body = {
            username: user.username,
            displayName: user.displayName,
            password: user.password
        }
        try {
            await dispatch(signupHandler(body));
            props.history.push("/");
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }
        setIsApiCall(false);
    };

    return (
        <div>
            <h2 className="text-center text-uppercase">{t("SIGNUP")}</h2>
            <form>
                <Input name="username" label={t("USERNAME")} onChange={onChange} defaulValue={user.username}
                       error={errors.username}/>
                <Input name="displayName" label={t("DISPLAYNAME")} onChange={onChange}
                       defaulValue={user.displayName} error={errors.displayName}/>
                <Input name="password" label={t("PASSWORD")} onChange={onChange} type="password"
                       defaulValue={user.password} error={errors.password}/>
                <Input name="passwordRepeat" label={t("PASSWORDREPEAT")} onChange={onChange} type="password"
                       defaulValue={user.passwordRepeat} error={errors.passwordRepeat}/>
                <ButtonWithProgress onClick={onClick} disabled={isApiCall || errors.passwordRepeat}
                                    isApiCall={isApiCall} text={t("SIGNUP")}/>

            </form>
        </div>
    )
}

// const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, "/api/1.0/user");

// const UserSignupPageWithTranslations = withTranslation()(UserSignupPage);

export default UserSignupPage;