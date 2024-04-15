//package com.example.cinema_app.controller;
//
//import com.example.cinema_app.modal.UserBooking;
//import com.example.cinema_app.service.UserBookingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "*")
//@RequestMapping("/filmBookings")
//public class UserBookingController {
//
//    @Autowired
//    private UserBookingService userBookingService;
//
//    @PostMapping("/post_bookingData")
//    public UserBooking saveUserBooking(@RequestBody UserBooking userBooking ){
//        System.out.println(userBooking.getUserId());
//        return userBookingService.saveUserBooking(userBooking);
//    }
//
//
//    @GetMapping("/get_bookingData")
//    public List <UserBooking> getAllUserBookings(){
//        return userBookingService.getAllUserBookings();
//    }
//}


package com.example.cinema_app.controller;

import com.example.cinema_app.modal.UserBooking;
import com.example.cinema_app.service.UserBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/filmBookings")
public class UserBookingController {

    @Autowired
    private UserBookingService userBookingService;

    @PostMapping("/post_bookingData")
    public UserBooking saveUserBooking(@RequestBody UserBooking userBooking ){
        System.out.println(userBooking.getUserId());
        return userBookingService.saveUserBooking(userBooking);
    }


    @GetMapping("/get_bookingData")
    public List <UserBooking> getAllUserBookings(){
        return userBookingService.getAllUserBookings();
    }
}
