import React, {useEffect, useRef, useState} from 'react';
import LanguageSelector from "./LanguageSelector";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {logoutSuccess} from "../redux/AuthActions";
import ProfileImage from "./ProfileImage";
import * as UserRole from "../shared/UserRole";

const TopBar = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLogged, username, image, displayName, role} = useSelector(store => ({
        isLogged: store.isLogged,
        username: store.username,
        image: store.image,
        displayName: store.displayName,
        role: store.role
    }))
    const [menuVisible, setMenuVisible] = useState(false);
    const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);

    const menuArea = useRef()
    // const hamburgerMenu = useRef()

    useEffect(() => {
        document.addEventListener("click", menuClickListener);
        // document.addEventListener("click", hamburgerMenuClickListener);
        return () => {
            document.removeEventListener("click", menuClickListener);
            // document.removeEventListener("click", hamburgerMenuClickListener);
        }
    }, [isLogged])

    const menuClickListener = (event) => {
        if (!menuArea.current?.contains(event.target))
            setMenuVisible(false);
    }

    // const hamburgerMenuClickListener = (event) => {
    //     console.log("hamburger");
    //     console.log("event target", event.target);
    //     console.log("hamburger current", hamburgerMenu.current);
    //     if (!hamburgerMenu.current?.contains(event.target))
    //         setHamburgerMenuVisible(false);
    // }

    const onClickLogout = event => {
        event.preventDefault();
        dispatch(logoutSuccess());
    }

    let links = (
        <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
                <Link className="nav-link text-light" to="/login">
                    {t("LOGIN")}
                </Link>
            </li>
            <li className="nav-item">
                <LanguageSelector/>
            </li>
        </ul>
    );

    if (isLogged) {
        links = (
            <ul className="navbar-nav d-flex align-items-center" ref={menuArea}>
                {
                    role == UserRole.ADMIN &&
                    <>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/category">
                                Category
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/createUser">
                                User Create
                            </Link>
                        </li>
                    </>
                }
                <li className="nav-item dropdown">
                    <div className="d-flex align-items-center" style={{cursor: "pointer"}}
                         onClick={() => setMenuVisible(!menuVisible)}>
                        <ProfileImage image={image} alt={username} width={32}
                                      height={32}
                                      className="rounded-circle shadow"/>
                        <span className="nav-link dropdown-toggle text-light ml-1">{displayName}</span>

                    </div>
                    <div className={"dropdown-menu shadow " + (menuVisible ? "show" : "")}>
                        <Link onClick={() => setMenuVisible(false)} className="dropdown-item d-flex flex-row p-2"
                              to={"/user/" + username}>
                            <span className="material-icons mr-2 text-info">person</span>
                            My Profile
                        </Link>
                        <span className="dropdown-item d-flex flex-row p-2" onClick={onClickLogout}
                              style={{cursor: "pointer"}}>
                            <span className="material-icons mr-2 text-danger">logout</span>
                            Logout
                        </span>

                    </div>
                </li>
                <li className="nav-item">
                    <LanguageSelector/>
                </li>
            </ul>
        )
    }

    return (
        <div className="sticky-top">
            <nav
                className="navbar navbar-expand bg-info text-light d-flex flex-wrap align-items-center ">
                <div>
                    <Link className="navbar-brand" to="/">
                        {/*<img src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" width="30"*/}
                        {/*     height="30" className="d-inline-block align-top" alt=""/>*/}
                        <h4 className="d-inline-block text-light ml-1">Arıza Kayıt Sistemi</h4>
                    </Link>
                </div>

                <div className="ml-auto d-flex align-items-center">
                    {links}
                    {/*<div>*/}
                    {/*    <LanguageSelector/>*/}
                    {/*</div>*/}
                </div>

            </nav>
        </div>


        // <div className="sticky-top">
        //     <nav className="navbar navbar-expand-md bg-info text-light navbar-dark">
        //         <Link className="navbar-brand" to="/">
        //             <img src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" width="30"
        //                  height="30" className="d-inline-block align-top" alt=""/>
        //             <h5 className="d-inline-block text-light ml-1">Arıza Kayıt Sistemi</h5>
        //         </Link>
        //         <button onClick={() => setHamburgerMenuVisible(!hamburgerMenuVisible)}
        //                 className="navbar-toggler" type="button"
        //                 // data-toggle="collapse"
        //                 // data-target="#collapsibleNavbar"
        //         >
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className={"collapse navbar-collapse hamburger-menu " + (hamburgerMenuVisible ? "show" : "")}
        //              // id="collapsibleNavbar"
        //         >
        //             {links}
        //         </div>
        //     </nav>
        // </div>
    );
}

export default TopBar;
