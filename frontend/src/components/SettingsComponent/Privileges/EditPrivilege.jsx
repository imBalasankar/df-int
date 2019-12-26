import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import Axios from "axios";
import { LOGIN_BASE_URL } from "../../../api";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  textField: {
    marginRight: theme.spacing(3),
    width: "250px"
  },
  table: {
    minWidth: 700
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const divStyle = {
  marginRight: "22px",
  marginTop: "10px"
};

export default function EditPrivilege({ id }) {
  const classes = useStyles();
  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({
    id: "",
    name: "",
    companyAdmin: "",
    hrManager: "",
    projectManager: "",
    softwareEngineer: "",
    qaEngineer: ""
  });

  useEffect(() => {
    Axios.get(`${LOGIN_BASE_URL}/privilege/ID${id}`)
      .then(response => {
        console.log(response);
        let result = response.data.results.listPrivilege;
        setData(result);
      })
      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage("Failed to Retrive Data!!");
      });
    // eslint-disable-next-line
  }, [id]);

  const setData = data => {
    setValues({
      id: data.id,
      name: data.name,
      companyAdmin: data.companyAdmin,
      hrManager: data.hrManager,
      projectManager: data.projectManager,
      softwareEngineer: data.softwareEngineer,
      qaEngineer: data.qaEngineer
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
    console.log(values);
  };

  const updatePrivilege = () => {
    Axios.put(`http://localhost:8089/api/v1/privilege`, values)
      .then(response => {
        console.log(response);
        setShowResult("alert alert-success");
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage("Failed to Update!!");
      });
  };

  return (
    <div>
      <div style={divStyle} className={showResult} role="alert">
        {message}
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Privileges</StyledTableCell>
              <StyledTableCell align="right">Admin</StyledTableCell>
              <StyledTableCell align="right">HR</StyledTableCell>
              <StyledTableCell align="right">PM</StyledTableCell>
              <StyledTableCell align="right">Dev</StyledTableCell>
              <StyledTableCell align="right">QA</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={values.id}>
              <TableCell>{values.name}</TableCell>
              <TableCell align="right">
                <Switch
                  checked={values.companyAdmin}
                  onChange={handleChange("companyAdmin")}
                />
              </TableCell>
              <TableCell align="right">
                <Switch
                  checked={values.hrManager}
                  onChange={handleChange("hrManager")}
                />
              </TableCell>
              <TableCell align="right">
                <Switch
                  checked={values.projectManager}
                  onChange={handleChange("projectManager")}
                />
              </TableCell>
              <TableCell align="right">
                <Switch
                  checked={values.softwareEngineer}
                  onChange={handleChange("softwareEngineer")}
                />
              </TableCell>
              <TableCell align="right">
                <Switch
                  checked={values.qaEngineer}
                  onChange={handleChange("qaEngineer")}
                />
              </TableCell>
              <TableCell align="right">
                <Fab
                  color="default"
                  aria-label="edit"
                  className={classes.fab}
                  size="small"
                  onClick={updatePrivilege}
                >
                  <DoneIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
