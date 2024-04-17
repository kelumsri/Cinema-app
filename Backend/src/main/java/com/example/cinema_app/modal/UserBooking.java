package com.example.cinema_app.modal;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_booking")
public class UserBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private String userId;

    @Column(name = "date")
    private String date;

    @Column (name = "time")
    private String time;

    @Column(name = "film_name")
    private String filmName;

    @Column(name = "seat_numbers")
    private String[] seatNumber;

    @Column(name = "payment")
    private String payment;

}
