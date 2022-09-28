import './App.css';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/user/UserPage";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserCreatePage from "./pages/UserCreatePage";
import TopBar from "./components/TopBar";
import {useSelector} from "react-redux";
import * as UserRole from "../src/shared/UserRole";
import Category from "./pages/category/Category";
import PostDetail from "./pages/post/PostDetail";
import {ToastContainer} from "react-toastify";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const {isLogged, role} = useSelector(store => ({
        isLogged: store.isLogged,
        role: store.role
    }));

    return (
        <div>
            <Router>
                <TopBar/>
                <div className="container p-3">
                    <ToastContainer position="top-right"/>
                    <Switch>
                        {isLogged && <Route exact path="/" component={HomePage}/>}
                        {isLogged && <Route path="/user/:username" component={UserPage}/>}
                        {(isLogged && role == UserRole.ADMIN) && <Route path="/category" component={Category}/>}
                        {(isLogged && role == UserRole.ADMIN) && <Route path="/createUser" component={UserCreatePage}/>}
                        {(isLogged) && <Route path="/post/:postID" component={PostDetail}/>}
                        {!isLogged && <Route path="/login" component={LoginPage}/>}
                        <Redirect to={isLogged ? "/" : "/login"}/>
                    </Switch>
                </div>
            </Router>
            {/*<div className="row">*/}
            {/*    <div className="col">*/}
            {/*        <UserCreatePage/>*/}
            {/*    </div>*/}
            {/*    <div className="col">*/}
            {/*        <LoginPage/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
