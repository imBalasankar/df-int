import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CompanyIcon from "@material-ui/icons/Business";
import ModuleIcon from "@material-ui/icons/Extension";
import AllocationIcon from "@material-ui/icons/DoubleArrow";
import ProjectIcon from "@material-ui/icons/Build";
import DefectIcon from "@material-ui/icons/BugReport";
import DefectLogIcon from "@material-ui/icons/Notes";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  dualNested: {
    paddingLeft: theme.spacing(6)
  },
  customAvatar: {
    width: "22px",
    height: "22px",
    fontSize: "11px",
    backgroundColor: "#64b5f6"
  }
}));

export default function ListAllItems({ isDark }) {
  const classes = useStyles();
  let privileges = [];
  let privilege = [];
  let role = localStorage.getItem("role");
  privileges = JSON.parse(localStorage.getItem("privilege"));
  const [select, setSelect] = React.useState(null);
  const [openDashboard, setOpenDashboard] = React.useState(false);
  const [
    openCompanyAdminstration,
    setOpenCompanyAdminstration
  ] = React.useState(false);
  const [openModule, setOpenModule] = React.useState(false);
  const [openProjectAllocation, setOpenProjectAllocation] = React.useState(
    false
  );
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openDefectConfiguration, setOpenDefectConfiguration] = React.useState(
    false
  );

  const updateSelected = selectedIndex => {
    setSelect(selectedIndex);
  };

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  const handleCompanyAdminstrationClick = () => {
    setOpenCompanyAdminstration(!openCompanyAdminstration);
  };

  const handleModuleClick = () => {
    setOpenModule(!openModule);
  };

  const handleProjectAllocationClick = () => {
    setOpenProjectAllocation(!openProjectAllocation);
  };

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  const handleDefectConfigurationClick = () => {
    setOpenDefectConfiguration(!openDefectConfiguration);
  };

  const isAllowed = feature => {
    privilege = privileges.find(({ name }) => name === feature);
    return privilege[role];
  };

  return (
    <div>
      <List>
        {(isAllowed("Company Dashboard") ||
          isAllowed("Developer Dashboard") ||
          isAllowed("PM Dashboard") ||
          isAllowed("QA Dashboard") ||
          isAllowed("HR Dashboard")) && (
          <ListItem button onClick={handleDashboardClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            {openDashboard ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={openDashboard} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {isAllowed("Company Dashboard") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(1)}
                selected={select === 1}
                component={Link}
                to={"/dashboard/company"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>CO</Avatar>
                </ListItemIcon>
                <ListItemText primary="Company" />
              </ListItem>
            )}

            {isAllowed("HR Dashboard") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(2)}
                selected={select === 2}
                component={Link}
                to={"/dashboard/hr"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>HR</Avatar>
                </ListItemIcon>
                <ListItemText primary="HR" />
              </ListItem>
            )}

            {isAllowed("PM Dashboard") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(3)}
                selected={select === 3}
                component={Link}
                to={"/dashboard/project-manager"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>PM</Avatar>
                </ListItemIcon>
                <ListItemText primary="PM" />
              </ListItem>
            )}

            {isAllowed("Developer Dashboard") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(4)}
                selected={select === 4}
                component={Link}
                to={"/dashboard/developer"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>DE</Avatar>
                </ListItemIcon>
                <ListItemText primary="Developer" />
              </ListItem>
            )}

            {isAllowed("QA Dashboard") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(5)}
                selected={select === 5}
                component={Link}
                to={"/dashboard/qa"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>QA</Avatar>
                </ListItemIcon>
                <ListItemText primary="QA" />
              </ListItem>
            )}
          </List>
        </Collapse>

        {(isAllowed("View Employee") || isAllowed("View Client")) && (
          <ListItem button onClick={handleCompanyAdminstrationClick}>
            <ListItemIcon>
              <CompanyIcon />
            </ListItemIcon>
            <ListItemText primary="Company" />
            {openCompanyAdminstration ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={openCompanyAdminstration} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {isAllowed("View Employee") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(6)}
                selected={select === 6}
                component={Link}
                to={"/company-administration/manage-employee"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>ME</Avatar>
                </ListItemIcon>
                <ListItemText primary="Manage Employee" />
              </ListItem>
            )}

            {isAllowed("View Client") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(7)}
                selected={select === 7}
                component={Link}
                to={"/company-administration/manage-client"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>MC</Avatar>
                </ListItemIcon>
                <ListItemText primary="Manage Client" />
              </ListItem>
            )}
          </List>
        </Collapse>

        {isAllowed("View Project") && (
          <ListItem
            button
            component={Link}
            to={"/manage-project"}
            onClick={() => updateSelected(8)}
            selected={select === 8}
            style={{ color: isDark ? "#FFF" : "" }}
          >
            <ListItemIcon>
              <ProjectIcon />
            </ListItemIcon>
            <ListItemText primary="Project" />
          </ListItem>
        )}

        {(isAllowed("View Module") || isAllowed("View Submodule")) && (
          <ListItem button onClick={handleModuleClick}>
            <ListItemIcon>
              <ModuleIcon />
            </ListItemIcon>
            <ListItemText primary="Module" />
            {openModule ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={openModule} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {isAllowed("View Module") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(9)}
                selected={select === 9}
                component={Link}
                to={"/module/manage-module"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>MM</Avatar>
                </ListItemIcon>
                <ListItemText primary="Manage Module" />
              </ListItem>
            )}

            {isAllowed("View Submodule") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(10)}
                selected={select === 10}
                component={Link}
                to={"/module/manage-submodule"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>MS</Avatar>
                </ListItemIcon>
                <ListItemText primary="Manage Submodule" />
              </ListItem>
            )}
          </List>
        </Collapse>

        {(isAllowed("View Project Allocation") ||
          isAllowed("View Module Allocation")) && (
          <ListItem button onClick={handleProjectAllocationClick}>
            <ListItemIcon>
              <AllocationIcon />
            </ListItemIcon>
            <ListItemText primary="Allocation" />
            {openProjectAllocation ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={openProjectAllocation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {isAllowed("View Project Allocation") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(11)}
                selected={select === 11}
                component={Link}
                to={"/allocation/manage-project-allocation"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>PA</Avatar>
                </ListItemIcon>
                <ListItemText primary="Project Allocation" />
              </ListItem>
            )}

            {isAllowed("View Module Allocation") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(12)}
                selected={select === 12}
                component={Link}
                to={"/allocation/manage-module-allocation"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>MA</Avatar>
                </ListItemIcon>
                <ListItemText primary="Module Allocation" />
              </ListItem>
            )}
          </List>
        </Collapse>

        {isAllowed("View Defect") && (
          <ListItem
            button
            onClick={() => updateSelected(13)}
            selected={select === 13}
            component={Link}
            to={"/manage-defect"}
            style={{ color: isDark ? "#FFF" : "" }}
          >
            <ListItemIcon>
              <DefectIcon />
            </ListItemIcon>
            <ListItemText primary="Defect" />
          </ListItem>
        )}

        {isAllowed("View Defect Log") && (
          <ListItem
            button
            onClick={() => updateSelected(22)}
            selected={select === 22}
            component={Link}
            to={"/defect-log"}
            style={{ color: isDark ? "#FFF" : "" }}
          >
            <ListItemIcon>
              <DefectLogIcon />
            </ListItemIcon>
            <ListItemText primary="Defect Log" />
          </ListItem>
        )}

        {isAllowed("Update User Profile") && (
          <ListItem button onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {isAllowed("Update User Profile") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(14)}
                selected={select === 14}
                component={Link}
                to={"/settings/user-profile"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>UP</Avatar>
                </ListItemIcon>
                <ListItemText primary="User Profile" />
              </ListItem>
            )}

            {isAllowed("View Designation") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(15)}
                selected={select === 15}
                component={Link}
                to={"/settings/employee-configuration/manage-designation"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>EC</Avatar>
                </ListItemIcon>
                <ListItemText primary="Employee Configuration" />
              </ListItem>
            )}

            {isAllowed("View Role") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(16)}
                selected={select === 16}
                component={Link}
                to={"/settings/project-configuration/manage-role"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>PC</Avatar>
                </ListItemIcon>
                <ListItemText primary="Project Configuration" />
              </ListItem>
            )}

            {isAllowed("View Priority") && (
              <ListItem
                button
                className={classes.nested}
                onClick={handleDefectConfigurationClick}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>DC</Avatar>
                </ListItemIcon>
                <ListItemText primary="Defect Configuration" />
                {openDefectConfiguration ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            )}
            <Collapse in={openDefectConfiguration} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {isAllowed("View Priority") && (
                  <ListItem
                    button
                    className={classes.dualNested}
                    onClick={() => updateSelected(17)}
                    selected={select === 17}
                    component={Link}
                    to={"/settings/defect-configuration/priority"}
                    style={{ color: isDark ? "#FFF" : "" }}
                  >
                    <ListItemText primary="Priority" />
                  </ListItem>
                )}

                {isAllowed("View Severity") && (
                  <ListItem
                    button
                    className={classes.dualNested}
                    onClick={() => updateSelected(18)}
                    selected={select === 18}
                    component={Link}
                    to={"/settings/defect-configuration/severity"}
                    style={{ color: isDark ? "#FFF" : "" }}
                  >
                    <ListItemText primary="Severity" />
                  </ListItem>
                )}

                {isAllowed("View Type") && (
                  <ListItem
                    button
                    className={classes.dualNested}
                    onClick={() => updateSelected(19)}
                    selected={select === 19}
                    component={Link}
                    to={"/settings/defect-configuration/type"}
                    style={{ color: isDark ? "#FFF" : "" }}
                  >
                    <ListItemText primary="Type" />
                  </ListItem>
                )}

                {isAllowed("View Status") && (
                  <ListItem
                    button
                    className={classes.dualNested}
                    onClick={() => updateSelected(20)}
                    selected={select === 20}
                    component={Link}
                    to={"/settings/defect-configuration/status"}
                    style={{ color: isDark ? "#FFF" : "" }}
                  >
                    <ListItemText primary="Status" />
                  </ListItem>
                )}
              </List>
            </Collapse>

            {isAllowed("Set Privileges") && (
              <ListItem
                button
                className={classes.nested}
                onClick={() => updateSelected(21)}
                selected={select === 21}
                component={Link}
                to={"/settings/privileges"}
                style={{ color: isDark ? "#FFF" : "" }}
              >
                <ListItemIcon>
                  <Avatar className={classes.customAvatar}>PR</Avatar>
                </ListItemIcon>
                <ListItemText primary="Privileges" />
              </ListItem>
            )}
          </List>
        </Collapse>
      </List>
    </div>
  );
}
