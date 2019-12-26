import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  {
    name: "EmployeeId",
    label: "Employee Id",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "FirstName",
    label: "First Name",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "LastName",
    label: "Last Name",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "Username",
    label: "Username",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "Designation",
    label: "Designation",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "Email",
    label: "Email",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "Active",
    label: "Active",
    options: {
      filter: true,
      sort: false
    }
  }
];

const data = [
  {
    EmployeeId: "E-100",
    FirstName: "Bals",
    LastName: "Parames",
    Username: "Balsp",
    Designation: "Software Engineer",
    Email: "bals@bals.com",
    Active: "Yes"
  },
  {
    EmployeeId: "E-100",
    FirstName: "Bals",
    LastName: "Parames",
    Username: "Balsp",
    Designation: "Software Engineer",
    Email: "bals@bals.com",
    Active: "Yes"
  },
  {
    EmployeeId: "E-100",
    FirstName: "Bals",
    LastName: "Parames",
    Username: "Balsp",
    Designation: "Software Engineer",
    Email: "bals@bals.com",
    Active: "Yes"
  }
];

const options = {
  filterType: "checkbox",
  selectableRows: "none",
  responsive: "scrollMaxHeight"
};

export default function ViewEmployees() {
  return (
    <div>
      <MUIDataTable data={data} columns={columns} options={options} />
    </div>
  );
}
