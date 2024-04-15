package com.example.cinema_app.config;

import com.example.cinema_app.modal.Token;
import com.example.cinema_app.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;


@Component
public class CustomLogoutHandler implements LogoutHandler {
    public CustomLogoutHandler(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    private final TokenRepository tokenRepository;


    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        System.out.println("came");
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            System.out.println("no token in the logout header");
            return;
        }
        System.out.println("came");
        String token = authHeader.substring(7);
        System.out.println(token);
        Token storedToken = tokenRepository.findByToken(token).orElse(null);

        if (token != null){
            storedToken.setLoggedOut(true);
            tokenRepository.save(storedToken);
        }

    }
}
