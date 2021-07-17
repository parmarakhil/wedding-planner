package com.akhil.weddingplanner.service.impl;

import com.akhil.weddingplanner.domain.Booking;
import com.akhil.weddingplanner.repository.BookingRepository;
import com.akhil.weddingplanner.service.BookingService;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Booking}.
 */
@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Booking save(Booking booking) {
        log.debug("Request to save Booking : {}", booking);
        return bookingRepository.save(booking);
    }

    @Override
    public Optional<Booking> partialUpdate(Booking booking) {
        log.debug("Request to partially update Booking : {}", booking);

        return bookingRepository
            .findById(booking.getId())
            .map(
                existingBooking -> {
                    if (booking.getEventDate() != null) {
                        existingBooking.setEventDate(booking.getEventDate());
                    }
                    if (booking.getVenue() != null) {
                        existingBooking.setVenue(booking.getVenue());
                    }
                    if (booking.getPlan() != null) {
                        existingBooking.setPlan(booking.getPlan());
                    }
                    if (booking.getCreatedDate() != null) {
                        existingBooking.setCreatedDate(booking.getCreatedDate());
                    }
                    if (booking.getContactNumber() != null) {
                        existingBooking.setContactNumber(booking.getContactNumber());
                    }
                    if (booking.getEmailId() != null) {
                        existingBooking.setEmailId(booking.getEmailId());
                    }
                    if (booking.getUserName() != null) {
                        existingBooking.setUserName(booking.getUserName());
                    }
                    if (booking.getUserId() != null) {
                        existingBooking.setUserId(booking.getUserId());
                    }

                    return existingBooking;
                }
            )
            .map(bookingRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Booking> findAll(Pageable pageable) {
        log.debug("Request to get all Bookings");
        return bookingRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Booking> findOne(Long id) {
        log.debug("Request to get Booking : {}", id);
        return bookingRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Booking : {}", id);
        bookingRepository.deleteById(id);
    }
}
