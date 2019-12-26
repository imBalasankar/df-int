import React from "react";
import "./App.css";
import MainDrawer from "./components/Main/MainDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/LoginComponent/SignIn";
import ForgotPassword from "./components/LoginComponent/ForgotPassword";
import ChangePassword from "./components/LoginComponent/ChangePassword";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

function App() {
  const [dark, setDark] = React.useState(false);

  const changeTheme = () => {
    setDark(!dark);
  };

  const prefersDarkMode = dark;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/change-password">
            <ChangePassword />
          </Route>
          <Route path="/">
            <ThemeProvider theme={theme}>
              <MainDrawer onToggleDark={changeTheme} isDark={dark} />
            </ThemeProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
