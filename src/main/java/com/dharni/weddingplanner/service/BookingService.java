package com.dharni.weddingplanner.service;

import com.dharni.weddingplanner.domain.Booking;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Booking}.
 */
public interface BookingService {
    /**
     * Save a booking.
     *
     * @param booking the entity to save.
     * @return the persisted entity.
     */
    Booking save(Booking booking);

    /**
     * Partially updates a booking.
     *
     * @param booking the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Booking> partialUpdate(Booking booking);

    /**
     * Get all the bookings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Booking> findAll(Pageable pageable);

    /**
     * Get the "id" booking.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Booking> findOne(Long id);

    /**
     * Delete the "id" booking.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
