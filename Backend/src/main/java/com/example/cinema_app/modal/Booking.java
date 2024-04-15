package com.example.cinema_app.modal;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity

public class Booking {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int bookingId;

    private int filmId;

//    @ManyToOne
//    @JoinColumn(name = "id")
//    private  User user;
    private String userId;

    private  String filmName;
    private Date date;
    private String time;
    private String[] seatNumbers;
    private Double payment;
    private boolean paymentStatus;
    private boolean[] seatStatus;
}
