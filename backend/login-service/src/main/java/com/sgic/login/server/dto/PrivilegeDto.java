package com.sgic.login.server.dto;

public class PrivilegeDto {
	
	private Long id;
	private String name;
	private Boolean companyAdmin;
	private Boolean hrManager;
	private Boolean projectManager;
	private Boolean softwareEngineer;
	private Boolean qaEngineer;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean isCompanyAdmin() {
		return companyAdmin;
	}
	public void setCompanyAdmin(Boolean companyAdmin) {
		this.companyAdmin = companyAdmin;
	}
	public Boolean isHrManager() {
		return hrManager;
	}
	public void setHrManager(Boolean hrManager) {
		this.hrManager = hrManager;
	}
	public Boolean isProjectManager() {
		return projectManager;
	}
	public void setProjectManager(Boolean projectManager) {
		this.projectManager = projectManager;
	}
	public Boolean isSoftwareEngineer() {
		return softwareEngineer;
	}
	public void setSoftwareEngineer(Boolean softwareEngineer) {
		this.softwareEngineer = softwareEngineer;
	}
	public Boolean isQaEngineer() {
		return qaEngineer;
	}
	public void setQaEngineer(Boolean qaEngineer) {
		this.qaEngineer = qaEngineer;
	}
	
}
