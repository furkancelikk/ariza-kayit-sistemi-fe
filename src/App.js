import './App.css';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserSignupPage from "./pages/UserSignupPage";
import TopBar from "./components/TopBar";
import {useSelector} from "react-redux";

function App() {

    const {isLogged} = useSelector(store => ({isLogged: store.isLogged}));

    return (
        <div>
            <Router>
                <TopBar/>
                <div className="container p-3">
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        {!isLogged && <Route path="/login" component={LoginPage}/>}
                        {!isLogged && <Route path="/signup" component={UserSignupPage}/>}
                        <Route path="/user/:username" component={UserPage}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
            {/*<div className="row">*/}
            {/*    <div className="col">*/}
            {/*        <UserSignupPage/>*/}
            {/*    </div>*/}
            {/*    <div className="col">*/}
            {/*        <LoginPage/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
