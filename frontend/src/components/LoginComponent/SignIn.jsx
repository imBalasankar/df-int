import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Links from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { LOGIN_BASE_URL, APP_BASE_URL } from "../../api";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const divStyle = {
  marginRight: "200px",
  marginLeft: "230px",
  marginTop: "40px"
};

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: ""
  });
  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [privilege, setPrivilege] = React.useState([]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    Axios.get(`${LOGIN_BASE_URL}/privilege`)
      .then(response => {
        setPrivilege(response.data.results.listAllPrivilege);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const gotoDashboard = role => {
    if (role === "softwareEngineer") {
      window.location.href = `${APP_BASE_URL}/dashboard/developer`;
    } else if (role === "projectManager") {
      window.location.href = `${APP_BASE_URL}/dashboard/project-manager`;
    } else if (role === "qaEngineer") {
      window.location.href = `${APP_BASE_URL}/dashboard/qa`;
    } else if (role === "companyAdmin") {
      window.location.href = `${APP_BASE_URL}/dashboard/company`;
    } else if (role === "hrManager") {
      window.location.href = `${APP_BASE_URL}/dashboard/hr`;
    } else {
      window.location.href = `${APP_BASE_URL}`;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    Axios.post(`${LOGIN_BASE_URL}/user/auth`, values)
      .then(response => {
        console.log(response);
        setShowResult("alert alert-success");
        setMessage(response.data.message);
        localStorage.setItem("id", response.data.results.listLoggedinUser.id);
        localStorage.setItem(
          "role",
          response.data.results.listLoggedinUser.designationName
        );
        localStorage.setItem("privilege", JSON.stringify(privilege));
        localStorage.setItem(
          "username",
          response.data.results.listLoggedinUser.username
        );
        let role = response.data.results.listLoggedinUser.designationName;
        gotoDashboard(role);
      })

      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage(
          error.response
            ? error.response.data.message
            : "Failed to Authenticate!"
        );
      });
  };

  return (
    <div>
      <div style={divStyle} className={showResult} role="alert">
        {message}
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              value={values.username}
              onChange={handleChange("username")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Links href="/forgot-password" variant="body2">
                  Forgot password?
                </Links>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
