package com.sgic.login.server.controller;

import java.util.List;

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

import com.sgic.common.api.enums.RestApiResponseStatus;
import com.sgic.common.api.response.ApiResponse;
import com.sgic.common.api.response.ContentResponse;
import com.sgic.common.api.response.ListContentResponse;
import com.sgic.login.dto.mapper.Mapper;
import com.sgic.login.server.dto.PrivilegeDto;
import com.sgic.login.server.entities.Privilege;
import com.sgic.login.server.services.PrivilegeService;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/api/v1")
public class PrivilegeController {
	@Autowired
	PrivilegeService privilegeService;
	
	@Autowired
	private Mapper mapper;
	
	//Add Privilege
	@PostMapping(value = "/privilege")
	public ResponseEntity<Object> createPrivilege(@RequestBody PrivilegeDto privilegeData) {
		Privilege privilege = mapper.map(privilegeData, Privilege.class);
		privilegeService.addPrivilege(privilege);
		return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.CREATED), HttpStatus.OK);	
	}

	//Get All Privilege
	@GetMapping(value = "/privilege")
	public ResponseEntity<Object> getAllPrivilege() {
		List<Privilege> privilege = privilegeService.getAllPrivilege();
		List<PrivilegeDto> privilegeData = mapper.map(privilege, PrivilegeDto.class);
		return new ResponseEntity<>(new ListContentResponse<PrivilegeDto>("listAllPrivilege",privilegeData, RestApiResponseStatus.RECEIVED), HttpStatus.OK);	
	}
	
	//Update Privilege
	@PutMapping(value = "/privilege")
	public ResponseEntity<Object> updatePrivilege(@RequestBody PrivilegeDto privilegeData) {
		Privilege privilege = mapper.map(privilegeData, Privilege.class);
		privilegeService.addPrivilege(privilege);
		return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.UPDATED), HttpStatus.OK);	
	}
	
	//Delete Privilege
	@DeleteMapping(value = "/privilege/{id}")
	public ResponseEntity<Object> removePrivilege(@PathVariable Long id) {
		privilegeService.deletePrivilege(id);
		return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.DELETED), HttpStatus.OK);
	}	
	
	//Get Privilege By Id,Name
	@GetMapping(value = "/privilege/{sid}")
	public ResponseEntity<Object> getPrivilegeById(@PathVariable String sid) {
		if(sid.startsWith("ID")) {
			String str=sid.substring(2);
			long id=Long.valueOf(str);
			Privilege privilege = privilegeService.getPrivilegeById(id);
			PrivilegeDto privilegeData = mapper.map(privilege, PrivilegeDto.class);
			return new ResponseEntity<>(new ContentResponse<PrivilegeDto>("listPrivilege", privilegeData, RestApiResponseStatus.RECEIVED), HttpStatus.OK);
		}
		else if(sid.startsWith("NAME")){
			String name=sid.substring(4);
			Privilege privilege = privilegeService.getPrivilegeByName(name);
			PrivilegeDto privilegeData = mapper.map(privilege, PrivilegeDto.class);
			return new ResponseEntity<>(new ContentResponse<PrivilegeDto>("listPrivilege", privilegeData, RestApiResponseStatus.RECEIVED), HttpStatus.OK);
		}
		else {
			return null;
		}
	}
	
}
