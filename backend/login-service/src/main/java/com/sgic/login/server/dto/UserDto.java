package com.sgic.login.server.dto;
import com.google.common.base.CaseFormat;

public class UserDto {
	private Long id;
	private String username;
	private String password;
	private boolean active;
	private String designationName;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUserName(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(String active) {
		if(active.contentEquals("Yes")) {
			this.active = true;
		}
		else {
			this.active = false;
		}
	}
	public String getDesignationName() {
		String str = designationName.replaceAll(" ", "_").toLowerCase();
		String name = CaseFormat.LOWER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, str);
		return name;
	}
	public void setDesignationName(String designationName) {
		this.designationName = designationName;
	}	

}
