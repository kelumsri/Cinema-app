package com.example.cinema_app.repository;

import com.example.cinema_app.modal.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBookingRepository extends JpaRepository <UserBooking,Long>{
}
