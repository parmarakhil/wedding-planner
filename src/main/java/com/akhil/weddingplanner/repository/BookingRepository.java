package com.akhil.weddingplanner.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.akhil.weddingplanner.domain.Booking;

/**
 * Spring Data SQL repository for the Booking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {}
