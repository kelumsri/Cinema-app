package com.example.cinema_app.service;

import com.example.cinema_app.modal.SeatsBooking;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.List;

@Service
public class SeatsBookingService {
    public List<SeatsBooking> getAllSeatsBooking(){
        Yaml yaml = new Yaml();
        InputStream inputStream = this.getClass()
                .getClassLoader()
                .getResourceAsStream("seatsBooking.yml");

        List<SeatsBooking>seatsBookings = yaml.loadAs(inputStream,List.class);
        return seatsBookings;
    }
}
