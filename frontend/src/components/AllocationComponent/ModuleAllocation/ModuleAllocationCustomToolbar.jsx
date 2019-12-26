import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AllocationIcon from "@material-ui/icons/DoubleArrow";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  fab: {
    marginLeft: theme.spacing(1)
  }
}));

export default function ModuleAllocationCustomToolbar() {
  const classes = useStyles();
  let privileges = [];
  let privilege = [];
  let role = localStorage.getItem("role");
  privileges = JSON.parse(localStorage.getItem("privilege"));

  const isAllowed = feature => {
    privilege = privileges.find(({ name }) => name === feature);
    return privilege[role];
  };

  return (
    <React.Fragment>
      {isAllowed("Allocate Module") && (
        <Tooltip title={"Add"}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            size="small"
            component={Link}
            to={"/allocation/manage-module-allocation/allocate"}
            style={{ color: "#FFF" }}
          >
            <AllocationIcon />
          </Fab>
        </Tooltip>
      )}
    </React.Fragment>
  );
}
