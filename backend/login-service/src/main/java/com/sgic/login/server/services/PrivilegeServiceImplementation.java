package com.sgic.login.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgic.login.server.entities.Privilege;
import com.sgic.login.server.repositories.PrivilegeRepository;

@Service
public class PrivilegeServiceImplementation implements PrivilegeService{
	
	@Autowired
	private PrivilegeRepository privilegeRepository;
	
	//Add Privilege
	public void addPrivilege(Privilege privilege) {
		privilegeRepository.save(privilege);
	}
	
	//Get All Privilege
	public List<Privilege> getAllPrivilege() {
		return privilegeRepository.findAll();
	}
	
	//Update Privilege
	public void updatePrivilege(Privilege privilege) {
		privilegeRepository.save(privilege);
	}
	
	//Check Whether Privilege Id Exists
	public boolean isIdExists(Long id) {
		return privilegeRepository.existsById(id);
	}
	
	//Delete Privilege
	public void deletePrivilege(Long id) {
		privilegeRepository.deleteById(id);
	}	
	
	//Get Privilege By Id
	public Privilege getPrivilegeById(Long id) {
		return privilegeRepository.findById(id).get();
	}
	
	//Get Privilege by Privilege Name
	public Privilege getPrivilegeByName(String name) {
		return privilegeRepository.findPrivilegeByName(name);
	}

}
