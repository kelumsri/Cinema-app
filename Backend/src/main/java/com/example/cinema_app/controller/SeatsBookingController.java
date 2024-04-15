package com.example.cinema_app.controller;

import com.example.cinema_app.modal.SeatsBooking;
import com.example.cinema_app.service.SeatsBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SeatsBookingController {

    @Autowired
    private SeatsBookingService seatsBookingService;

    @GetMapping("/getSeat")
    public List<SeatsBooking>getSeatsBooking(){
        return seatsBookingService.getAllSeatsBooking();
    }
}
