package com.sgic.login.server.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(schema = "login-service", name = "privilege")
public class Privilege {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private String name;
	private Boolean companyAdmin;
	private Boolean hrManager;
	private Boolean projectManager;
	private Boolean softwareEngineer;
	private Boolean qaEngineer;
	
	public Privilege() {
		
	}

	public Privilege(Long id, @NotNull String name, Boolean companyAdmin, Boolean hrManager,
			Boolean projectManager, Boolean softwareEngineer, Boolean qaEngineer) {
		super();
		this.id = id;
		this.name = name;
		this.companyAdmin = companyAdmin;
		this.hrManager = hrManager;
		this.projectManager = projectManager;
		this.softwareEngineer = softwareEngineer;
		this.qaEngineer = qaEngineer;
	}

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
