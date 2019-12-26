import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import { EMPLOYEE_BASE_URL } from "../../../api";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: "left",
    borderRadius: "4px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.1), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    marginTop: theme.spacing(5),
    margin: theme.spacing(3),
    padding: theme.spacing(5)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: "825px"
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    width: "120px"
  }
}));

const divStyle = {
  marginRight: "50px",
  marginLeft: "50px",
  marginTop: "20px"
};

export default function UserProfile() {
  const classes = useStyles();
  let username = localStorage.getItem("username");
  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    Axios.get(`${EMPLOYEE_BASE_URL}/employee/UN${username}`)
      .then(response => {
        let result = response.data.results.listEmployee;
        updateData(result);
      })
      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage("Failed to Retrive Data!!");
      });
  }, [username]);

  const updateData = data => {
    setValues({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
      newPassword: data.newPassword
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (values.newPassword === values.confirmPassword) {
      Axios.put(`${EMPLOYEE_BASE_URL}/employee/password`, values)
        .then(response => {
          console.log(response);
          setShowResult("alert alert-success");
          setMessage(response.data.message);
        })
        .catch(error => {
          console.log(error);
          setShowResult("alert alert-danger");
          setMessage(
            error.response ? error.response.data.message : "Failed to Update!"
          );
        });
    } else {
      alert("New and Confirm Passwords do not Match!!");
    }
  };

  return (
    <div>
      <div style={divStyle} className={showResult} role="alert">
        {message}
      </div>
      <Container className={classes.container}>
        <Paper
          className={classes.paper}
          components={{
            Container: props => <Paper {...props} elevation={4} />
          }}
        >
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container>
              <TextField
                disabled
                id="employee-name"
                label="Employee Name"
                value={values.firstName + " " + values.lastName}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                disabled
                id="employee-email"
                label="Employee Email"
                value={values.email}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                disabled
                id="employee-uname"
                label="Username"
                value={values.username}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="old-pw"
                label="Old Password"
                className={classes.textField}
                value={values.password}
                onChange={handleChange("password")}
                type="password"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="new-pw"
                label="New Password"
                className={classes.textField}
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                type="password"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="verify-pw"
                label="Confirm Password"
                className={classes.textField}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                type="password"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid container justify="flex-start">
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
