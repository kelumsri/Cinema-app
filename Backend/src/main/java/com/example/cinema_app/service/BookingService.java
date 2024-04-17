package com.example.cinema_app.service;

import com.example.cinema_app.modal.Booking;
import com.example.cinema_app.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Timer;
import java.util.TimerTask;

@Service
public class BookingService {

    private static final int TOTAL_SEATS = 40;
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;
    }

    public Booking saveBooking(Booking booking){
        boolean[] seatStatus = new boolean[TOTAL_SEATS];

        for (String seat : booking.getSeatNumbers()){
            int seatIndex = Integer.parseInt(seat) - 1;
            seatStatus[seatIndex] = true;
        }
        booking.setSeatStatus(seatStatus);

        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (!booking.isPaymentStatus()){
                    for (String seat : booking.getSeatNumbers()){
                        int seatIndex = Integer.parseInt(seat) - 1;
                        seatStatus[seatIndex] = false;
                    }
                    booking.setSeatStatus(seatStatus);
                    bookingRepository.save(booking);
                    System.out.println("Blocked seats released due to timeout");
                }
            }
        },15*60*1000);
        return bookingRepository.save(booking);
    }

}
