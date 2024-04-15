package com.example.cinema_app.service;

import com.example.cinema_app.modal.UserBooking;
import com.example.cinema_app.repository.UserBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserBookingService {

    @Autowired
    private UserBookingRepository userBookingRepository;

    public UserBooking saveUserBooking(UserBooking userBooking){

        return userBookingRepository.save(userBooking);
    }

    public List <UserBooking> getAllUserBookings(){
        return userBookingRepository.findAll();
    }
}
