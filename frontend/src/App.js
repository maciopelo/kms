import "./sassStyles/index.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Kids from "./pages/Kids/Kids";
import Groups from "./pages/Groups/Groups";
import Employees from "./pages/Employees/Employees";
import Chat from "./pages/Chat/Chat";
import About from "./pages/About/About";
import Files from "./pages/Files/Files";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./store/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/news" component={News} />
          <PrivateRoute path="/kids" component={Kids} />
          <PrivateRoute path="/groups" component={Groups} />
          <PrivateRoute path="/employees" component={Employees} />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute path="/files" component={Files} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
