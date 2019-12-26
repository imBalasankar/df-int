import React from "react";
import Links from "@material-ui/core/Link";
import { Switch, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CompanyDashboard from "../DashboardComponent/Company/CompanyDashboard";
import DeveloperDashboard from "../DashboardComponent/Developer/DeveloperDashboard";
import ProjectManagerDashboard from "../DashboardComponent/ProjectManager/ProjectManagerDashboard";
import QADashboard from "../DashboardComponent/QA/QADashboard";
import ManageEmployee from "../CompanyComponent/ManageEmployees/ManageEmployee";
import AddEmployee from "../CompanyComponent/ManageEmployees/AddEmployeeForm";
import EditEmployee from "../CompanyComponent/ManageEmployees/EditEmployeeForm";
import ManageClient from "../CompanyComponent/ManageClients/ManageClient";
import AddClient from "../CompanyComponent/ManageClients/AddClientForm";
import EditClient from "../CompanyComponent/ManageClients/EditClientForm";
import ManageProject from "../ProjectComponent/ManageProjects";
import AddProject from "../ProjectComponent/AddProjectForm";
import EditProject from "../ProjectComponent/EditProjectForm";
import ManageModule from "../ModuleComponent/ManageModule";
import ManageSubmodule from "../ModuleComponent/SubModule/ManageSubModule";
import ProjectAllocation from "../AllocationComponent/ProjectAllocation/ManageProjectAllocation";
import ProjectEmployee from "../AllocationComponent/ProjectAllocation/ProjectEmployee";
import ModuleAllocation from "../AllocationComponent/ModuleAllocation/ManageModuleAllocation";
import ModuleEmployee from "../AllocationComponent/ModuleAllocation/ModuleEmployee";
import ManageDefect from "../DefectComponent/ManageDefects";
import AddDefectForm from "../DefectComponent/AddDefectForm";
import EditDefectForm from "../DefectComponent/EditDefectForm";
import DefectLog from "../DefectLog/ManageLog";
import UserProfile from "../SettingsComponent/UserProfile/UserProfile";
import ManageEmployeeDesignation from "../SettingsComponent/EmployeeConfiguration/Designation/ManageEmployeeDesignation";
import ManageProjectRole from "../SettingsComponent/ProjectConfiguration/Role/ManageProjectRole";
import DefectPriority from "../SettingsComponent/DefectConfiguration/Priority/ManageDefectPriority";
import DefectSeverity from "../SettingsComponent/DefectConfiguration/Severity/ManageDefectSeverity";
import DefectType from "../SettingsComponent/DefectConfiguration/DefectType/ManageDefectType";
import DefectStatus from "../SettingsComponent/DefectConfiguration/DefectStatus/ManageDefectStatus";
import CompanyPrivileges from "../SettingsComponent/Privileges/CompanyPrivileges";
import HRDashboard from "../DashboardComponent/HR/HRDashboard";

export default function RouteDetails({ isDark }) {
  let privileges = [];
  let privilege = [];
  let role = localStorage.getItem("role");
  privileges = JSON.parse(localStorage.getItem("privilege"));

  const isAllowed = feature => {
    privilege = privileges.find(({ name }) => name === feature);
    return privilege[role];
  };

  return (
    <div>
      <Switch>
        {isAllowed("Company Dashboard") && (
          <Route path="/dashboard/company">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Dashboard</Links>
              <Typography color="textPrimary">Company</Typography>
            </Breadcrumbs>
            <CompanyDashboard isDark={isDark} />
          </Route>
        )}

        {isAllowed("HR Dashboard") && (
          <Route path="/dashboard/hr">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Dashboard</Links>
              <Typography color="textPrimary">HR</Typography>
            </Breadcrumbs>
            <HRDashboard isDark={isDark} />
          </Route>
        )}

        {isAllowed("PM Dashboard") && (
          <Route path="/dashboard/project-manager">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Dashboard</Links>
              <Typography color="textPrimary">Project-Manager</Typography>
            </Breadcrumbs>
            <ProjectManagerDashboard isDark={isDark} />
          </Route>
        )}

        {isAllowed("Developer Dashboard") && (
          <Route path="/dashboard/developer">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Dashboard</Links>
              <Typography color="textPrimary">Developer</Typography>
            </Breadcrumbs>
            <DeveloperDashboard isDark={isDark} />
          </Route>
        )}

        {isAllowed("QA Dashboard") && (
          <Route path="/dashboard/qa">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Dashboard</Links>
              <Typography color="textPrimary">QA</Typography>
            </Breadcrumbs>
            <QADashboard isDark={isDark} />
          </Route>
        )}

        {isAllowed("View Employee") && (
          <Route exact path="/company-administration/manage-employee">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Company Administration</Links>
              <Typography color="textPrimary">Manage Employee</Typography>
            </Breadcrumbs>
            <ManageEmployee />
          </Route>
        )}

        {isAllowed("Add Employee") && (
          <Route path="/company-administration/manage-employee/add-employee">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Company Administration</Links>
              <Links color="inherit">Manage Employee</Links>
              <Typography color="textPrimary">Add Employee</Typography>
            </Breadcrumbs>
            <AddEmployee />
          </Route>
        )}

        {isAllowed("Edit Employee") && (
          <Route path="/company-administration/manage-employee/edit-employee">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Company Administration</Links>
              <Links color="inherit">Manage Employee</Links>
              <Typography color="textPrimary">Edit Employee</Typography>
            </Breadcrumbs>
            <EditEmployee />
          </Route>
        )}

        {isAllowed("View Client") && (
          <Route exact path="/company-administration/manage-client">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Company Adminstration</Links>
              <Typography color="textPrimary">Manage Client</Typography>
            </Breadcrumbs>
            <ManageClient />
          </Route>
        )}

        {isAllowed("Add Client") && (
          <Route path="/company-administration/manage-client/add-client">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Company Administration</Links>
              <Links color="inherit">Manage Client</Links>
              <Typography color="textPrimary">Add Client</Typography>
            </Breadcrumbs>
            <AddClient />
          </Route>
        )}

        {isAllowed("Edit Client") && (
          <Route path="/company-administration/manage-client/edit-client">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Company Administration</Links>
              <Links color="inherit">Manage Client</Links>
              <Typography color="textPrimary">Edit Client</Typography>
            </Breadcrumbs>
            <EditClient />
          </Route>
        )}

        {isAllowed("View Project") && (
          <Route exact path="/manage-project">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Typography color="textPrimary">Manage Project</Typography>
            </Breadcrumbs>
            <ManageProject />
          </Route>
        )}

        {isAllowed("Add Project") && (
          <Route path="/manage-project/add-project">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Manage Project</Links>
              <Typography color="textPrimary">Add Project</Typography>
            </Breadcrumbs>
            <AddProject />
          </Route>
        )}

        {isAllowed("Edit Project") && (
          <Route path="/manage-project/edit-project">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Manage Project</Links>
              <Typography color="textPrimary">Edit Project</Typography>
            </Breadcrumbs>
            <EditProject />
          </Route>
        )}

        {isAllowed("View Module") && (
          <Route path="/module/manage-module">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Module</Links>
              <Typography color="textPrimary">Manage Module</Typography>
            </Breadcrumbs>
            <ManageModule />
          </Route>
        )}

        {isAllowed("View Submodule") && (
          <Route path="/module/manage-submodule">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Module</Links>
              <Typography color="textPrimary">Manage Submodule</Typography>
            </Breadcrumbs>
            <ManageSubmodule />
          </Route>
        )}

        {isAllowed("View Project Allocation") && (
          <Route exact path="/allocation/manage-project-allocation">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Allocation</Links>
              <Typography color="textPrimary">
                Manage Project Allocation
              </Typography>
            </Breadcrumbs>
            <ProjectAllocation />
          </Route>
        )}

        {isAllowed("Allocate Project") && (
          <Route path="/allocation/manage-project-allocation/allocate">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Allocation</Links>
              <Links color="inherit">Manage Project Allocation</Links>
              <Typography color="textPrimary">Allocate Project</Typography>
            </Breadcrumbs>
            <ProjectEmployee />
          </Route>
        )}

        {isAllowed("View Module Allocation") && (
          <Route exact path="/allocation/manage-module-allocation">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Allocation</Links>
              <Typography color="textPrimary">
                Manage Module Allocation
              </Typography>
            </Breadcrumbs>
            <ModuleAllocation />
          </Route>
        )}

        {isAllowed("Allocate Module") && (
          <Route path="/allocation/manage-module-allocation/allocate">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Allocation</Links>
              <Links color="inherit">Manage Module Allocation</Links>
              <Typography color="textPrimary">Allocate Module</Typography>
            </Breadcrumbs>
            <ModuleEmployee />
          </Route>
        )}

        {isAllowed("View Defect") && (
          <Route exact path="/manage-defect">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Typography color="textPrimary">Manage Defect</Typography>
            </Breadcrumbs>
            <ManageDefect />
          </Route>
        )}

        {isAllowed("Add Defect") && (
          <Route path="/manage-defect/add-defect">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Manage Defect</Links>
              <Typography color="textPrimary">Add Defect</Typography>
            </Breadcrumbs>
            <AddDefectForm />
          </Route>
        )}

        {isAllowed("Edit Defect") && (
          <Route path="/manage-defect/edit-defect">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Manage Defect</Links>
              <Typography color="textPrimary">Edit Defect</Typography>
            </Breadcrumbs>
            <EditDefectForm />
          </Route>
        )}

        {isAllowed("View Defect Log") && (
          <Route path="/defect-log">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Typography color="textPrimary">Defect Log</Typography>
            </Breadcrumbs>
            <DefectLog />
          </Route>
        )}

        {isAllowed("Update User Profile") && (
          <Route path="/settings/user-profile">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs>
            <UserProfile />
          </Route>
        )}

        {isAllowed("View Designation") && (
          <Route path="/settings/employee-configuration/manage-designation">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Links color="inherit">Employee Configuration</Links>
              <Typography color="textPrimary">Manage Designation</Typography>
            </Breadcrumbs>
            <ManageEmployeeDesignation />
          </Route>
        )}

        {isAllowed("View Role") && (
          <Route path="/settings/project-configuration/manage-role">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Links color="inherit">Project-Configuration</Links>
              <Typography color="textPrimary">Manage-Role</Typography>
            </Breadcrumbs>
            <ManageProjectRole />
          </Route>
        )}

        {isAllowed("View Priority") && (
          <Route path="/settings/defect-configuration/priority">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Links color="inherit">Defect-Configuration</Links>
              <Typography color="textPrimary">Priority</Typography>
            </Breadcrumbs>
            <DefectPriority />
          </Route>
        )}

        {isAllowed("View Severity") && (
          <Route path="/settings/defect-configuration/severity">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Links color="inherit">Defect-Configuration</Links>
              <Typography color="textPrimary">Severity</Typography>
            </Breadcrumbs>
            <DefectSeverity />
          </Route>
        )}

        {isAllowed("View Type") && (
          <Route path="/settings/defect-configuration/type">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Links color="inherit">Defect-Configuration</Links>
              <Typography color="textPrimary">Type</Typography>
            </Breadcrumbs>
            <DefectType />
          </Route>
        )}

        {isAllowed("View Status") && (
          <Route path="/settings/defect-configuration/status">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Links color="inherit">Defect-Configuration</Links>
              <Typography color="textPrimary">Status</Typography>
            </Breadcrumbs>
            <DefectStatus />
          </Route>
        )}

        {isAllowed("Set Privileges") && (
          <Route path="/settings/privileges">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Links color="inherit">Home</Links>
              <Links color="inherit">Settings</Links>
              <Typography color="textPrimary">Privileges</Typography>
            </Breadcrumbs>
            <CompanyPrivileges />
          </Route>
        )}
      </Switch>
    </div>
  );
}
