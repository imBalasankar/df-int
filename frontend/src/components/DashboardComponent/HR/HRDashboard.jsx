import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ViewProjects from "./ViewEmployees";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1)
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(3),
    position: "relative"
  }
}));

export default function HRDashboard({ isDark }) {
  const classes = useStyles();
  const styleCard = {
    height: "11rem",
    backgroundColor: isDark ? "#424242" : null
  };

  const styleHead = { height: "5rem" };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Paper className={classes.paper}>
            <div className="card border-primary mb-3" style={styleCard}>
              <div
                className={
                  isDark
                    ? "card-header h5 text-white"
                    : "card-header h5 text-secondary"
                }
                style={styleHead}
              >
                Employees
              </div>
              <div className="card-body text-danger">
                <h5 className="card-title h1">90</h5>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Paper className={classes.paper}>
            <div className="card border-primary mb-3" style={styleCard}>
              <div
                className={
                  isDark
                    ? "card-header h5 text-white"
                    : "card-header h5 text-secondary"
                }
                style={styleHead}
              >
                Active
              </div>
              <div className="card-body text-success">
                <h5 className="card-title h1">80</h5>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Paper className={classes.paper}>
            <div className="card border-primary mb-3" style={styleCard}>
              <div
                className={
                  isDark
                    ? "card-header h5 text-white"
                    : "card-header h5 text-secondary"
                }
                style={styleHead}
              >
                Bench
              </div>
              <div className="card-body text-info">
                <h5 className="card-title h1">8</h5>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Paper className={classes.paper}>
            <div className="card border-primary mb-3" style={styleCard}>
              <div
                className={
                  isDark
                    ? "card-header h5 text-white"
                    : "card-header h5 text-secondary"
                }
                style={styleHead}
              >
                PM
              </div>
              <div className="card-body text-warning">
                <h5 className="card-title h1">4</h5>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Paper className={classes.paper}>
            <div className="card border-primary mb-3" style={styleCard}>
              <div
                className={
                  isDark
                    ? "card-header h5 text-white"
                    : "card-header h5 text-secondary"
                }
                style={styleHead}
              >
                Software Engineers
              </div>
              <div className="card-body text-secondary">
                <h5 className="card-title h1">38</h5>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <Paper className={classes.paper}>
            <div className="card border-primary mb-3" style={styleCard}>
              <div
                className={
                  isDark
                    ? "card-header h5 text-white"
                    : "card-header h5 text-secondary"
                }
                style={styleHead}
              >
                QA Engineers
              </div>
              <div className="card-body text-primary">
                <h5 className="card-title h1">38</h5>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <DoughnutChart isDark={isDark} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <LineChart isDark={isDark} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <ViewProjects />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <BarChart isDark={isDark} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <PieChart isDark={isDark} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
