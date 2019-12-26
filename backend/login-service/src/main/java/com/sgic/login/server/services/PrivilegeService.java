package com.sgic.login.server.services;

import java.util.List;

import com.sgic.login.server.entities.Privilege;

public interface PrivilegeService {
	public void addPrivilege(Privilege privilege);
	public List<Privilege> getAllPrivilege();
	public void updatePrivilege(Privilege privilege);
	public boolean isIdExists(Long id);
	public void deletePrivilege(Long id);
	public Privilege getPrivilegeById(Long id);
	public Privilege getPrivilegeByName(String name);

}
