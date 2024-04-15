package com.example.cinema_app.controller;

import com.example.cinema_app.modal.Booking;
import com.example.cinema_app.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping ("/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService){
        this.bookingService = bookingService;
    }

//    @PostMapping("/")
    @GetMapping("/ddd")
    public Booking creayteBooking(@RequestBody Booking booking){
        return bookingService.saveBooking(booking)
;    }



}
