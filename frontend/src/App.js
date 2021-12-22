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
import Children from "./pages/Children/Children";
import Groups from "./pages/Groups/Groups";
import Chat from "./pages/Chat/Chat";
import About from "./pages/About/About";
import Files from "./pages/Files/Files";
import PrivateRoute from "./utils/PrivateRoute";
import NewsTemplate from "./templates/NewsTemplate/NewsTemplate";
import ChildrenTemplate from "./templates/ChildrenTemplate/ChildrenTemplate";
import { AuthProvider } from "./store/contexts/AuthContext";
import { ModalProvider } from "./store/contexts/ModalContext";
import { ThemeProvider } from "./store/contexts/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/news/:id" component={NewsTemplate} />
              <PrivateRoute
                exact
                path="/children/:id"
                component={ChildrenTemplate}
              />
              <PrivateRoute exact path="/news" component={News} />
              <PrivateRoute path="/children" component={Children} />
              <PrivateRoute path="/news/:id" component={NewsTemplate} />
              <PrivateRoute path="/groups" component={Groups} />
              <PrivateRoute path="/chat" component={Chat} />
              <PrivateRoute path="/about" component={About} />
              <PrivateRoute path="/files" component={Files} />
            </Switch>
          </Router>
        </ThemeProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
