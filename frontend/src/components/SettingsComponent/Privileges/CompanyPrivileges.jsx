import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditPrivilege from "./EditPrivilege";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const divStyle = {
  marginRight: "35px",
  marginLeft: "35px",
  marginTop: "30px"
};

export default function CompanyPrivileges() {
  const classes = useStyles();
  const [openBackDrop, setOpenBackDrop] = React.useState(true);
  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [trackEdit, setTrackEdit] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [privileges, setPrivileges] = React.useState([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [privilegeId, setPrivilegeId] = React.useState("");

  const handleTrackEdit = () => {
    setTrackEdit(!trackEdit);
  };

  useEffect(() => {
    Axios.get(`${LOGIN_BASE_URL}/privilege`)
      .then(response => {
        console.log(response);
        setPrivileges(response.data.results.listAllPrivilege);
        setOpenBackDrop(false);
      })
      .catch(error => {
        console.log(error);
        setOpenBackDrop(false);
        setShowResult("alert alert-danger");
        setMessage("Failed to Retrive Data!!");
      });
  }, [trackEdit]);

  const handleEditOpen = id => {
    setPrivilegeId(id);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    handleTrackEdit();
    setOpenEdit(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div style={divStyle} className={showResult} role="alert">
        {message}
      </div>
      <Container className={classes.container}>
        <Backdrop className={classes.backdrop} open={openBackDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
                <StyledTableCell align="right">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {privileges
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(privilege => (
                  <TableRow key={privilege.id}>
                    <TableCell>{privilege.name}</TableCell>
                    <TableCell align="right">
                      <Switch checked={privilege.companyAdmin} />
                    </TableCell>
                    <TableCell align="right">
                      <Switch checked={privilege.hrManager} />
                    </TableCell>
                    <TableCell align="right">
                      <Switch checked={privilege.projectManager} />
                    </TableCell>
                    <TableCell align="right">
                      <Switch checked={privilege.softwareEngineer} />
                    </TableCell>
                    <TableCell align="right">
                      <Switch checked={privilege.qaEngineer} />
                    </TableCell>
                    <TableCell align="right">
                      <Fab
                        color="default"
                        aria-label="edit"
                        className={classes.fab}
                        size="small"
                        onClick={() => handleEditOpen(privilege.id)}
                      >
                        <EditIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={privileges.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "previous page"
              }}
              nextIconButtonProps={{
                "aria-label": "next page"
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>

          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby="edit-status-title"
            fullWidth={true}
            maxWidth={"md"}
          >
            <DialogTitle id="edit-status-title">Update Privilege</DialogTitle>
            <Divider />
            <DialogContent>
              <EditPrivilege id={privilegeId} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </div>
  );
}
