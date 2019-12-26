package com.sgic.employee.server.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sgic.common.api.enums.RestApiResponseStatus;
import com.sgic.common.api.response.ApiResponse;
import com.sgic.common.api.response.ContentResponse;
import com.sgic.common.api.response.ListContentResponse;
import com.sgic.employee.dto.mapper.Mapper;
import com.sgic.employee.server.dto.EmployeeDto;
import com.sgic.employee.server.entities.Designation;
import com.sgic.employee.server.entities.Employee;
import com.sgic.employee.server.services.DesignationService;
import com.sgic.employee.server.services.EmployeeService;
import com.sgic.employee.server.util.ErrorCodes;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private DesignationService designationService;

	@Autowired
	ErrorCodes errorMessages;

	@Autowired
	private Mapper mapper;

	private static final Logger logger = Logger.getLogger(EmployeeController.class);
	
	// ADD EMPLOYEE =========================================================================================================

	StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();
	
	@PostMapping(value = "/employee")
	public ResponseEntity<Object> createEmployee(@RequestBody EmployeeDto employeeData) {
		if (employeeService.isEmailAlreadyExist(employeeData.getEmail())) {
			logger.debug("Email already exists: createEmployee(), email: {}");
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.VF_EMAIL), HttpStatus.BAD_REQUEST);
		}
		
		if (employeeService.isUsernameAlreadyExist(employeeData.getUsername())) {
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.VF_UNAME), HttpStatus.BAD_REQUEST);
		}

		Employee employee = mapper.map(employeeData, Employee.class);
		String encryptedPassword = passwordEncryptor.encryptPassword(employee.getPassword());
		employee.setPassword(encryptedPassword);
		employeeService.createEmployee(employee);
		return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.CREATED), HttpStatus.OK);
	}
	
	// ADD EMPLOYEE END =====================================================================================================
	
	// LIST ALL EMPLOYEE ====================================================================================================

	@GetMapping(value = "/employee")
	public ResponseEntity<Object> getEmployee() {
		List<Employee> employeeData = employeeService.getAllEmployee();
		List<EmployeeDto> employeeDtoData = mapper.map(employeeData, EmployeeDto.class);
		System.out.println(employeeDtoData);
		for(EmployeeDto employeeDto : employeeDtoData) {
			Designation designation = designationService.findDesignationById(employeeDto.getDesignationId());
			employeeDto.setDesignationName(designation.getDesignationName());
			employeeDto.setPassword(null);
		}
		return new ResponseEntity<>(new ListContentResponse<EmployeeDto>("listAllEmployee",employeeDtoData, RestApiResponseStatus.RECEIVED), HttpStatus.OK);	
	}
	
	// LIST ALL EMPLOYEE END ================================================================================================
	
	// GET EMPLOYEE BY ID ===================================================================================================

	@GetMapping(value = "/employee/{sid}")
	public ResponseEntity<Object> getEmployeeById(@PathVariable String sid) {
		if(sid.startsWith("ID")) {
			String str=sid.substring(2);
			long id=Long.valueOf(str);
			EmployeeDto employeeDtoData = mapper.map(employeeService.findEmployeeById(id), EmployeeDto.class);
			Designation designation = designationService.findDesignationById(employeeDtoData.getDesignationId());
			employeeDtoData.setDesignationName(designation.getDesignationName());
			employeeDtoData.setPassword(null);
			return new ResponseEntity<>(new ContentResponse<EmployeeDto>("listEmployee", employeeDtoData, RestApiResponseStatus.RECEIVED), HttpStatus.OK);
		}
		else if(sid.startsWith("UN")) {
			String username=sid.substring(2);
			EmployeeDto employeeDtoData = mapper.map(employeeService.findEmployeeByUsername(username), EmployeeDto.class);
			Designation designation = designationService.findDesignationById(employeeDtoData.getDesignationId());
			employeeDtoData.setDesignationName(designation.getDesignationName());
			employeeDtoData.setPassword(null);
			return new ResponseEntity<>(new ContentResponse<EmployeeDto>("listEmployee", employeeDtoData, RestApiResponseStatus.RECEIVED), HttpStatus.OK);	
		}
		else {
			return null;
		}
	}
	
	// GET EMPLOYEE BY ID END ===============================================================================================
	
	// UPDATE EMPLOYEE ======================================================================================================

	@PutMapping(value = "/employee")
	public ResponseEntity<Object> updateBook(@Valid @RequestBody EmployeeDto employeeData) {
		Employee emp= employeeService.findEmployeeById(employeeData.getId());
		String password=emp.getPassword();
		employeeData.setPassword(password);
		Employee employee = mapper.map(employeeData, Employee.class);
		employeeService.updateEmployee(employee);
		return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.UPDATED), HttpStatus.OK);
	}
	
	// UPDATE EMPLOYEE END ==================================================================================================
	
	
	//Check Whether Employee Id Exists on Another Service
	private static boolean isExists(String uri)
	{	     
	    RestTemplate restTemplate = new RestTemplate();
	    boolean result = restTemplate.getForObject(uri, Boolean.class);
	    return result;
	}
	
	// DELETE EMPLOYEE ======================================================================================================

	@DeleteMapping(value = "/employee/{id}")
	public ResponseEntity<Object> deleteEmployee(@PathVariable Long id) {
		if(!isExists("http://localhost:1725/api/v1/employee_project/exist/EMP"+id) && !isExists("http://localhost:1725/api/v1/employee_submodule/exist/EMP"+id) && !isExists("http://localhost:8087/api/v1/defect/exist/EMP"+id)) {
			employeeService.deleteEmployee(id);
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.DELETED), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.DELETION_FAILURE), HttpStatus.CONFLICT);
		}	
	}
	
	// DELETE EMPLOYEE END ==================================================================================================

	//Get Employee Name by Employee Id
	@GetMapping(value = "/employee/name/{id}")
	public String getEmployeeNameById(@PathVariable Long id)
	{
		Employee employee = employeeService.findEmployeeById(id);
		EmployeeDto employeeDto = mapper.map(employee, EmployeeDto.class);
		String uname = employeeDto.getUsername();
		return uname;
	}
	
	//Check whether a Username exist on a Employee
	@GetMapping(value = "/employee/exist/{sid}")
	public boolean isIdExist(@PathVariable String sid)
	{
		if(sid.startsWith("USER")) {
			String username=sid.substring(4);
			return employeeService.isUsernameAlreadyExist(username);
		}
		else {
			return false;
		}

	}	
	
	//Retrieve an Employee DTO
	@GetMapping(value = "/employee/dto/{sid}")
	public EmployeeDto getEmployeeDtoById(@PathVariable String sid) {
		if(sid.startsWith("ID")) {
			String str=sid.substring(2);
			long id=Long.valueOf(str);
			EmployeeDto employeeDtoData = mapper.map(employeeService.findEmployeeById(id), EmployeeDto.class);
			Designation designation = designationService.findDesignationById(employeeDtoData.getDesignationId());
			employeeDtoData.setDesignationName(designation.getDesignationName());
			return employeeDtoData;
		}
		else if(sid.startsWith("UN")) {
			String username=sid.substring(2);
			EmployeeDto employeeDtoData = mapper.map(employeeService.findEmployeeByUsername(username), EmployeeDto.class);
			Designation designation = designationService.findDesignationById(employeeDtoData.getDesignationId());
			employeeDtoData.setDesignationName(designation.getDesignationName());
			return employeeDtoData;		
		}
		else {
			return null;
		}
	}
	
	//Update Availability while Allocate Employee
	@GetMapping(value = "/employee/allocate/{sid}")
	public boolean updateAllocateEmpAvail(@PathVariable String sid) {
		if(sid.startsWith("PRO")) {
			String str=sid.substring(3);
			long id=Long.valueOf(str);
			Employee employee = employeeService.findEmployeeById(id);
			if(employee.getAvailability()==0) {
				return false;
			}
			else {
				employee.setAvailability(employee.getAvailability()-25);
				employeeService.updateEmployee(employee);
				return true;
			}
		}
		else if(sid.startsWith("SUB")) {
			String str=sid.substring(3);
			long id=Long.valueOf(str);
			Employee employee = employeeService.findEmployeeById(id);
			if(employee.getSubModuleAvailability()==0) {
				return false;
			}
			else {
				employee.setSubModuleAvailability(employee.getSubModuleAvailability()-10);
				employeeService.updateEmployee(employee);
				return true;
			}
		}
		else {
			return false;
		}
	}
	
	//Update Availability while Deallocate Employee
	@GetMapping(value = "/employee/deallocate/{sid}")
	public boolean updateDeallocateEmpAvail(@PathVariable String sid) {
		if(sid.startsWith("PRO")) {
			String str=sid.substring(3);
			long id=Long.valueOf(str);
			Employee employee = employeeService.findEmployeeById(id);
			if(employee.getAvailability()!=100) {
				employee.setAvailability(employee.getAvailability()+25);
				employeeService.updateEmployee(employee);
				return true;
			}
			else {
				return false;
			}
		}
		else if(sid.startsWith("SUB")) {
			String str=sid.substring(3);
			long id=Long.valueOf(str);
			Employee employee = employeeService.findEmployeeById(id);
			if(employee.getSubModuleAvailability()!=100) {
				employee.setSubModuleAvailability(employee.getSubModuleAvailability()+10);
				employeeService.updateEmployee(employee);
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
	//Get Employee Image by Username
	@GetMapping(value = "/employee/image/{username}")
	public String getEmployeeImage(@PathVariable String username)
	{
		EmployeeDto employeeDtoData = mapper.map(employeeService.findEmployeeByUsername(username), EmployeeDto.class);
		return employeeDtoData.getPhoto();

	}
	
	//Update Employee Password
	@PutMapping(value = "/employee/password")
	public ResponseEntity<Object> updatePassword(@RequestBody EmployeeDto employeeData) {
		Employee serverEmployee = employeeService.findEmployeeById(employeeData.getId());
		if(passwordEncryptor.checkPassword(employeeData.getPassword(), serverEmployee.getPassword())) {
			serverEmployee.setPassword(passwordEncryptor.encryptPassword(employeeData.getNewPassword()));
			employeeService.updateEmployee(serverEmployee);
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.PASS_UPDATED), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.PASS_DIFF), HttpStatus.BAD_REQUEST);
		}	
	}
}
