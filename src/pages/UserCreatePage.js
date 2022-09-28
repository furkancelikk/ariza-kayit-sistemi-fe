import React, {useEffect, useState} from "react";
import Input from "../components/Input";
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {useDispatch} from "react-redux";
import {signupHandler} from "../redux/AuthActions";
import * as UserRole from "../shared/UserRole";
import {getCategories} from "../api/apiCalls";
import Select from "react-select";
import {toastSuccess} from "../shared/notifyToast";

const UserCreatePage = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        role: 0,
        categories: []
    });
    const [errors, setErrors] = useState({});
    const [isApiCall, setIsApiCall] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        if (user.password !== user.passwordRepeat)
            setErrors(err => ({...err, passwordRepeat: "Password mismatch"}));
        else
            setErrors(err => ({...err, passwordRepeat: undefined}));
    }, [user.password, user.passwordRepeat])

    useEffect(() => {
        const getAllCagetories = async () => {
            try {
                const response = await getCategories(true);
                response.data.map(category => {
                    setCategoryList(prev => [...prev, {value: category, label: category.name}]);
                });
            } catch (err) {
            }
        }
        getAllCagetories();
    }, [])

    const onChange = event => {
        const {name, value} = event.target;
        setErrors(err => ({...err, [name]: undefined}));
        setUser(usr => ({...usr, [name]: value}));
    };

    const onChangeSelectCategory = selectedOption => {
        setErrors(err => ({...err, categories: undefined}));
        setUser(usr => ({...usr, categories: selectedOption}));
    };

    const onClick = async event => {
        event.preventDefault();

        if (user.role !== UserRole.USER && user.role !== UserRole.PERSONNEL) {
            setErrors(err => ({...err, role: "Kullanıcı rolünü seçin"}));
            return;
        }

        setIsApiCall(true);

        const categories = [];
        user.categories.map(category => {categories.push(category.value)})
        const body = {
            username: user.username,
            displayName: user.displayName,
            password: user.password,
            categories
        }
        try {
            await dispatch(signupHandler(body, user.role));
            toastSuccess("User Created");
            props.history.push("/");
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }
        setIsApiCall(false);
    };

    return (
        <div>
            <h4 className="text-center text-uppercase">New User</h4>
            <form>
                <Input name="username" label={t("USERNAME")} onChange={onChange} defaulValue={user.username}
                       error={errors.username}/>
                <Input name="displayName" label={t("DISPLAYNAME")} onChange={onChange}
                       defaulValue={user.displayName} error={errors.displayName}/>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Type</label>
                    </div>
                    <select value={user.role} name="role" onChange={onChange}
                            className={errors.role ? "custom-select is-invalid" : "custom-select"}
                            id="validationCustom04" required>
                        <option disabled value={0}>Choose...</option>
                        <option value={UserRole.USER}>User</option>
                        <option value={UserRole.PERSONNEL}>Personnel</option>
                    </select>
                    <div className="invalid-feedback">
                        {errors.role}
                    </div>
                </div>
                {
                    user.role == UserRole.PERSONNEL &&
                    <div className="mb-3">
                        <Select
                            className={errors.categories && "is-invalid"}
                            value={user.categories}
                            name="categories"
                            onChange={onChangeSelectCategory}
                            options={categoryList}
                            isMulti={true}
                        />
                        <div className="invalid-feedback">
                            {errors.categories}
                        </div>
                    </div>
                    // <div className="input-group mb-3">
                    //     <div className="input-group-prepend">
                    //         <label className="input-group-text">Category</label>
                    //     </div>
                    //     <select multiple name="categories"
                    //             className={errors.categories ? "custom-select is-invalid" : "custom-select"}
                    //             required onChange={onChange}>
                    //         {
                    //             categoryList.map((category, index) => (
                    //                 <option value={category.id}>{category.name}</option>
                    //             ))
                    //         }
                    //     </select>
                    //     <div className="invalid-feedback">
                    //         {errors.categories}
                    //     </div>
                    //
                    // </div>
                }

                <Input name="password" label={t("PASSWORD")} onChange={onChange} type="password"
                       defaulValue={user.password} error={errors.password}/>
                <Input name="passwordRepeat" label={t("PASSWORDREPEAT")} onChange={onChange} type="password"
                       defaulValue={user.passwordRepeat} error={errors.passwordRepeat}/>

                <ButtonWithProgress onClick={onClick} disabled={isApiCall || errors.passwordRepeat}
                                    isApiCall={isApiCall} text={t("Submit")}/>

            </form>
        </div>
    )
}

// const UserSignupPageWithApiProgress = withApiProgress(UserCreatePage, "/api/1.0/user");

// const UserSignupPageWithTranslations = withTranslation()(UserCreatePage);

export default UserCreatePage;