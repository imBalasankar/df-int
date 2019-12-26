package com.sgic.login.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgic.login.server.entities.Privilege;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long>{
	Privilege findPrivilegeByName(String name);
	
}
