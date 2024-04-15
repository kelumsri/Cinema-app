package com.example.cinema_app.modal;

import lombok.Data;

@Data
public class SeatsBooking {
    private String booking_id;
    private String film_name;
    private String seat_numbers;
    private String date;
    private String time;
    private String user_id;
}

