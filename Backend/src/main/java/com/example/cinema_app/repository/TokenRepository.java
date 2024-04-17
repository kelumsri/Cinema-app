package com.example.cinema_app.repository;

//import com.example.cinema_app.modal.Token;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//
//public interface TokenRepository extends JpaRepository<Token,Integer> {
//
//    @Query("""
//            Select t from Token t inner join User u
//            on t.user.id = u.id
//            where t.user.id=:userID and t.loggedOut
//            = false
//            """)
//    List<Token>findAllTokenByUser(Integer userID);
//
//    Optional<Token>finedByToken(String token);
//}


import com.example.cinema_app.modal.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token,Integer> {
    @Query ("""
            SELECT t FROM Token t INNER JOIN User u
            ON t.user.id = u.id
            WHERE t.user.id = :userId AND t.loggedOut = false
            """)
    List<Token> findAllTokenByUser(Integer userId);
    Optional<Token> findByToken(String token);
}