package com.sgic.login.server.controller;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sgic.common.api.enums.RestApiResponseStatus;
import com.sgic.common.api.response.ApiResponse;
import com.sgic.common.api.response.ContentResponse;
import com.sgic.login.server.dto.UserDto;


@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	private static boolean isExists(String uri)
	{	     
	    RestTemplate restTemplate = new RestTemplate();
	    boolean result = restTemplate.getForObject(uri, Boolean.class);
	    return result;
	}
	
	@GetMapping(value = "/user/{sid}")
	public UserDto getUserDetails(@PathVariable String sid) 
	{
		if(isExists("http://localhost:1724/api/v1/employee/exist/USER"+sid)) {
			final String url = "http://localhost:1724/api/v1/employee/dto/UN"+sid;
			RestTemplate restTemplate = new RestTemplate();
			UserDto userDto = restTemplate.getForObject(url, UserDto.class);
			return userDto;
		}
		else {
			return null;
		}
		
	}
	
	StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();
	
	@PostMapping(value = "/user/auth")
	public ResponseEntity<Object> authenticateUser(@RequestBody UserDto userDto) {
		System.out.println(userDto.getUsername());
		if(getUserDetails(userDto.getUsername())!=null) {
			UserDto serverUserDto = getUserDetails(userDto.getUsername());
			if(serverUserDto.isActive()) {
				if(passwordEncryptor.checkPassword(userDto.getPassword(),serverUserDto.getPassword())) {
					serverUserDto.setPassword(null);
					return new ResponseEntity<>(new ContentResponse<UserDto>("listLoggedinUser", serverUserDto, RestApiResponseStatus.LOGIN_SUCCESS), HttpStatus.OK);
				} else {
					return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.LOGIN_FAILURE), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.ACC_INACTIVE), HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<>(new ApiResponse(RestApiResponseStatus.LOGIN_FAILURE), HttpStatus.BAD_REQUEST);
		}
	}	

}
