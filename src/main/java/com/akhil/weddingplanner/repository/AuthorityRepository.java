package com.akhil.weddingplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akhil.weddingplanner.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
